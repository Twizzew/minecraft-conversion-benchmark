// MCCB — open a Java world "the way the game does" and write it back fully upgraded.
//
// This program contains NO conversion logic of its own. It calls Mojang's code:
//   1. FileFixerUpper.fix(...)            — the 26.x file-layout migration run when a
//                                           world is opened (level.dat -> saved data…)
//   2. DataFixTypes.LEVEL / CHUNK / ENTITY_CHUNK / POI_CHUNK / PLAYER / SAVED_DATA_*
//      .updateToCurrentVersion(...)       — the DataFixerUpper, per stored unit
//   3. BlockEntity.loadStatic(...) semantics + saveWithFullMetadata(...) — every block
//      entity of every chunk is loaded by the game's own block-entity code (after
//      VanillaRegistries.createWorldLookup() and the item-component initialisers, as
//      the server does at start) and saved back. What the game would DROP at chunk load
//      (unknown block-entity type, block at the position not valid for that type) is
//      dropped and listed; what it loads is replaced by what it would save (codec
//      defaults written, unknown and legacy keys gone). When the load reports a problem
//      the game keeps what it could decode, and so does this program (listed); only a
//      problem that may come from a world datapack's registry entry, absent from the
//      vanilla lookup used here, makes it keep the block entity as stored (listed).
// and writes every upgraded unit into a copy of the world (region files rewritten,
// zlib). The result is what the running game would read after opening the world,
// before any gameplay tick. Both the benchmark SOURCE and a converter OUTPUT are
// passed through it, so that Java-side comparisons happen at one DataVersion.
// Entities are NOT loaded (that needs a running level); they are compared as upgraded.
//
// Usage (classpath = the official Minecraft jar + its libraries, see classpath.mjs):
//   java -cp <cp> tools/java/src/MccbNormalize.java <worldDir> <outDir>
// <worldDir> is never modified: it is copied to <outDir>/saves/<name> first.
// Output: <outDir>/saves/<name>/ (normalized world) + <outDir>/normalize-report.json
import com.mojang.serialization.Dynamic;
import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.stream.*;
import java.util.zip.*;
import net.minecraft.SharedConstants;
import net.minecraft.core.BlockPos;
import net.minecraft.core.HolderLookup;
import net.minecraft.core.registries.BuiltInRegistries;
import net.minecraft.data.registries.VanillaRegistries;
import net.minecraft.nbt.*;
import net.minecraft.server.Bootstrap;
import net.minecraft.util.ProblemReporter;
import net.minecraft.util.datafix.DataFixTypes;
import net.minecraft.util.datafix.DataFixers;
import net.minecraft.util.worldupdate.UpgradeProgress;
import net.minecraft.world.level.block.EntityBlock;
import net.minecraft.world.level.block.entity.BlockEntity;
import net.minecraft.world.level.block.entity.BlockEntityType;
import net.minecraft.world.level.block.state.BlockState;
import net.minecraft.world.level.storage.LevelStorageSource;
import net.minecraft.world.level.storage.TagValueInput;

public class MccbNormalize {
  static final Map<String, Integer> counts = new TreeMap<>();
  static final List<String> errors = new ArrayList<>();
  static final List<String> untouched = new ArrayList<>();
  static final List<String> beDropped = new ArrayList<>();
  static final List<String> beKeptRaw = new ArrayList<>();
  static final List<String> beProblems = new ArrayList<>();
  // Messages of Mojang's registry / tag lookups (Registry, RegistryAccess, Registry*Codec, HolderSetCodec)
  static final java.util.regex.Pattern REGISTRY_GAP = java.util.regex.Pattern.compile("Unknown registry key|Missing registry|Failed to get element|Missing tag");
  static final java.util.regex.Pattern RESOURCE_KEY = java.util.regex.Pattern.compile("ResourceKey\\[([^ \\]]+) / ([^\\]]+)\\]");

  // A load problem is a possible WORLD-DATAPACK gap only if it names a registry that a datapack
  // can extend (a dynamic registry: enchantment, trim material, painting variant…). An unknown
  // key in a built-in registry (item, block, entity type…) cannot come from a datapack: the
  // game fails on it too, so it is a real problem.
  static boolean datapackRegistryGap(String report) {
    if (!REGISTRY_GAP.matcher(report).find()) return false;
    java.util.regex.Matcher m = RESOURCE_KEY.matcher(report);
    boolean any = false;
    while (m.find()) {
      String reg = m.group(1).equals("minecraft:root") ? m.group(2) : m.group(1);
      net.minecraft.resources.Identifier id = net.minecraft.resources.Identifier.tryParse(reg);
      if (id == null) return true; // cannot tell: never guess, keep as stored
      any = true;
      if (!BuiltInRegistries.REGISTRY.containsKey(id)) return true; // dynamic registry
    }
    return !any; // no registry named: cannot tell, keep as stored
  }
  static final Map<String, BlockEntityType<?>> beTypes = new HashMap<>();
  static int current;
  static com.mojang.datafixers.DataFixer fixer;
  static HolderLookup.Provider registries;

  static void count(String k) { counts.merge(k, 1, Integer::sum); }

  public static void main(String[] args) throws Exception {
    Path src = Paths.get(args[0]).toAbsolutePath();
    Path out = Paths.get(args[1]).toAbsolutePath();
    SharedConstants.tryDetectVersion();
    Bootstrap.bootStrap();
    fixer = DataFixers.getDataFixer();
    current = SharedConstants.getCurrentVersion().dataVersion().version();
    // Registries + default item components, as the server has them before loading chunks.
    registries = VanillaRegistries.createWorldLookup();
    for (var pending : BuiltInRegistries.DATA_COMPONENT_INITIALIZERS.build(registries)) pending.apply();
    for (BlockEntityType<?> t : BuiltInRegistries.BLOCK_ENTITY_TYPE) beTypes.put(String.valueOf(BuiltInRegistries.BLOCK_ENTITY_TYPE.getKey(t)), t);

    String name = src.getFileName().toString();
    Path saves = out.resolve("saves");
    Path world = saves.resolve(name);
    if (Files.exists(world)) throw new IllegalStateException("output exists: " + world);
    copyTree(src, world);

    // ── 1. file layout migration + level data, exactly the dedicated-server path ──
    int levelVersionBefore = -1, levelVersionAfter;
    String fileFix;
    LevelStorageSource storage = LevelStorageSource.createDefault(saves);
    try (LevelStorageSource.LevelStorageAccess access = storage.createAccess(name)) {
      Dynamic<?> data = access.getUnfixedDataTagWithFallback();
      levelVersionBefore = NbtUtils.getDataVersion(data, -1);
      if (DataFixers.getFileFixer().requiresFileFixing(levelVersionBefore)) {
        try {
          data = DataFixers.getFileFixer().fix(access, data, new UpgradeProgress());
        } catch (Exception e) {
          // The game itself refuses to open this world: record it as a RESULT, exit 3.
          Throwable c = e.getCause() != null ? e.getCause() : e;
          try (Writer w = Files.newBufferedWriter(out.resolve("normalize-report.json"))) {
            w.write("{\n  \"tool\": \"MccbNormalize\",\n  \"minecraft_data_version\": " + current + ",\n");
            w.write("  \"level_data_version_before\": " + levelVersionBefore + ",\n");
            w.write("  \"file_fix\": \"FAILED\",\n  \"world_opens\": false,\n");
            w.write("  \"error\": " + q(e + " / cause: " + c) + "\n}\n");
          }
          System.out.println("WORLD DOES NOT OPEN: " + c);
          System.exit(3);
          return;
        }
        fileFix = "applied";
      } else fileFix = "not required";
      int v = NbtUtils.getDataVersion(data, -1);
      @SuppressWarnings({"unchecked", "rawtypes"})
      Dynamic<Tag> fixed = (Dynamic<Tag>) DataFixTypes.LEVEL.updateToCurrentVersion(fixer, (Dynamic) data, v);
      levelVersionAfter = current;
      Tag t = fixed.getValue();
      CompoundTag root = new CompoundTag();
      root.put("Data", t);
      NbtIo.writeCompressed(root, world.resolve("level.dat"));
      count("level.dat");
    }
    Files.deleteIfExists(world.resolve("level.dat_old"));
    Files.deleteIfExists(world.resolve("session.lock"));

    // ── 2. every stored unit through the DataFixerUpper ──
    Path dims = world.resolve("dimensions");
    if (Files.isDirectory(dims)) {
      try (Stream<Path> s = Files.walk(dims, 3)) {
        for (Path d : s.filter(p -> p.getNameCount() - dims.getNameCount() == 2 && Files.isDirectory(p)).sorted().toList()) {
          String dimId = dims.relativize(d).getName(0) + ":" + dims.relativize(d).getName(1);
          upgradeRegions(d.resolve("region"), DataFixTypes.CHUNK, dimId, "chunk");
          upgradeRegions(d.resolve("entities"), DataFixTypes.ENTITY_CHUNK, dimId, "entities");
          upgradeRegions(d.resolve("poi"), DataFixTypes.POI_CHUNK, dimId, "poi");
          upgradeSavedData(d.resolve("data"));
        }
      }
    }
    upgradeSavedData(world.resolve("data"));
    Path players = world.resolve("players").resolve("data");
    if (Files.isDirectory(players)) {
      try (Stream<Path> s = Files.list(players)) {
        for (Path p : s.filter(f -> f.toString().endsWith(".dat")).sorted().toList()) {
          upgradeFile(p, DataFixTypes.PLAYER, "player");
        }
      }
    }
    // Anything left in a pre-26.2 location was not migrated by the game either.
    for (String legacy : List.of("region", "DIM-1", "DIM1", "playerdata", "entities", "poi")) {
      if (Files.exists(world.resolve(legacy))) untouched.add(legacy);
    }

    try (Writer w = Files.newBufferedWriter(out.resolve("normalize-report.json"))) {
      w.write("{\n  \"tool\": \"MccbNormalize\",\n  \"minecraft_data_version\": " + current + ",\n");
      w.write("  \"minecraft_version\": \"" + SharedConstants.getCurrentVersion().name() + "\",\n");
      w.write("  \"source\": " + q(src.toString()) + ",\n");
      w.write("  \"level_data_version_before\": " + levelVersionBefore + ",\n");
      w.write("  \"level_data_version_after\": " + levelVersionAfter + ",\n");
      w.write("  \"file_fix\": " + q(fileFix) + ",\n  \"world_opens\": true,\n  \"units\": {");
      w.write(counts.entrySet().stream().map(e -> q(e.getKey()) + ": " + e.getValue()).collect(Collectors.joining(", ")));
      w.write("},\n  \"legacy_paths_left\": [" + untouched.stream().map(MccbNormalize::q).collect(Collectors.joining(", ")) + "],\n");
      w.write("  \"block_entities_dropped_by_game_load\": [" + beDropped.stream().map(MccbNormalize::q).collect(Collectors.joining(",\n    ")) + "],\n");
      w.write("  \"block_entities_kept_as_stored\": [" + beKeptRaw.stream().map(MccbNormalize::q).collect(Collectors.joining(",\n    ")) + "],\n");
      w.write("  \"block_entities_loaded_with_problems\": [" + beProblems.stream().map(MccbNormalize::q).collect(Collectors.joining(",\n    ")) + "],\n");
      w.write("  \"errors\": [" + errors.stream().map(MccbNormalize::q).collect(Collectors.joining(",\n    ")) + "]\n}\n");
    }
    System.out.println("OK " + world + " units=" + counts + " errors=" + errors.size());
  }

  static String q(String s) {
    return "\"" + s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "") + "\"";
  }

  static void copyTree(Path from, Path to) throws IOException {
    try (Stream<Path> s = Files.walk(from)) {
      for (Path p : s.toList()) {
        Path t = to.resolve(from.relativize(p).toString());
        if (Files.isDirectory(p)) Files.createDirectories(t);
        else { Files.createDirectories(t.getParent()); Files.copy(p, t, StandardCopyOption.COPY_ATTRIBUTES); }
      }
    }
  }

  // ── saved data: file name -> DataFixTypes (unknown files are left untouched and listed) ──
  static DataFixTypes savedDataType(String file) {
    String n = file.replace(".dat", "");
    if (n.startsWith("command_storage")) return DataFixTypes.SAVED_DATA_COMMAND_STORAGE;
    if (n.startsWith("map_") || file.matches("\\d+\\.dat")) return DataFixTypes.SAVED_DATA_MAP_DATA;
    return switch (n) {
      case "scoreboard" -> DataFixTypes.SAVED_DATA_SCOREBOARD;
      case "raids", "raids_end" -> DataFixTypes.SAVED_DATA_RAIDS;
      case "idcounts", "last_id" -> DataFixTypes.SAVED_DATA_MAP_INDEX;
      case "random_sequences" -> DataFixTypes.SAVED_DATA_RANDOM_SEQUENCES;
      case "scheduled_events" -> DataFixTypes.SAVED_DATA_SCHEDULED_EVENTS;
      case "stopwatches" -> DataFixTypes.SAVED_DATA_STOPWATCHES;
      case "game_rules" -> DataFixTypes.SAVED_DATA_GAME_RULES;
      case "weather" -> DataFixTypes.SAVED_DATA_WEATHER;
      case "world_border" -> DataFixTypes.SAVED_DATA_WORLD_BORDER;
      case "world_clocks" -> DataFixTypes.SAVED_DATA_WORLD_CLOCKS;
      case "world_gen_settings" -> DataFixTypes.SAVED_DATA_WORLD_GEN_SETTINGS;
      case "wandering_trader" -> DataFixTypes.SAVED_DATA_WANDERING_TRADER;
      case "chunk_tickets", "chunks" -> DataFixTypes.SAVED_DATA_FORCED_CHUNKS;
      case "custom_boss_events" -> DataFixTypes.SAVED_DATA_CUSTOM_BOSS_EVENTS;
      case "ender_dragon_fight" -> DataFixTypes.SAVED_DATA_ENDER_DRAGON_FIGHT;
      default -> null;
    };
  }

  static void upgradeSavedData(Path dir) throws IOException {
    if (!Files.isDirectory(dir)) return;
    try (Stream<Path> s = Files.walk(dir)) {
      for (Path p : s.filter(f -> f.toString().endsWith(".dat")).sorted().toList()) {
        DataFixTypes t = savedDataType(p.getFileName().toString());
        if (t == null) { untouched.add(p.toString()); count("saved_data_unknown_type"); continue; }
        upgradeFile(p, t, "saved_data");
      }
    }
  }

  static void upgradeFile(Path p, DataFixTypes type, String label) {
    try {
      CompoundTag tag = NbtIo.readCompressed(p, NbtAccounter.unlimitedHeap());
      int v = NbtUtils.getDataVersion(tag, -1);
      if (v < 0) { untouched.add(p + " (no DataVersion)"); count(label + "_no_version"); return; }
      CompoundTag fixed = type.updateToCurrentVersion(fixer, tag, v);
      fixed.putInt("DataVersion", current);
      NbtIo.writeCompressed(fixed, p);
      count(label);
    } catch (Exception e) {
      errors.add(label + " " + p + ": " + e);
    }
  }

  // ── region-like files (region / entities / poi): read, fix each chunk, rewrite ──
  static void upgradeRegions(Path dir, DataFixTypes type, String dimId, String label) throws IOException {
    if (!Files.isDirectory(dir)) return;
    try (Stream<Path> s = Files.list(dir)) {
      for (Path f : s.filter(x -> x.getFileName().toString().matches("r\\.-?\\d+\\.-?\\d+\\.mca")).sorted().toList()) {
        Map<Integer, CompoundTag> chunks = readRegion(f, label);
        Map<Integer, CompoundTag> fixed = new TreeMap<>();
        for (var e : chunks.entrySet()) {
          try {
            CompoundTag tag = e.getValue();
            int v = NbtUtils.getDataVersion(tag, -1);
            if (type == DataFixTypes.CHUNK) {
              CompoundTag ctx = new CompoundTag();
              ctx.putString("dimension", dimId);
              ctx.putString("generator", "minecraft:noise");
              tag.put("__context", ctx);
            }
            CompoundTag out = type.updateToCurrentVersion(fixer, tag, v);
            out.remove("__context");
            out.putInt("DataVersion", current);
            if (type == DataFixTypes.CHUNK) loadBlockEntitiesLikeTheGame(out, dimId + " " + f.getFileName() + " #" + e.getKey());
            fixed.put(e.getKey(), out);
            count(label);
          } catch (Exception ex) {
            errors.add(label + " " + f.getFileName() + " #" + e.getKey() + ": " + ex);
          }
        }
        writeRegion(f, fixed);
      }
    }
  }

  // ── block entities: what the game keeps, and how it would save it ──
  static void loadBlockEntitiesLikeTheGame(CompoundTag chunk, String where) {
    Optional<ListTag> list = chunk.getList("block_entities");
    if (list.isEmpty() || list.get().isEmpty()) return;
    ListTag kept = new ListTag();
    for (int i = 0; i < list.get().size(); i++) {
      CompoundTag be = list.get().getCompoundOrEmpty(i);
      String id = be.getStringOr("id", "");
      int x = be.getIntOr("x", 0), y = be.getIntOr("y", 0), z = be.getIntOr("z", 0);
      String at = where + " " + id + " @" + x + "," + y + "," + z;
      if (be.getBooleanOr("keepPacked", false)) { kept.add(be); count("block_entity_keep_packed"); continue; }
      BlockState state = stateAt(chunk, x, y, z);
      if (state == null) { kept.add(be); count("block_entity_kept_state_unreadable"); beKeptRaw.add(at + " (block state unreadable)"); continue; }
      BlockPos pos = new BlockPos(x, y, z);
      BlockEntity obj;
      if ("DUMMY".equals(id)) {
        // LevelChunk.promotePendingBlockEntity: a fresh block entity of the block, if it has one
        if (!(state.getBlock() instanceof EntityBlock eb) || !state.hasBlockEntity()) { count("block_entity_dropped"); beDropped.add(at + " (DUMMY on " + state + ")"); continue; }
        obj = eb.newBlockEntity(pos, state);
        if (obj == null) { count("block_entity_dropped"); beDropped.add(at + " (DUMMY, no block entity)"); continue; }
      } else {
        // BlockEntity.loadStatic: unknown type or invalid block -> null -> not added to the chunk
        BlockEntityType<?> t = beTypes.get(id);
        if (t == null) { count("block_entity_dropped"); beDropped.add(at + " (unknown block-entity type)"); continue; }
        if (!t.isValid(state)) { count("block_entity_dropped"); beDropped.add(at + " (block " + state + " is not valid for this type)"); continue; }
        try {
          obj = t.create(pos, state);
          ProblemReporter.Collector rep = new ProblemReporter.Collector();
          obj.loadWithComponents(TagValueInput.create(rep, registries, be));
          if (!rep.isEmpty()) {
            String r = rep.getReport();
            String brief = r.length() > 300 ? r.substring(0, 300) + "…" : r;
            if (datapackRegistryGap(r)) {
              // Possibly an entry of a WORLD datapack registry, absent from the vanilla
              // lookup used here: the game might load it. Never guess: keep as stored.
              kept.add(be); count("block_entity_kept_registry_gap"); beKeptRaw.add(at + " (" + brief + ")");
              continue;
            }
            // The game logs the problem, skips what it cannot decode and keeps the rest.
            count("block_entity_loaded_with_problems"); beProblems.add(at + " (" + brief + ")");
          }
        } catch (Throwable ex) {
          kept.add(be); count("block_entity_kept_load_exception"); beKeptRaw.add(at + " (" + ex + ")"); continue;
        }
      }
      try {
        kept.add(obj.saveWithFullMetadata(registries));
        count("block_entity_loaded");
      } catch (Throwable ex) {
        kept.add(be); count("block_entity_kept_save_exception"); beKeptRaw.add(at + " (save: " + ex + ")");
      }
    }
    chunk.put("block_entities", kept);
  }

  // Block state at a world position, decoded with the game's own BlockState codec.
  static BlockState stateAt(CompoundTag chunk, int x, int y, int z) {
    int sy = Math.floorDiv(y, 16);
    for (Tag st : chunk.getListOrEmpty("sections")) {
      if (!(st instanceof CompoundTag s) || s.getByteOr("Y", (byte) 0) != sy) continue;
      CompoundTag bs = s.getCompoundOrEmpty("block_states");
      ListTag palette = bs.getListOrEmpty("palette");
      if (palette.isEmpty()) return null;
      int idx = 0;
      if (palette.size() > 1) {
        long[] data = bs.getLongArray("data").orElse(null);
        if (data == null) return null;
        int bits = Math.max(4, 32 - Integer.numberOfLeadingZeros(palette.size() - 1));
        int perLong = 64 / bits;
        int i = ((y & 15) << 8) | ((z & 15) << 4) | (x & 15);
        int li = i / perLong;
        if (li >= data.length) return null;
        idx = (int) ((data[li] >>> ((i % perLong) * bits)) & ((1L << bits) - 1));
        if (idx >= palette.size()) return null;
      }
      return BlockState.CODEC.parse(NbtOps.INSTANCE, palette.get(idx)).result().orElse(null);
    }
    return null;
  }

  static Map<Integer, CompoundTag> readRegion(Path f, String label) throws IOException {
    Map<Integer, CompoundTag> m = new TreeMap<>();
    byte[] b = Files.readAllBytes(f);
    if (b.length < 8192) return m;
    for (int i = 0; i < 1024; i++) {
      int loc = ((b[i * 4] & 0xff) << 24) | ((b[i * 4 + 1] & 0xff) << 16) | ((b[i * 4 + 2] & 0xff) << 8) | (b[i * 4 + 3] & 0xff);
      int off = loc >>> 8, cnt = loc & 0xff;
      if (off == 0 || cnt == 0) continue;
      int pos = off * 4096;
      try {
        int len = ((b[pos] & 0xff) << 24) | ((b[pos + 1] & 0xff) << 16) | ((b[pos + 2] & 0xff) << 8) | (b[pos + 3] & 0xff);
        int ct = b[pos + 4] & 0xff;
        byte[] payload;
        if ((ct & 0x80) != 0) { // external .mcc file
          String n = f.getFileName().toString();
          String[] xz = n.substring(2, n.length() - 4).split("\\.");
          int cx = Integer.parseInt(xz[0]) * 32 + (i & 31), cz = Integer.parseInt(xz[1]) * 32 + (i >> 5);
          payload = Files.readAllBytes(f.resolveSibling("c." + cx + "." + cz + ".mcc"));
          ct &= 0x7f;
        } else payload = Arrays.copyOfRange(b, pos + 5, pos + 4 + len);
        InputStream in = switch (ct) {
          case 1 -> new GZIPInputStream(new ByteArrayInputStream(payload));
          case 2 -> new InflaterInputStream(new ByteArrayInputStream(payload));
          case 3 -> new ByteArrayInputStream(payload);
          default -> throw new IOException("unsupported compression " + ct);
        };
        try (DataInputStream din = new DataInputStream(new BufferedInputStream(in))) {
          m.put(i, NbtIo.read(din, NbtAccounter.unlimitedHeap()));
        }
      } catch (Exception e) {
        errors.add(label + " read " + f.getFileName() + " #" + i + ": " + e);
      }
    }
    return m;
  }

  static void writeRegion(Path f, Map<Integer, CompoundTag> chunks) throws IOException {
    ByteArrayOutputStream body = new ByteArrayOutputStream();
    int[] loc = new int[1024];
    int sector = 2;
    for (var e : chunks.entrySet()) {
      ByteArrayOutputStream z = new ByteArrayOutputStream();
      try (DataOutputStream dout = new DataOutputStream(new DeflaterOutputStream(z))) { NbtIo.write(e.getValue(), dout); }
      byte[] data = z.toByteArray();
      int total = data.length + 5;
      int sectors = (total + 4095) / 4096;
      ByteArrayOutputStream chunk = new ByteArrayOutputStream();
      DataOutputStream d = new DataOutputStream(chunk);
      if (sectors > 255) {
        // As RegionFile does: the payload goes to c.<x>.<z>.mcc, the region keeps a stub
        String n = f.getFileName().toString();
        String[] xz = n.substring(2, n.length() - 4).split("\\.");
        int cx = Integer.parseInt(xz[0]) * 32 + (e.getKey() & 31), cz = Integer.parseInt(xz[1]) * 32 + (e.getKey() >> 5);
        Files.write(f.resolveSibling("c." + cx + "." + cz + ".mcc"), data);
        d.writeInt(1);
        d.writeByte(2 | 0x80);
        sectors = 1;
        count("chunk_external_mcc");
      } else {
        d.writeInt(data.length + 1);
        d.writeByte(2);
        d.write(data);
      }
      byte[] c = chunk.toByteArray();
      body.write(c);
      body.write(new byte[sectors * 4096 - c.length]);
      loc[e.getKey()] = (sector << 8) | sectors;
      sector += sectors;
    }
    try (DataOutputStream o = new DataOutputStream(new BufferedOutputStream(Files.newOutputStream(f)))) {
      for (int l : loc) o.writeInt(l);
      for (int i = 0; i < 1024; i++) o.writeInt(0); // timestamps are not preserved (not compared)
      body.writeTo(o);
    }
  }
}

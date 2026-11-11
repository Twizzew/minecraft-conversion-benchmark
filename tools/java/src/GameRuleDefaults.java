// Prints the default value of every game rule registered by the Minecraft jar on the
// classpath, as "id<TAB>value" lines (booleans as 1/0), into the file given as argument
// (the game's bootstrap redirects standard output to its logger). Mojang's own registry
// is the source: nothing here is typed by hand. Experimental rules are left out.
//   java -cp <minecraft classpath> GameRuleDefaults.java <out.tsv>
import java.io.PrintWriter;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import net.minecraft.SharedConstants;
import net.minecraft.server.Bootstrap;
import net.minecraft.world.level.gamerules.GameRule;
import net.minecraft.world.level.gamerules.GameRules;

public class GameRuleDefaults {
  public static void main(String[] args) throws Exception {
    SharedConstants.tryDetectVersion();
    Bootstrap.bootStrap();
    try (PrintWriter out = new PrintWriter(args[0], "UTF-8")) {
      out.println("#version\t" + SharedConstants.getCurrentVersion().name());
      for (Field f : GameRules.class.getDeclaredFields()) {
        if (!Modifier.isStatic(f.getModifiers()) || f.getType() != GameRule.class) continue;
        f.setAccessible(true);
        GameRule<?> g = (GameRule<?>) f.get(null);
        // Experimental rules (a required feature flag) exist only in worlds that enable it.
        if (!g.requiredFeatures().isEmpty()) continue;
        Object v = g.defaultValue();
        String s = v instanceof Boolean b ? (b ? "1" : "0") : String.valueOf(v);
        out.println(g.id() + "\t" + s);
      }
    }
  }
}

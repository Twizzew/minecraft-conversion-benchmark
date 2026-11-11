// MCCB — santé maximale PAR DÉFAUT de chaque type de créature Java, lue dans le code du jeu
// (DefaultAttributes, attribut minecraft:max_health). Aucune valeur écrite à la main.
// Sert à lire la santé d'une créature Java comme le jeu : LivingEntity.readAdditionalSaveData lit
// `attributes`, puis setHealth(getFloatOr("Health", getMaxHealth())) borne la valeur à [0, santé max]
// (jar 26.3 désassemblé, audit du 09/11/2026).
// Usage (classpath = jar Minecraft + bibliothèques, voir classpath.mjs) :
//   java -cp <cp> tools/java/src/MccbMaxHealth.java > docs/reference/java-default-max-health.v1.json
import java.util.*;
import net.minecraft.SharedConstants;
import net.minecraft.core.registries.BuiltInRegistries;
import net.minecraft.server.Bootstrap;
import net.minecraft.world.entity.EntityType;
import net.minecraft.world.entity.LivingEntity;
import net.minecraft.world.entity.ai.attributes.Attributes;
import net.minecraft.world.entity.ai.attributes.DefaultAttributes;

public class MccbMaxHealth {
  @SuppressWarnings("unchecked")
  public static void main(String[] a) {
    SharedConstants.tryDetectVersion();
    Bootstrap.bootStrap();
    TreeMap<String, Double> out = new TreeMap<>();
    for (EntityType<?> t : BuiltInRegistries.ENTITY_TYPE) {
      if (!DefaultAttributes.hasSupplier(t)) continue;
      var sup = DefaultAttributes.getSupplier((EntityType<? extends LivingEntity>) t);
      if (!sup.hasAttribute(Attributes.MAX_HEALTH)) continue;
      out.put(String.valueOf(BuiltInRegistries.ENTITY_TYPE.getKey(t)), sup.getBaseValue(Attributes.MAX_HEALTH));
    }
    StringBuilder sb = new StringBuilder();
    sb.append("{\n \"source\": \"DefaultAttributes (jar ").append(SharedConstants.getCurrentVersion().name()).append("), attribut minecraft:max_health, généré par tools/java/src/MccbMaxHealth.java\",\n \"max_health\": {\n");
    int i = 0;
    for (var e : out.entrySet()) sb.append("  \"").append(e.getKey()).append("\": ").append(e.getValue()).append(++i < out.size() ? ",\n" : "\n");
    sb.append(" }\n}\n");
    System.out.print(sb);
  }
}

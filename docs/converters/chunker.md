# Chunker in MCCB v1.1

## MCCB 2026-11

| | |
|---|---|
| Release | 1.21.0, https://github.com/HiveGamesOSS/Chunker/releases/tag/1.21.0 |
| File | `chunker-cli-1.21.0.jar`, SHA-256 `63148e587f5ee5a2ca7ebae1079b235c82ae4d1eff8f7a8a8a3398332513dda6` |
| Runtime | `eclipse-temurin:25-jre`, `-XX:MaxRAMPercentage=75` |
| Output formats | Java → Bedrock `BEDROCK_R26_40`, Bedrock → Java `JAVA_26_3` |
| Conditions | Linux lab, one fresh container per conversion (`--cpus 4 --memory 5632m --memory-swap 5632m --network none`), default options. |

Command: `java -XX:MaxRAMPercentage=75 -jar chunker-cli-1.21.0.jar -i <world> -o <output> -f <format>`.
Every run record is in `results/2026-11/chunker-1.21.0/<WORLD>/run-*.json`; the converted worlds are in the release
`v2026.11-results`.

---

Chunker (HiveGamesOSS, MIT licence) was the first competitor measured, **after** the v1.1
rules were frozen (`reports/freeze/ATTESTATION-before-competitors.md`), with the same
sources, fixtures and evaluator as WorldSwitch.

## Build under test

| | |
|---|---|
| Release | 1.20.0 (2026-09-02), https://github.com/HiveGamesOSS/Chunker/releases/tag/1.20.0 |
| File | `chunker-cli-1.20.0.jar`, 31 832 317 bytes |
| SHA-256 | `41efb80bba57c4eb08a810e5cc121211e2c0585aa8ff6eaf63d949782ecea502` |
| Runtime | Java 25 (the Minecraft launcher's runtime; Chunker requires Java 17+) |

## How it was run

`tools/runners/generic/run-suite-command.mjs` (one run per conversion through
`run-command.mjs`; command line stored verbatim in each `run.json`, local paths redacted in
the published copy):

```
java -jar chunker-cli-1.20.0.jar -i <world folder> -o <output folder> -f <format>
```

| Direction | `-f` (output format) | Why |
|---|---|---|
| Java → Bedrock | `BEDROCK_R26_40` | the MCCB Bedrock reference (1.26.40) — also the version WorldSwitch targets |
| Bedrock → Java | `JAVA_26_3` | the MCCB Java reference (26.3) |

No other option (defaults for converter, world, pruning and mapping settings). The input
folder is the canonical source asset extracted by MCCB; the output folder is packed by
MCCB (sorted entries, fixed timestamp) and also identified by a tree hash.

## Known limitation declared by Chunker itself

Chunker's README lists "Entities (excluding paintings / item frames)" among the features
that "do not convert (or have limited conversion)", with no option to enable them. MCCB
measures the same thing independently: the Bedrock outputs of the Java worlds contain **no
actor record in any storage**, and the Java outputs of the Bedrock worlds contain **no
entity file** (checked in the raw files, not only through the MCCB readers). The Chunker
CLI also logs `Missing entity mapping for …` for many types.

## Where the results are

- Run records and logs: `results/chunker/runs/<run id>/`.
- Per-world results and failure census: `results/chunker/<direct run id>/`.
- Side by side with other converters: `results/COMPARISON-v1.1.md`.

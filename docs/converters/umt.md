# UMT in MCCB 2026-11

Universal Minecraft Tool (Pryze Software LLC) is a paid Windows application. It has no command-line mode, so it could
not run in the Linux lab like the other tools: it was run on a Windows 11 PC (16 cores, 31 GB of RAM, no limit set)
by driving its window.

| | |
|---|---|
| Version | 1.5.10 |
| File | `UniversalMinecraftTool.exe`, SHA-256 `9c35ed26d7b49abed4c0448bea674e428f8481554fa925c298985f8564c0dc51` |
| Output | Java → Bedrock "Bedrock 26.50 (Latest)", Bedrock → Java "Java 26.3 (Latest)" |
| Settings | defaults, none changed: Overworld, Nether and End; tile entities, entities and ticks on; partially generated chunks skipped; older chunk versions allowed; game mode and difficulty "No Change"; depth fixer "Clip + Bedrock"; new world centre X 0 Z 0. Application settings: "Copy Bedrock Worlds" on (UMT works on a copy) |

Steps for each conversion: Converter → Input (world folder) → Output (edition, version "Latest") → Options (defaults)
→ Start Conversion → Save World. The run records (`results/2026-11/umt-1.5.10/<WORLD>/run-*.json`) keep every setting.

Times: the clock was read before the click and after the end message appeared on screen, so each time is an upper
bound that includes the driving delay; the time UMT itself displays is kept next to it. Peak memory was not measured.
These times are not comparable to the second with the lab times of the other tools.

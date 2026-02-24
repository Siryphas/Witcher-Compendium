import { extractPack } from "@foundryvtt/foundryvtt-cli";
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";

const outDir = path.resolve(process.cwd(), "jsonData");
const compendium = path.resolve(process.cwd(), "wtrpg-complete-compendium/packs");
if (!existsSync(outDir)) {
    console.error("Packs directory does not exist in the build");
}

const jsonPackFolder = await fs.readdir(outDir);
const compendiumPackFolder = await fs.readdir(compendium)

const replacer = (key, value) => {
      if (key === "createdTime") return undefined
      if (key === "modifiedTime") return undefined
      if (key === "lastModifiedBy") return undefined
      return value
}

console.log("Cleaning jsonData");
for (const pack of jsonPackFolder) {
    const files = await fs.readdir(`jsonData/${pack}`, { withFileTypes: true });
    const jsonFiles = files
        .filter((f) => f.isFile() && f.name.toLowerCase().endsWith(".json"))
        .map((f) => f.name);
    for (const file of jsonFiles) {
        await fs.rm(path.resolve(`jsonData`, pack, file));
    }
}

for (const pack of compendiumPackFolder) {
    console.log(`Extracting pack: ${pack}`);
    await extractPack(path.resolve(compendium, pack), `jsonData/${pack}`, {jsonOptions: {replacer: replacer, space: 2}, folders: true});
}

console.log("Extraction Complete");

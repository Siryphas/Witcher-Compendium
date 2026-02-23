import { compilePack } from "@foundryvtt/foundryvtt-cli";
import fs from "fs/promises";
import path from "path";

const MODULE_ID = process.cwd();

const compendium = path.resolve(process.cwd(), "wtrpg-compendium/packs");

console.log("Cleaning packs");
const packFolder = await fs.readdir(compendium);
for (const pack of packFolder) {
    const files = await fs.readdir(`wtrpg-compendium/packs/${pack}`);
    for (const file of files) {
        await fs.rm(path.resolve(`wtrpg-compendium/packs/${pack}`, file));
    }
}

const packs = await fs.readdir('./jsonData');
for (const pack of packs) {
    if (pack === '.gitattributes') continue;
    console.log('Packing ' + pack);
    await compilePack(`${MODULE_ID}/jsonData/${pack}`, `${MODULE_ID}/wtrpg-compendium/packs/${pack}`, { recursive: true });
}
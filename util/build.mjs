import { compilePack } from "@foundryvtt/foundryvtt-cli";
import fs from "fs/promises";

const MODULE_ID = process.cwd();

const packs = await fs.readdir('./jsonData');
for (const pack of packs) {
    if (pack === '.gitattributes') continue;
    console.log('Packing ' + pack);
    await compilePack(`${MODULE_ID}/jsonData/${pack}`, `${MODULE_ID}/wtrpg-compendium/packs/${pack}`, { recursive: true });
}
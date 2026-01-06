import { compilePack } from "@foundryvtt/foundryvtt-cli";
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";

// Clean output directory, or create build directory
const outDir = path.resolve(process.cwd(), "build");
if (existsSync(outDir)) {
    const filesToClean = (await fs.readdir(outDir)).map((dirName) => path.resolve(outDir, dirName));
    for (const file of filesToClean) {
        await fs.rm(file, { recursive: true });
    }
} else {
    await fs.mkdir(outDir);
}

console.log("Clean Finished");

// Build packs
const packFolders = await fs.readdir("packs");
for (const pack of packFolders) {
    await compilePack(`packs/${pack}`, path.resolve(outDir, `packs/${pack}`), { recursive: true });
}

console.log("Build Packs Finished");

// Copy files and folders to output
const files = ["module.json"];
for (const file of files) {
    await fs.cp(file, path.resolve(outDir, file), { recursive: true });
}
console.log("Build Complete");

if (process.argv[2] === "--watch") {
    const watcher = fs.watch(process.cwd(), { recursive: true });
    console.log("Watching Files");
    for await (const event of watcher) {
        const file = event.filename.split(path.sep)[0];
        if (files.includes(file)) {
            const outFile = path.resolve(outDir, file);
            if (existsSync(file)) {
                await fs.cp(file, outFile , { recursive: true });
            } else {
                await fs.rm(outFile, { recursive: true })
            }
            console.log("Files updated");
        }
    }
}

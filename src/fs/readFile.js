import { stat } from "fs/promises";
import { resolve } from "path";
import { pipeline } from 'node:stream/promises';
import { createReadStream } from 'node:fs';
import { workingDirPath } from "../navigation/navigation.js";

const readFile = async (path) => {
    try {
        if(path.length) {
            path = path.join(" ");
        } else {throw new Error("Invalid input: wrong or missing command arguments")}

        try {
            const stats = await stat(resolve(workingDirPath, path));
            if(!stats.isFile()) throw ("Operation failed: No such file");
        } catch (error) {
            throw new Error ("Operation failed: No such file");
        }

        const readableStream = createReadStream(resolve(workingDirPath, path), {encoding: "utf-8"});
        await pipeline(
            readableStream,
            process.stdout,
            {end: false},
        );
    } catch (error) {
        console.log(`Operation failed: ${error.message}`);
    }
}

export { readFile };
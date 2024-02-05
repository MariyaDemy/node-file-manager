import { resolve } from "path";
import { workingDirPath } from "../navigation/navigation.js";
import { existsFile } from "../utils/utils.js";
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";

const compress = async (path, decompress) => {
    try {
        if(path.length === 2) {
            const cleanPath = path.map((path) => path.replace(/"/g, '')); //remove "" in paths
            const fileName1 = resolve(workingDirPath, cleanPath[0]);
            const fileName2 = resolve(workingDirPath, cleanPath[1]);

            if (await existsFile(fileName1)) {
                const readableStream = createReadStream(fileName1);
                const writeableStream = createWriteStream(fileName2);
                const brotli = decompress ? createBrotliDecompress() : createBrotliCompress();
                await pipeline(readableStream, brotli, writeableStream);
              } else {
                throw new Error("Operation failed: a file does not exist");
            }

        } else {throw new Error("Invalid input: wrong or missing command arguments")}
    } catch (error) {
        const message = error.message;
        if(message.startsWith("ENOENT") || message.startsWith("EPERM") || message.startsWith("EISDIR")) {
            console.log(`Operation failed: ${error.message}`);
            return;
        }
        console.log(message);
    }
}

export { compress };
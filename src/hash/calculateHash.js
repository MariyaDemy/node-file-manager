import { resolve } from "path";
import { workingDirPath } from "../navigation/navigation.js";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const calculateHash = async (path) => {
    try {
        if(path.length) {
            path = path.join(" ");
        } else {throw new Error("Invalid input: wrong or missing command arguments")}

        const fileContents = await readFile(resolve(workingDirPath, path));
        const hexHash = createHash("sha256").update(fileContents).digest("hex");
        console.log(hexHash);
    } catch (error) {
        const message = error.message;
        if(message.startsWith("ENOENT") || message.startsWith("EPERM") || message.startsWith("EISDIR")) {
            console.log(`Operation failed: ${error.message}`);
            return;
        }
        console.log(message);
    }
}

export { calculateHash };
import { resolve } from "path";
import { workingDirPath } from "../navigation/navigation.js";
import { open } from 'node:fs/promises';

const createEmptyFile = async (path) => {
    try {
        if(path.length) {
            path = path.join(" ");
        } else {throw new Error("Invalid input: wrong or missing command arguments")};

        const openedFile = await open(resolve(workingDirPath, path), 'wx+');
        await openedFile.close();
    } catch (error) {
        const message = error.message;
        if(message.startsWith("ENOENT") || message.startsWith("EPERM") || message.startsWith("EEXIST")) {
            console.log(`Operation failed: ${error.message}`);
            return;
        }
        console.log(message);
    }
}

export { createEmptyFile };
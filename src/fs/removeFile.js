import { unlink } from "fs/promises";
import { resolve } from "path";
import { workingDirPath } from "../navigation/navigation.js";

const removeFile = async (path) => {
    try {
        if(path.length) {
            path = path.join(" ");
        } else {throw new Error("Invalid input: wrong or missing command arguments")}

        await unlink(resolve(workingDirPath, path));
    } catch (error) {
        const message = error.message;
        if(message.startsWith("ENOENT") || message.startsWith("EPERM")) {
            console.log(`Operation failed: ${error.message}`);
            return;
        }
        console.log(message);
    }
}

export { removeFile };
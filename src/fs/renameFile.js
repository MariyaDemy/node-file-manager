import { resolve } from "path";
import { workingDirPath } from "../navigation/navigation.js";
import { rename } from "node:fs/promises";
import { existsFile } from "../utils/utils.js";

const renameFile = async (path) => {
    try {
        if(path.length === 2) {
            const cleanPath = path.map((path) => path.replace(/"/g, '')); //remove "" in paths
            const oldPath = resolve(workingDirPath, cleanPath[0]);
            const newPath = resolve(workingDirPath, cleanPath[1]);

            if (await existsFile(newPath)) {
                throw new Error("Operation failed: a file with such name already exists");
              } else {
                await rename(oldPath, newPath);
            }
        } else if(path.length > 2){
            console.log(path);
        }
        else {throw new Error("Invalid input: wrong or missing command arguments")}
    } catch (error) {
        const message = error.message;
        if(message.startsWith("ENOENT") || message.startsWith("EPERM")) {
            console.log(`Operation failed: ${error.message}`);
            return;
        }
        console.log(message);
    }
}

export { renameFile };
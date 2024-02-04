import { homedir } from "node:os";
import { resolve, parse } from "path";
import { stat } from "fs/promises";

let workingDirPath = homedir();

const printCurrentWorkingDir = () => {
    console.log(`You are currently in ${workingDirPath}`);
}

const goToUpperDir = () => {
    if(workingDirPath === parse(workingDirPath).root){
        console.log("Operation failed: You are already in the root directory");
    }
    workingDirPath = resolve(workingDirPath, "..");
}

const goToFolder = async (path) => {
    try {
        if(path.length) path = path.join(" ");
        const stats = await stat(resolve(workingDirPath, path));
        if(!stats.isDirectory()) throw new Error("No such directory");
        workingDirPath = resolve(workingDirPath, path);
    } catch (error) {
        console.log("Invalid input: wrong or missing command arguments")
    }
}

export { workingDirPath, printCurrentWorkingDir, goToUpperDir, goToFolder };
import { homedir } from "node:os";
import { resolve, parse } from "path";

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

export { workingDirPath, printCurrentWorkingDir, goToUpperDir };
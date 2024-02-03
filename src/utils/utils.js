import { homedir } from "node:os";

let workingDirPath = homedir();

const printCurrentWorkingDir = () => {
    console.log(`You are currently in ${workingDirPath}`);
}

const parseUserName = () => {
    const userName = process.argv.slice(2)
        .find((key) => key.startsWith("--username"))
        .replace(/--username=/, "")
    return userName;
};

export { printCurrentWorkingDir, parseUserName };
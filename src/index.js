import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output, stderr as error } from 'node:process';
import { parseUserName } from "./utils/utils.js";
import { printDirList } from './navigation/list.js';
import { printEOL, printCpus, printHomeDir, printUsername, printCPUArchitecture } from './os/osInfo.js';
import { workingDirPath, printCurrentWorkingDir, goToUpperDir, goToFolder } from './navigation/navigation.js';
import { readFile } from './fs/readFile.js';
import { createEmptyFile } from './fs/createEmptyFile.js';
import { removeFile } from './fs/removeFile.js';
import { calculateHash } from './hash/calculateHash.js';
import { renameFile } from './fs/renameFile.js';
import { SPLIT_FILE_PATHS_REGEX } from './utils/constants';
import { compress } from './zip/compressFile.js';

const executeCommand = async (command) => {
    switch (command) {
        case "ls":
            await printDirList(workingDirPath);
            break;
        case "up":
            goToUpperDir();
            break;
        case "os --EOL":
            printEOL();
            break;
        case "os --cpus":
            printCpus();
            break;
        case "os --homedir":
            printHomeDir();
            break;
        case "os --username":
            printUsername();
            break;
        case "os --architecture":
            printCPUArchitecture();
            break;
        default:
            console.log("Invalid input: unknown operation or invalid input");
    }
    printCurrentWorkingDir();
}

const init = () => {
    const userName = parseUserName();
    const greetingPhrase = `Welcome to the File Manager, ${userName}!`;
    const farewellPhrase = `Thank you for using File Manager, ${userName}, goodbye!`;;

    const rl = readline.createInterface({ input, output });

    console.log(greetingPhrase);
    printCurrentWorkingDir();

    rl.on('line', async (input) => {
        input = input.trim();
        if(input === ".exit") {
            rl.close();
            return;
        } else if(input.startsWith("cd")){
            let [_, ...folderPath] = input.split(" ");
            await goToFolder(folderPath);
            printCurrentWorkingDir();
            return;
        } else if(input.startsWith("cat")){
            let [_, ...filePath] = input.split(" ");
            await readFile(filePath);
            printCurrentWorkingDir();
            return;
        } else if(input.startsWith("add")){
            let [_, ...filePath] = input.split(" ");
            await createEmptyFile(filePath);
            printCurrentWorkingDir();
            return;
        } else if(input.startsWith("rn")){
            let [_, ...filePath] = input.split(SPLIT_FILE_PATHS_REGEX);
            await renameFile(filePath);
            printCurrentWorkingDir();
            return;
        } else if(input.startsWith("compress")){
            let [_, ...filePath] = input.split(SPLIT_FILE_PATHS_REGEX);
            await compress(filePath);
            printCurrentWorkingDir();
            return;
        }
        else if(input.startsWith("decompress")){
            let [_, ...filePath] = input.split(SPLIT_FILE_PATHS_REGEX);
            await compress(filePath, true);
            printCurrentWorkingDir();
            return;
        }
        else if(input.startsWith("rm")){
            let [_, ...filePath] = input.split(" ");
            await removeFile(filePath);
            printCurrentWorkingDir();
            return;
        } else if(input.startsWith("hash")){
            let [_, ...filePath] = input.split(" ");
            await calculateHash(filePath);
            printCurrentWorkingDir();
            return;
        }
        executeCommand(input);
    });

    rl.on('close', () => {
        printCurrentWorkingDir();
        console.log(farewellPhrase);
    });
}

init();

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output, stderr as error } from 'node:process';
import { workingDirPath, printCurrentWorkingDir, parseUserName } from "./utils/utils.js";
import { printDirList } from './navigation/list.js';
import { printEOL, printCpus, printHomeDir, printUsername, printCPUArchitecture } from './os/osInfo.js';

const init = () => {
    const userName = parseUserName();
    const greetingPhrase = `Welcome to the File Manager, ${userName}!`;
    const farewellPhrase = `Thank you for using File Manager, ${userName}, goodbye!`;;

    const rl = readline.createInterface({ input, output });

    console.log(greetingPhrase);
    printCurrentWorkingDir();

    rl.on('line', async (input) => {
        switch (input.trim()) {
            case ".exit":
              rl.close();
              break;
            case "ls":
              await printDirList(workingDirPath);
              printCurrentWorkingDir();
              break;
            case "os --EOL":
                printEOL();
                printCurrentWorkingDir();
                break;
            case "os --cpus":
                printCpus();
                printCurrentWorkingDir();
                break;
            case "os --homedir":
                printHomeDir();
                printCurrentWorkingDir();
                break;
            case "os --username":
                printUsername();
                printCurrentWorkingDir();
                break;
            case "os --architecture":
                printCPUArchitecture();
                printCurrentWorkingDir();
                break;
            default:
              console.log(`Command entered: ${input}`);
        }
    });

    rl.on('close', () => {
        console.log(farewellPhrase);
        printCurrentWorkingDir();
    });
}

init();

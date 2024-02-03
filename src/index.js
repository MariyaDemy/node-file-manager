import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output, stderr as error } from 'node:process';
import { printCurrentWorkingDir, parseUserName } from "./utils/utils.js";

const init = () => {
    const userName = parseUserName();
    const greetingPhrase = `Welcome to the File Manager, ${userName}!`;
    const farewellPhrase = `Thank you for using File Manager, ${userName}, goodbye!`;;

    const rl = readline.createInterface({ input, output });

    console.log(greetingPhrase);
    printCurrentWorkingDir();

    rl.on('line', (input) => {
        switch (input.trim()) {
            case ".exit":
              rl.close()
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

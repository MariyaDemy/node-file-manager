import { EOL, cpus, homedir, userInfo, arch } from "node:os";

const printEOL = () => {
    console.log(EOL);
}

const printCpus = () => {
    console.log({
        CPUsCount: cpus().length,
        CPUsDesciption: cpus().map((cpu) => {
            return {model: cpu.model, clockRate: `${cpu.speed / 1000} GHz`} //convert MHz to GHz
        }),
    });
}

const printHomeDir = () => {
    console.log(homedir());
}

const printUsername = () => {
    console.log(userInfo().username);
}

const printCPUArchitecture = () => {
    console.log(arch());
}

export { printEOL, printCpus, printHomeDir, printUsername, printCPUArchitecture };
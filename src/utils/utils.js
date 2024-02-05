import { access } from "node:fs/promises";

const parseUserName = () => {
    const userName = process.argv.slice(2)
        .find((key) => key.startsWith("--username"))
        .replace(/--username=/, "")
    return userName;
};

const existsFile = async (path) => {
    try {
      await access(path);
      return true;
    } catch (error) {
      return false;
    }
};

export { parseUserName, existsFile };
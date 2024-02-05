import { access } from "node:fs/promises";

const parseUserName = () => {
  try {
    const userName = process.argv.slice(2)
        .find((key) => key.startsWith("--username"))
        .replace(/--username=/, "")
    return userName;
  } catch (error) {
    console.log("Invalid input: enter your --username when starting the program");
    return "anonymous friend";
  }
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
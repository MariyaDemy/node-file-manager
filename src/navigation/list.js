import { readdir } from "node:fs/promises";

const printDirList = async (folderPath) => {
    try {
      const folderContent = await readdir(folderPath, {withFileTypes: true});
      const sortedFolderContent = folderContent
        .map((item) => {
        const type = item.isDirectory() ? "directory" : item.isFile() ? "file" : "other";
        return {Name: item.name, Type: type };
      })
        .filter((item) => item.Type !== "other")
        .sort((a, b) => {
            if (a.Type === b.Type) {
                return a.Name - b.Name;
            }
            return a.Type === 'directory' ? -1 : 1;
        })
      console.table(sortedFolderContent);
    } catch (error) {
      console.log("Operation failed");
    }
};

export { printDirList };
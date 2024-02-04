const parseUserName = () => {
    const userName = process.argv.slice(2)
        .find((key) => key.startsWith("--username"))
        .replace(/--username=/, "")
    return userName;
};

export { parseUserName };
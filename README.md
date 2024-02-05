# node-file-manager

Assignment: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md

The program is started by npm-script "start" in a following way:
```npm run start -- --username=your_username```

Starting working directory is current user's home directory, e.g. C:\Users\UserName (on Windows)

## The list of the available commands:

# Please, note that commands with 2(!) arguments expect files with spaces to be wrapped in double quotes ("). More see in the description of specific methods below.

- Navigation & working directory (nwd)
    - Go upper from current directory
    ```bash
    up
    ```
    - Go to dedicated folder from current directory (`path_to_directory` can be relative or absolute), e.g ```cd Users```
    ```bash
    cd path_to_directory
    ```
    - Print in console list of all files and folders in current directory
    ```bash
    ls
    ```
- Basic operations with files
    - Read file and print it's content in console, e.g ```cat Text.txt``` or ```cat New Text.txt```:
    ```bash
    cat path_to_file
    ```
    - Create empty file in current working directory, e.g ```add Text.txt``` or ```add New Text.txt```:
    ```bash
    add new_file_name
    ```
    - Rename file, e.g: ```rn Text.txt NewName.txt``` or ```rn Text.txt "New Name With Spaces.txt"```:
    ```bash
    rn path_to_file new_filename
    ```
    - Delete file, e.g ``` rm Text.txt``` or ```rm New Text.txt```:
    ```bash
    rm path_to_file
    ```
- Operating system info (prints following information in console)
    - Get EOL (default system End-Of-Line) and print it to console, e.g ```"\r\n"``` (on Windows)
    ```bash
    os --EOL
    ```
    - Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) and print it to console,
    e.g ```{CPUsCount: 12, CPUsDesciption: [{model, clockRate}, ...]}```
    ```bash
    os --cpus
    ```
    - Get home directory and print it to console
    ```bash
    os --homedir
    ```
    - Get current *system user name* and print it to console
    ```bash
    os --username
    ```
    - Get CPU architecture for which Node.js binary has compiled and print it to console
    ```bash
    os --architecture
    ```
- Hash calculation
    - Calculate hash for file and print it into console, e.g ```hash Text.txt```
    ```bash
    hash path_to_file
    ```
- Compress and decompress operations
    - Compress file (Brotli algorithm is used), e.g ```compress Text.txt archive.br``` or ```compress "New Text.txt" "New Archive.txt"```
    or ```compress Text.txt "New Archive.br"```
    ```bash
    compress path_to_file path_to_destination
    ```
    - Decompress file (Brotli algorithm is used), e.g e.g ```decompress archive.br Decompressed.txt``` or ```decompress "New Archive.br" "New Decompressed.txt"```
    ```bash
    decompress path_to_file path_to_destination
    ```

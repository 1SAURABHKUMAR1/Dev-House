import { fileFormat } from 'Types';

// check if the file is root level or not
const isRootLevel = (files: fileFormat[], child: fileFormat) => {
    const parentId = child.directory;
    if (!parentId) return true;

    const parent = files.find((file) => file.id === parentId);
    if (!parent) return true;

    return false;
};

const sortFiles = (file1: fileFormat, file2: fileFormat) => {
    let first;

    if (file1.type === file2.type) {
        if (file1.name > file2.name) first = file2;
        else first = file1;
    } else if (file1.type === 'directory') {
        first = file1;
    } else {
        first = file2;
    }

    return first === file1 ? -1 : 1;
};

const isFileOpenedInDirectory = (
    allFiles: fileFormat[],
    directory: fileFormat,
    selectedFile: fileFormat | null,
) => {
    const currentFolderTreeFiles = getAllFilesInCurrentSubtree(
        allFiles,
        selectedFile,
    );

    return currentFolderTreeFiles.find((file) => file.id === directory.id)
        ? true
        : false;
};

const getAllFilesInCurrentSubtree = (
    allFiles: fileFormat[],
    selectedFile: fileFormat | null,
) => {
    if (!selectedFile) return [];

    const currentTree = [selectedFile];

    let parentDirectory = getParentDirectory(allFiles, selectedFile);

    while (parentDirectory) {
        currentTree.push(parentDirectory);

        parentDirectory = getParentDirectory(allFiles, parentDirectory);
    }

    return currentTree;
};

const getParentDirectory = (
    allFiles: fileFormat[],
    selectedFile: fileFormat,
) => {
    if (selectedFile.directory)
        return allFiles.find((file) => file.id === selectedFile.directory);
};

const getFileDepth = (allFiles: fileFormat[], file: fileFormat) => {
    let depth = 0;

    let parentFolder = getParentDirectory(allFiles, file);

    while (parentFolder) {
        depth++;
        parentFolder = getParentDirectory(allFiles, parentFolder);
    }

    return depth;
};

export { isRootLevel, sortFiles, isFileOpenedInDirectory, getFileDepth };

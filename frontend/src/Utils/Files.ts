import { codeBoxType, fileFormat } from 'Types';
import { codes } from './Code';

import Prettier from 'prettier';
import prettierParser from 'prettier/parser-babel';
import ErrorToast from './Toast/Error';

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

    while (!!parentDirectory) {
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

const handleCodeChange = (
    event: string | undefined,
    selectedFile: fileFormat,
    setAllFiles: React.Dispatch<React.SetStateAction<fileFormat[]>>,
    setSelectedFile: React.Dispatch<React.SetStateAction<fileFormat>>,
) => {
    if (event && selectedFile.code) {
        setAllFiles((file) =>
            file.map((file) =>
                file.id === selectedFile.id
                    ? {
                          ...file,
                          code: event,
                      }
                    : file,
            ),
        );

        setSelectedFile((file) => ({
            ...file,
            code: event,
        }));

        // socket.emit(ACTIONS_CODE_CLIENT_CODE, {
        //     codebox_id,
        //     code: event ?? '',
        // });
    }
};

const resetCode = (
    language: codeBoxType,
    emitCode: boolean,
    setAllFiles: React.Dispatch<React.SetStateAction<fileFormat[]>>,
    setSelectedFile: React.Dispatch<React.SetStateAction<fileFormat>>,
) => {
    setAllFiles(
        codes[language] ?? [
            {
                id: 'error',
                directory: null,
                name: 'Error',
                type: 'directory',
            },
        ],
    );

    const selectFile = codes[language].find((file) => {
        if (file.name === 'index.js') return file;
        if (file.name === 'index.ts') return file;
        if (file.name === 'index.jsx') return file;
        if (file.name === 'index.tsx') return file;
        if (file.name === 'index.cpp') return file;
        if (file.name === 'index.py') return file;

        return null;
    });

    setSelectedFile(
        selectFile ?? {
            id: '',
            directory: '',
            name: '',
            type: 'directory',
        },
    );

    if (emitCode) {
        // socket.emit(ACTIONS_CODE_CLIENT_CODE, {
        //     codeboxId,
        //     code: finalCode,
        // });
    }
};

const formatCode = (
    language: codeBoxType,
    codeBoxType: 'LIBRARY' | 'LANGUAGE',
    selectedFile: fileFormat,
    setAllFiles: React.Dispatch<React.SetStateAction<fileFormat[]>>,
    setSelectedFile: React.Dispatch<React.SetStateAction<fileFormat>>,
) => {
    if (language === 'JAVASCRIPT' || codeBoxType === 'LIBRARY') {
        const prettifiedCode = Prettier.format(selectedFile.code ?? '', {
            parser: 'babel',
            plugins: [prettierParser],
            arrowParens: 'always',
            bracketSameLine: true,
            singleQuote: true,
            semi: true,
            jsxSingleQuote: false,
            tabWidth: 4,
            endOfLine: 'lf',
            htmlWhitespaceSensitivity: 'css',
            jsxBracketSameLine: false,
            printWidth: 80,
            proseWrap: 'preserve',
            quoteProps: 'as-needed',
            requirePragma: false,
            trailingComma: 'all',
            useTabs: false,
        }).replace(/\n$/, '');

        handleCodeChange(
            prettifiedCode,
            selectedFile,
            setAllFiles,
            setSelectedFile,
        );
    } else {
        ErrorToast('Failed');
    }
};

export {
    isRootLevel,
    sortFiles,
    isFileOpenedInDirectory,
    getFileDepth,
    formatCode,
    resetCode,
    handleCodeChange,
};

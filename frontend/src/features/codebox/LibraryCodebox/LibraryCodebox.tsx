import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';

import {
    SideDock,
    MonacoEditor,
    Preview,
    ConsolePanel,
    LibraryFooter,
} from 'features';

import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

import { languageCodeboxProps, sidebarIcons } from 'Types';

const sideBarIcons: sidebarIcons = [
    { type: 'FILES', icon: 'files', tooltipLabel: 'Files' },
    { type: 'USERS', tooltipLabel: 'Users', icon: 'users' },
    { type: 'CHAT', icon: 'chat', tooltipLabel: 'Chat' },
    { type: 'SHARE', tooltipLabel: 'Collaborate', icon: 'share' },
];

const LibraryCodebox = ({
    users,
    chats,
    monacoEditorCode,
    handleCodeChange,
    resetCode,
    formatCode,
}: languageCodeboxProps) => {
    const [consoleVisible, setConsoleVisible] = useState(false);

    const handleConsoleVisible = () => {
        setConsoleVisible(!consoleVisible);
    };

    return (
        <>
            <Flex flexDir="column" flex="1">
                <Flex flex="1">
                    <SideDock
                        buttonsArray={sideBarIcons}
                        users={users}
                        chats={chats}
                        defaultOpen="Files"
                    />

                    <Allotment maxSize={Infinity}>
                        <Allotment.Pane minSize={200} preferredSize={'50%'}>
                            <MonacoEditor
                                codeMonaco={monacoEditorCode}
                                language={'JAVASCRIPT'}
                                handleCodeChange={handleCodeChange}
                            />
                        </Allotment.Pane>

                        <Allotment vertical={true} minSize={200}>
                            <Allotment.Pane preferredSize="75%">
                                <Preview
                                    formatCode={formatCode}
                                    resetCode={resetCode}
                                />
                            </Allotment.Pane>

                            <Allotment.Pane
                                minSize={60}
                                snap
                                visible={consoleVisible}
                            >
                                <ConsolePanel />
                            </Allotment.Pane>
                        </Allotment>
                    </Allotment>
                </Flex>

                <LibraryFooter handleConsoleVisiblity={handleConsoleVisible} />
            </Flex>
        </>
    );
};

export default LibraryCodebox;

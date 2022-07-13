import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useLayoutEffect, useState } from 'react';

import {
    SideDock,
    MonacoEditor,
    Preview,
    ConsolePanel,
    LibraryFooter,
    setSidebarComponent,
    ChatSide,
    UserSide,
    ShareSide,
    FileSide,
    resetCodeboxState,
} from 'features';

import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

import { languageCodeboxProps, sidebarIcons } from 'Types';
import { useAppDispatch, useAppSelector } from 'store/hooks';

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
    allFiles,
}: languageCodeboxProps) => {
    const [consoleVisible, setConsoleVisible] = useState(false);
    const dispatch = useAppDispatch();
    const { sidebarComponent } = useAppSelector((state) => state.codebox);

    const handleConsoleVisible = () => {
        setConsoleVisible(!consoleVisible);
    };

    useLayoutEffect(() => {
        dispatch(setSidebarComponent({ component: 'Files' }));

        return () => {
            dispatch(resetCodeboxState());
        };
    }, [dispatch]);

    return (
        <>
            <Flex flexDir="column" flex="1">
                <Flex flex="1">
                    <SideDock buttonsArray={sideBarIcons} />

                    <Allotment maxSize={Infinity}>
                        <Allotment.Pane
                            minSize={150}
                            maxSize={250}
                            preferredSize={170}
                            visible={sidebarComponent !== 'None'}
                        >
                            <Box
                                flexDir="column"
                                flex="1"
                                display={
                                    sidebarComponent !== 'None'
                                        ? 'inline-flex'
                                        : 'none'
                                }
                                height="100%"
                                width="100%"
                            >
                                {sidebarComponent === 'Files' && (
                                    <Box flex="0" pt="4" pb="4">
                                        <FileSide files={allFiles} />
                                    </Box>
                                )}
                                {sidebarComponent === 'Users' && (
                                    <>
                                        <Box
                                            justifyContent="center"
                                            alignItems="center"
                                            display="flex"
                                            flex="0"
                                            pt="4"
                                            pb="4"
                                            fontSize="large"
                                            fontWeight="semibold"
                                            paddingInline="6"
                                            alignContent="center"
                                        >
                                            <Text textAlign="center">
                                                All Users
                                            </Text>
                                        </Box>
                                        <UserSide users={users} />
                                    </>
                                )}
                                {sidebarComponent === 'Chat' && (
                                    <>
                                        <Box
                                            justifyContent="center"
                                            alignItems="center"
                                            display="flex"
                                            flex="0"
                                            pt="4"
                                            pb="4"
                                            fontSize="large"
                                            fontWeight="semibold"
                                            paddingInline="6"
                                            alignContent="center"
                                        >
                                            <Text textAlign="center">
                                                Chat Box
                                            </Text>
                                        </Box>
                                        <ChatSide chats={chats} />
                                    </>
                                )}
                                {sidebarComponent === 'Collaborate' && (
                                    <>
                                        <Box
                                            justifyContent="center"
                                            alignItems="center"
                                            display="flex"
                                            flex="0"
                                            pt="4"
                                            pb="4"
                                            fontSize="large"
                                            fontWeight="semibold"
                                            paddingInline="6"
                                            alignContent="center"
                                        >
                                            <Text textAlign="center">
                                                Collaborate
                                            </Text>
                                        </Box>
                                        <ShareSide />
                                    </>
                                )}
                            </Box>
                        </Allotment.Pane>

                        <Allotment.Pane minSize={200} preferredSize={'50%'}>
                            <MonacoEditor
                                codeMonaco={monacoEditorCode}
                                language={'JAVASCRIPT'} //FIXME:
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

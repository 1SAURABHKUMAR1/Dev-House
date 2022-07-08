import { Box, Image, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';

import { ChatSide, UserSide, ShareSide, FileSide } from 'features';
import { sidebarProps } from 'Types';

const SideDock = ({ buttonsArray, users }: sidebarProps) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [boxComponent, setBoxComponent] = useState<
        'Chat' | 'Collaborate' | 'Files' | 'Users'
    >('Users');

    const handleSidebarOpen = (
        buttonType: 'Chat' | 'Collaborate' | 'Files' | 'Users',
    ) => {
        if (boxComponent === buttonType)
            return setSidebarOpen(() => !sidebarOpen);

        !sidebarOpen && setSidebarOpen(true);
        setBoxComponent(buttonType);
    };

    return (
        <>
            <Box
                as="nav"
                display="flex"
                flexDirection="column"
                margin="0px"
                alignItems="center"
                pos="sticky"
                bottom="0"
                left="0"
                py="1.5rem"
                px="0.5rem"
                borderRight="2px solid"
                gap="1.5rem"
                bg="hsl(0deg 0% 100%)"
                borderColor={useColorModeValue('gray.200', 'gray.900')}
            >
                {buttonsArray.map((button) => (
                    <Tooltip
                        label={button.tooltipLabel}
                        key={button.type}
                        placement="right"
                    >
                        <Box
                            width="2rem"
                            height="2rem"
                            objectFit="contain"
                            overflow="hidden"
                            cursor="pointer"
                            opacity="0.7"
                            transition="transform 200ms cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s, opacity 200ms ease-in-out 100ms"
                            animation="0.5s cubic-bezier(0.22, 0.29, 0.12, 2) 0.5s 1 normal backwards running icon"
                            _hover={{ transform: 'scale(1.2)', opacity: '1' }}
                            onClick={() =>
                                handleSidebarOpen(button.tooltipLabel)
                            }
                            key={button.type}
                        >
                            <Image
                                src={`/images/${button.icon}.svg`}
                                key={button.type}
                            />
                        </Box>
                    </Tooltip>
                ))}
            </Box>
            <Box
                w="15%"
                maxW="15rem"
                flexDir="column"
                display={sidebarOpen ? 'inline-flex' : 'none'}
                borderRight="2px solid"
                borderColor={useColorModeValue('gray.200', 'gray.900')}
            >
                {boxComponent === 'Files' && <FileSide />}
                {boxComponent === 'Users' && (
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
                            <Text textAlign="center">All Users</Text>
                        </Box>
                        <UserSide users={users} />
                    </>
                )}
                {boxComponent === 'Chat' && (
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
                            <Text textAlign="center">Chat Box</Text>
                        </Box>
                        <ChatSide />
                    </>
                )}
                {boxComponent === 'Collaborate' && (
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
                            <Text textAlign="center">Collaborate</Text>
                        </Box>
                        <ShareSide />
                    </>
                )}
            </Box>
        </>
    );
};

export default SideDock;

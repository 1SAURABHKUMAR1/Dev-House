import { Box, Image, Tooltip, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import { setSidebarComponent } from 'features';
import { sidebarProps } from 'Types';
import { useAppDispatch, useAppSelector } from 'store/hooks';

const SideDock = ({ buttonsArray }: sidebarProps) => {
    const dispatch = useAppDispatch();
    const { sidebarComponent } = useAppSelector((state) => state.codebox);

    const handleSidebarOpen = (
        buttonType: 'Chat' | 'Collaborate' | 'Files' | 'Users',
    ) => {
        if (sidebarComponent === buttonType)
            return dispatch(setSidebarComponent({ component: 'None' }));

        dispatch(setSidebarComponent({ component: buttonType }));
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
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            p="0.35rem"
                        >
                            <Image
                                src={`/images/${button.icon}.svg`}
                                key={button.type}
                            />
                        </Box>
                    </Tooltip>
                ))}
            </Box>
        </>
    );
};

export default SideDock;

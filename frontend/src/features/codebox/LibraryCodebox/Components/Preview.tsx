import { Flex, Icon, Text, Tooltip } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from 'store/hooks';

import { IconType } from 'react-icons/lib';
import { FiSkipBack } from 'react-icons/fi';
import { RiRefreshLine } from 'react-icons/ri';
import { SiPrettier } from 'react-icons/si';

import { Hook, Unhook } from 'console-feed';

import { previewScreenProps } from 'Types';
import { setConsoleLogs } from 'features/codebox/codeboxSlice';

const Preview = ({ formatCode, resetCode }: previewScreenProps) => {
    const dispatch = useAppDispatch();

    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    const refreshPanel = () => {
        iframeRef?.current?.contentWindow &&
            iframeRef.current.contentWindow.location.reload();
    };

    useEffect(() => {
        window.onmessage = (message: MessageEvent) => {
            if (message.data && message.data.source === 'iframe') {
                dispatch(
                    setConsoleLogs({
                        data: [`${message.data.message}`],
                        id: `${Date.now()}`,
                        method: 'command',
                    }),
                );
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Flex flex="1" flexDir="column" height="100%" width="100%">
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    color="hsl(210deg,10%,40%)"
                    borderBottom="2px solid hsl(210deg,14%,66%)"
                    padding="0.2rem 0.8rem"
                    overflowY="hidden"
                    overflowX="auto"
                >
                    <Text
                        textTransform="uppercase"
                        fontSize="1rem"
                        fontWeight="700"
                        lineHeight="25px"
                    >
                        RESULT
                    </Text>

                    <Flex alignItems="center" gap="1rem">
                        <PreviewIcon
                            height="1.2rem"
                            icon={RiRefreshLine}
                            tooltipLabel="Refresh"
                            key="refresh screen"
                            onClick={refreshPanel}
                        />

                        <PreviewIcon
                            height="1rem"
                            icon={SiPrettier}
                            tooltipLabel="Format"
                            key="format code"
                            onClick={formatCode}
                        />

                        <PreviewIcon
                            height="1.2rem"
                            icon={FiSkipBack}
                            tooltipLabel="Reset"
                            key="reset code"
                            onClick={resetCode}
                        />
                    </Flex>
                </Flex>

                <Flex
                    height="100%"
                    flex="1"
                    pos="relative"
                    borderRadius="0.2rem"
                    background="inherit"
                    width="100%"
                    maxWidth="100%"
                    h="100%"
                    margin="0"
                >
                    <iframe
                        className="iframe"
                        title="code-runner"
                        frameBorder="0"
                        loading="lazy"
                        ref={iframeRef}
                        // srcDoc={code} //FIXME:
                        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-downloads allow-pointer-lock"
                        onLoad={() => {
                            Hook(
                                iframeRef.current?.contentWindow &&
                                    // @ts-ignore
                                    iframeRef.current.contentWindow.console,
                                (log: any) => {
                                    dispatch(setConsoleLogs(log));
                                },
                                false,
                            );

                            // @ts-ignore
                            Unhook(iframeRef.current?.contentWindow.console);
                        }}
                    ></iframe>
                </Flex>
            </Flex>
        </>
    );
};

export default Preview;

const PreviewIcon = ({
    tooltipLabel,
    icon,
    height,
    onClick,
}: {
    tooltipLabel: 'Format' | 'Reset' | 'Refresh';
    icon: IconType;
    height: string;
    onClick: () => void;
}) => {
    return (
        <>
            <Tooltip label={tooltipLabel}>
                <button className="button" onClick={onClick}>
                    <Icon
                        as={icon}
                        height={height}
                        width={height}
                        _hover={{
                            transform: 'scale(1.2)',
                            opacity: '1',
                        }}
                        opacity="0.8"
                        transition="transform 200ms cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s, opacity 200ms ease-in-out 100ms"
                        animation="1s cubic-bezier(0.22, 0.29, 0.12, 2) 1s 1 normal backwards running icon"
                    />
                </button>
            </Tooltip>
        </>
    );
};

import { Box, Button, Textarea } from '@chakra-ui/react';

import { SingleChat } from 'Components';
import { useRef } from 'react';
import { BiSend } from 'react-icons/bi';

import { ACTIONS_SEND_CODE_CHAT } from 'Socket/actions';
import { socket } from 'Socket/socket';

import { useAppSelector } from 'store/hooks';

import { initialChatType } from 'Types';

const ChatSide = ({ chats }: { chats: initialChatType }) => {
    const { codebox_id } = useAppSelector((state) => state.codebox);
    const { username } = useAppSelector((state) => state.auth);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleNewChat: () => void = () => {
        socket.emit(ACTIONS_SEND_CODE_CHAT, {
            codeboxId: codebox_id,
            messageBody: textAreaRef.current?.value ?? '',
            username,
        });

        textAreaRef.current && (textAreaRef.current.value = '');
    };

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                gap="0.7rem"
                scrollBehavior="smooth"
                role="chat"
                px="0.5rem"
                paddingInlineStart="2"
                paddingInlineEnd="2"
                paddingTop="2"
                paddingBottom="2"
                flex="1"
                overflow="auto"
                flexDir="column"
            >
                {chats.length === 0 && (
                    <>
                        <Box
                            height="100%"
                            display="flex"
                            alignItems="center"
                            justifyContent={'center'}
                            textAlign="center"
                            fontWeight="700"
                        >
                            Start a conversation
                        </Box>
                    </>
                )}

                {chats.length > 0 &&
                    chats?.map((chat: any) => (
                        <>
                            <SingleChat
                                username={chat.username}
                                chatContent={chat.messageBody}
                                key={chat.messageId}
                            />
                        </>
                    ))}
            </Box>

            <Box
                gap="0.7rem"
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                padding="0.2rem"
                paddingBottom="4"
            >
                <Textarea
                    placeholder="Type here..."
                    borderColor="blackAlpha.900"
                    zIndex="1"
                    _hover={{}}
                    height="2rem"
                    resize="none"
                    minH="2.6rem"
                    maxH="2.6rem"
                    className="hide-scrollbar"
                    ref={textAreaRef}
                />
                <Button padding="1rem 0rem" onClick={handleNewChat}>
                    <BiSend fontSize="1.4rem" cursor="pointer" />
                </Button>
            </Box>
        </>
    );
};

export default ChatSide;

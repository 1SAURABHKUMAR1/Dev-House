import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input,
    Text,
} from '@chakra-ui/react';

import { useLayoutEffect, useRef } from 'react';
import { BiSend } from 'react-icons/bi';

import { SingleChat } from '../../../../Components';

import { ChatBoxProps } from '../../../../Types';

const ChatBox = ({ btnRef, isOpen, onClose }: ChatBoxProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        chatRef.current !== null &&
            (chatRef.current.scrollTop = chatRef.current.scrollHeight);
    });

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                initialFocusRef={inputRef}
                size="sm"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader
                        justifyContent="space-between"
                        alignItems="center"
                        display="flex"
                    >
                        <Text>Chat Box</Text>
                        <DrawerCloseButton position="unset" />
                    </DrawerHeader>

                    <DrawerBody
                        display="flex"
                        flexDirection="column"
                        gap="1.5rem"
                        scrollBehavior="smooth"
                        role="chat"
                        ref={chatRef}
                    >
                        <SingleChat
                            position="LEFT"
                            chatContent=" hey threr how are yoou guys ?  threr how are yoou guys ?  threr how are yoou guys ?  threr how are yoou guys ? i am fine how are you i am fine how are you i am fine how are youv v v i am fine how are youi am fine how are youi am fine how are youi am fine how are you how are you i am fine how are youv v v i am fine how are youi am fine how are youi am fine how are youi am fine how are youhow are you i am fine how are youv v v i am fine how are youi am fine how are youi am fine how are youi am fine how are youhow are you i am fine how are youv v v i am fine how are youi am fine how are youi am fine how are youi am fine how are youhow are you i am fine how are youv v v i am fine how are youi am fine how are youi am fine how are youi am fine how are youhow are you i am fine how are youv v v i am fine how are youi am fine how are youi am fine how are youi am fine how are youhow are you i am fine how are youv v v i am fine how are youi am fine how are youi am fine how are youi am fine how are youhow are you i am fine how are youv v v i am fine how are youi am fine how are youi am fine how are youi am fine how are you"
                            userAvatar="https://bit.ly/kent-c-dodds"
                        />

                        <SingleChat
                            position="RIGHT"
                            chatContent="i am fine how are you i am fine how are you i am fine how are you i am fine how are you i am fine how are you i am fine how are you  i am fine how are you i am fine how are you i am fine how are you i am fine how are you "
                            userAvatar="https://bit.ly/kent-c-dodds"
                        />
                    </DrawerBody>

                    <DrawerFooter gap="0.7rem">
                        <Input
                            placeholder="Type here..."
                            ref={inputRef}
                            borderColor="blackAlpha.900"
                            zIndex="1"
                            _hover={{}}
                        />
                        <BiSend fontSize="1.8rem" cursor="pointer" />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default ChatBox;

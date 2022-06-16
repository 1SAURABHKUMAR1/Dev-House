import { Avatar, Flex, Text } from '@chakra-ui/react';
import { SingleChatProps } from '../../Types';

const SingleChat = ({ chatContent, userAvatar, position }: SingleChatProps) => {
    return (
        <>
            <Flex
                alignItems="stretch"
                flexDirection={`${position === 'LEFT' ? 'row-reverse' : 'row'}`}
                justifyContent="flex-end"
                gap="0.5rem"
            >
                <Text fontSize="0.9rem">{chatContent}</Text>
                <Avatar
                    size="sm"
                    showBorder
                    name="user avatar"
                    borderColor="main.blue"
                    borderWidth="0.1rem"
                    overflow="hidden"
                    src={userAvatar}
                />
            </Flex>
        </>
    );
};

export default SingleChat;

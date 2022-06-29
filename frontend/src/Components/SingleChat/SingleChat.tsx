import { Flex, Text } from '@chakra-ui/react';
import { SingleChatProps } from '../../Types';

const SingleChat = ({ chatContent, username }: SingleChatProps) => {
    return (
        <>
            <Flex gap="0.3rem" flexDirection="column">
                <Text
                    className="tracking-overflow"
                    fontSize="0.97rem"
                    fontWeight="700"
                >
                    @{username}
                </Text>
                <Text>{chatContent}</Text>
            </Flex>
        </>
    );
};

export default SingleChat;

import { Avatar, Box, Text } from '@chakra-ui/react';

import { SingleRoomAvatarProps } from '../../Types';

const SingleRoomAvatar = ({ src, username }: SingleRoomAvatarProps) => {
    return (
        <>
            <Box width="max-content" textAlign="center">
                <Avatar
                    size="lg"
                    showBorder
                    name="user avatar"
                    borderColor="main.blue"
                    borderWidth="0.22rem"
                    overflow="hidden"
                    src={src}
                    mb="0.2rem"
                />
                <Text fontSize="0.85rem" fontWeight="600">
                    @{username}
                </Text>
            </Box>
        </>
    );
};

export default SingleRoomAvatar;

import { Avatar, Box, Text } from '@chakra-ui/react';
import { memo } from 'react';

import { SingleRoomAvatarProps } from '../../Types';

const SingleRoomAvatar = ({
    src,
    username,
    addAudioRef,
    userId,
}: SingleRoomAvatarProps) => {
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
                <audio
                    // @ts-ignore
                    ref={(refInstance) => addAudioRef(userId, refInstance)}
                    autoPlay
                    // controls={true}
                ></audio>
                <Text fontSize="0.85rem" fontWeight="600">
                    @{username}
                </Text>
            </Box>
        </>
    );
};

export default memo(SingleRoomAvatar);

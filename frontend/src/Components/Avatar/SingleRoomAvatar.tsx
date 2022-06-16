import { Avatar } from '@chakra-ui/react';

import { SingleRoomAvatarProps } from '../../Types';

const SingleRoomAvatar = ({ src }: SingleRoomAvatarProps) => {
    return (
        <>
            <Avatar
                size="lg"
                showBorder
                name="user avatar"
                borderColor="main.blue"
                borderWidth="0.22rem"
                overflow="hidden"
                src={src}
            />
        </>
    );
};

export default SingleRoomAvatar;

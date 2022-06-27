import { Grid } from '@chakra-ui/react';

import { SingleRoomAvatar } from '../../../../Components';

import { authSliceIntialState, singleRoomUsersProps } from '../../../../Types';

import { memo } from 'react';

const SingleRoomUsers = ({ users, addAudioRef }: singleRoomUsersProps) => {
    return (
        <>
            <Grid
                gridTemplateColumns="repeat(auto-fill, 4rem)"
                gap="1.3rem"
                columnGap="2.8rem"
                marginTop="2rem"
            >
                {users.map((user: authSliceIntialState) => (
                    <SingleRoomAvatar
                        src={user.photo}
                        username={user.username}
                        addAudioRef={addAudioRef}
                        userId={user.userId}
                        key={user.userId}
                    />
                ))}
            </Grid>
        </>
    );
};

export default memo(SingleRoomUsers);

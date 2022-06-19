import { Grid } from '@chakra-ui/react';

import { SingleRoomAvatar } from '../../../../Components';

import { useAppSelector } from '../../../../store/hooks';

import { userMiniType } from '../../../../Types';

const SingleRoomUsers = () => {
    const { speakers } = useAppSelector((state) => state.rooms);

    return (
        <>
            <Grid
                gridTemplateColumns="repeat(auto-fill, 4rem)"
                gap="1.3rem"
                columnGap="2.8rem"
                marginTop="2rem"
            >
                {speakers.map((speaker: userMiniType) => (
                    <SingleRoomAvatar
                        src={speaker.profile_photo?.secure_url}
                        username={speaker.username}
                        key={speaker.user_id}
                    />
                ))}
            </Grid>
        </>
    );
};

export default SingleRoomUsers;

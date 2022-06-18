import { Container, Grid } from '@chakra-ui/react';

import { useQuery } from 'react-query';
import { getAllRooms } from '../../../../Services';

import { MainLoader, SingleRoomCard } from '../../../../Components';

import { roomType } from '../../../../Types';
import { Link } from 'react-router-dom';

const AllRooms = () => {
    const { data, isLoading, isError } = useQuery(
        'rooms/getRooms',
        async () => await getAllRooms(),
    );

    if (isLoading) {
        return <MainLoader />;
    } else if (isError) {
        //
    }

    return (
        <>
            <Container paddingTop="3rem" maxW="container.xl">
                <Grid
                    templateColumns={{
                        ssm: 'repeat(1,1fr)',
                        mmd: 'repeat(2,1fr)',
                        lg: 'repeat(3,1fr)',
                        xl: 'repeat(4, 1fr)',
                    }}
                    gap="1.2rem"
                >
                    {data?.data.rooms?.map((room: roomType) => (
                        <Link to={`/room/${room.room_id}`} key={room.room_id}>
                            <SingleRoomCard
                                roomName={room.name}
                                speakers={room.speakers}
                                key={room.room_id}
                            />
                        </Link>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default AllRooms;

import { Container, Grid } from '@chakra-ui/react';
import { SingleRoomCard } from '../../../../Components';

const AllRooms = () => {
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
                    <SingleRoomCard />
                    <SingleRoomCard />
                    <SingleRoomCard />
                    <SingleRoomCard />
                    <SingleRoomCard />
                    <SingleRoomCard />
                    <SingleRoomCard />
                    <SingleRoomCard />
                    <SingleRoomCard />
                    <SingleRoomCard />
                    <SingleRoomCard />
                </Grid>
            </Container>
        </>
    );
};

export default AllRooms;

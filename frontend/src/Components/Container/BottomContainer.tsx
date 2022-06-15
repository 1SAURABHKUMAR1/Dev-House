import { Box } from '@chakra-ui/react';

const BottomContainer = () => {
    return (
        <>
            <Box
                height="5rem"
                width="100%"
                position="sticky"
                bottom="0"
                background="linear-gradient(180deg, rgba(18, 18, 18, 0) 0%, rgb(39 38 38 / 70%) 50%, #403d3d 100%)"
            ></Box>
        </>
    );
};

export default BottomContainer;

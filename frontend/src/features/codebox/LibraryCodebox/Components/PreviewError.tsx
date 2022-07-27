import { Box } from '@chakra-ui/react';
import { useAppSelector } from 'store/hooks';

const PreviewError = () => {
    const { outputInitError } = useAppSelector((state) => state.codebox);

    return (
        <>
            <Box
                px="5"
                pt="10"
                color="red.600"
                height="100%"
                width="100%"
                zIndex="50"
                fontSize="0.92rem"
                fontWeight="700"
                backgroundColor="rgba(0,0,0,0.04)"
                backdropFilter="blur(3px)"
            >
                <Box as="pre" className="pre-word">
                    {outputInitError}
                </Box>
            </Box>
        </>
    );
};

export default PreviewError;

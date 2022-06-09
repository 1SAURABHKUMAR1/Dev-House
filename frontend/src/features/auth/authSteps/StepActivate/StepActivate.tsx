import { Box, Spinner, Text } from '@chakra-ui/react';
import { AuthStepProps } from '../../../../Types';

const StepActivate = ({ onClick }: AuthStepProps) => {
    return (
        <>
            <Box
                width="90%"
                minHeight="20rem"
                bg={'main.bg.sec'}
                padding="2rem"
                borderRadius="0.8rem"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                position="relative"
                alignItems="center"
                margin="auto"
            >
                <Spinner
                    thickness="0.27rem"
                    speed="0.70s"
                    emptyColor="main.input-bg"
                    color="main.indigo"
                    size="xl"
                />
                <Text
                    textAlign="center"
                    fontWeight="700"
                    maxWidth="15rem"
                    marginTop="1.2rem"
                >
                    Activation in progress ...
                </Text>
            </Box>
        </>
    );
};

export default StepActivate;

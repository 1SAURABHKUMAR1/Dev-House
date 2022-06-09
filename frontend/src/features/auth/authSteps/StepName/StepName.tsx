import { Input, Text } from '@chakra-ui/react';
import { AuthButton, Card } from '../../../../Components';
import { AuthStepProps } from '../../../../Types';

const StepName = ({ onClick }: AuthStepProps) => {
    return (
        <>
            <Card
                icon="handshake"
                title="What's your full name?"
                key={'namecard'}
            >
                <Input
                    placeholder="Your fullname"
                    px="2rem"
                    maxWidth="19rem"
                    bg="main.input-bg"
                    color="main.text.white"
                    type="text"
                    required={true}
                    marginTop="1.4rem"
                />

                <Text
                    textAlign="center"
                    fontSize="0.95rem"
                    fontWeight="500"
                    maxWidth="15rem"
                    marginTop="1.3rem"
                >
                    People use their real names at devhouse {':)'}
                </Text>
                <AuthButton
                    buttonText="Next"
                    marginTop="1.3rem"
                    onClick={onClick}
                />
            </Card>
        </>
    );
};

export default StepName;

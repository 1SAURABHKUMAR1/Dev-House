import { Input, Text } from '@chakra-ui/react';
import { AuthButton, Card } from '../../../../Components';
import { AuthStepProps } from '../../../../Types';

const StepUsername = ({ onClick }: AuthStepProps) => {
    return (
        <>
            <Card icon="username" title="Pick a username" key={'namecard'}>
                <Input
                    placeholder="@"
                    px="2rem"
                    maxWidth="18rem"
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
                    marginTop={{ ssm: '1.7rem', sm: '1.3rem' }}
                >
                    Username can be used for login
                </Text>
                <AuthButton
                    onClick={onClick}
                    buttonText="Next"
                    marginTop="1.7rem"
                />
            </Card>
        </>
    );
};

export default StepUsername;

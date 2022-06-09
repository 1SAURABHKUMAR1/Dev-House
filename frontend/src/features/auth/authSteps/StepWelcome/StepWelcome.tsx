import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AuthButton, Card } from '../../../../Components';
import { AuthStepProps } from '../../../../Types';

const StepWelcome = ({ onClick }: AuthStepProps) => {
    return (
        <>
            <Card
                icon="waving-hand"
                title="Welcome to Devhouse!"
                key={'headercard'}
            >
                <Text
                    textAlign="center"
                    fontSize="0.95rem"
                    fontWeight="500"
                    maxWidth="21.5rem"
                    marginTop="1rem"
                >
                    Devhouse i nearly ready and some more features are adding
                    in. Enjoy {':)'}
                </Text>
                <AuthButton
                    buttonText="Get your username"
                    marginTop="1.7rem"
                    onClick={onClick}
                />
                <Link to="/login">
                    <Flex
                        fontSize="0.9rem"
                        fontWeight={500}
                        marginTop="0.94rem"
                        color={'main.blue'}
                        gap="0.4rem"
                        cursor="pointer"
                    >
                        <Text>Have an invite text?</Text>
                        <Text fontWeight="700">Sign in</Text>
                    </Flex>
                </Link>
            </Card>
        </>
    );
};

export default StepWelcome;

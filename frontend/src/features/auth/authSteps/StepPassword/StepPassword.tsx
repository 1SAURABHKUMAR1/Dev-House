import {
    Box,
    Input,
    InputGroup,
    InputRightElement,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { AuthButton, Card } from '../../../../Components';
import { AuthStepProps } from '../../../../Types';

const StepPassword = ({ onClick }: AuthStepProps) => {
    const [passwordShow, setPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
    const togglePassword = () => setPasswordShow(!passwordShow);
    const toggleConfirmPassword = () =>
        setConfirmPasswordShow(!confirmPasswordShow);

    return (
        <>
            <Card
                icon="password"
                title="Create new password"
                key={'phone number'}
            >
                <Box marginTop="1.6rem" width="20rem">
                    <Text
                        fontWeight="600"
                        fontSize="0.95rem"
                        marginBottom="0.2rem"
                    >
                        Password
                    </Text>
                    <InputGroup>
                        <Input
                            px="2rem"
                            type={passwordShow ? 'text' : 'password'}
                            placeholder="Enter password"
                            bg="main.input-bg"
                            color="main.text.white"
                            required={true}
                        />
                        <InputRightElement
                            width="3rem"
                            color="main.text.white"
                            onClick={togglePassword}
                        >
                            {passwordShow ? (
                                <BsEye cursor="pointer" fontSize="1.3rem" />
                            ) : (
                                <BsEyeSlash
                                    cursor="pointer"
                                    fontSize="1.3rem"
                                />
                            )}
                        </InputRightElement>
                    </InputGroup>
                </Box>
                <Box marginTop="1.6rem" width="20rem">
                    <Text
                        fontWeight="600"
                        fontSize="0.95rem"
                        marginBottom="0.2rem"
                    >
                        Confirm Password
                    </Text>
                    <InputGroup>
                        <Input
                            px="2rem"
                            type={confirmPasswordShow ? 'text' : 'password'}
                            placeholder="Enter password"
                            bg="main.input-bg"
                            color="main.text.white"
                            required={true}
                        />
                        <InputRightElement
                            width="3rem"
                            color="main.text.white"
                            onClick={toggleConfirmPassword}
                        >
                            {confirmPasswordShow ? (
                                <BsEye cursor="pointer" fontSize="1.3rem" />
                            ) : (
                                <BsEyeSlash
                                    cursor="pointer"
                                    fontSize="1.3rem"
                                />
                            )}
                        </InputRightElement>
                    </InputGroup>
                </Box>
                <AuthButton
                    buttonText="Next"
                    marginTop="1.7rem"
                    onClick={onClick}
                />
            </Card>
        </>
    );
};

export default StepPassword;

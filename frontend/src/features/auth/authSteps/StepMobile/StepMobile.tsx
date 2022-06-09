import { Flex, IconButton, Input, Text } from '@chakra-ui/react';
import { HiOutlineMail } from 'react-icons/hi';
import { MdPhoneAndroid } from 'react-icons/md';
import { AuthButton, Card } from '../../../../Components';
import { AuthStepProps } from '../../../../Types';

const StepMobile = ({ onClick }: AuthStepProps) => {
    return (
        <>
            <Card
                icon="telephone"
                // title="Enter your phone number"
                title="Enter your email id"
                key={'phone number'}
            >
                <Input
                    // placeholder="919090909090"
                    placeholder="devhouse@gmail.com"
                    maxWidth="15rem"
                    textAlign="center"
                    bg="main.input-bg"
                    color="main.text.white"
                    // type="number"
                    type="email"
                    required={true}
                    marginTop="1.6rem"
                    // TODO:  check for max length
                />
                <AuthButton
                    buttonText="Next"
                    marginTop="1.6rem"
                    onClick={onClick}
                />
                <Text
                    textAlign="center"
                    fontSize="0.75rem"
                    maxWidth="21rem"
                    marginTop="0.95rem"
                    color="main.text"
                >
                    By entering your number, you’re agreeing to our Terms of
                    Service and Privacy Policy. Thanks!
                </Text>
                <Flex
                    gap="1rem"
                    alignItems="center"
                    position="absolute"
                    right="0"
                    top="-3.2rem"
                >
                    <IconButton
                        variant="ghost"
                        bg="main.bg.sec"
                        colorScheme="main.text"
                        aria-label="phone"
                        fontSize="1.5rem"
                        icon={<MdPhoneAndroid />}
                    />
                    <IconButton
                        variant="ghost"
                        bg="main.bg.sec"
                        colorScheme="main.text"
                        aria-label="mail"
                        fontSize="1.5rem"
                        icon={<HiOutlineMail />}
                    />
                </Flex>
            </Card>
        </>
    );
};

export default StepMobile;

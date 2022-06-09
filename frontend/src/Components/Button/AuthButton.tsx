import { Button } from '@chakra-ui/react';
import { BsArrowRightShort } from 'react-icons/bs';
import { AuthButtonProps } from '../../Types';

const AuthButton = ({ buttonText, marginTop, onClick }: AuthButtonProps) => {
    return (
        <>
            <Button
                display="flex"
                fontSize="0.96rem"
                fontWeight={600}
                px="2rem"
                color="white"
                bg="main.blue"
                marginTop={marginTop}
                _active={{ bg: 'main.blue.hover' }}
                _hover={{ bg: 'main.blue.hover' }}
                alignItems="center"
                minWidth="11.8rem"
                iconSpacing="0.2rem"
                onClick={onClick}
                rightIcon={
                    <BsArrowRightShort fontSize="1rem" strokeWidth="0.9" />
                }
            >
                {buttonText}
            </Button>
        </>
    );
};

export default AuthButton;

import { Avatar, WrapItem, Text, Flex, Input } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { AuthButton, Card } from '../../../../Components';
import { AuthStepProps } from '../../../../Types';

const StepAvatar = ({ onClick }: AuthStepProps) => {
    const [image, setImage] = useState('images/defaultavatar.jpg');
    const avatarRef = useRef(null);

    const captureImage = (event: React.FormEvent<EventTarget>) => {
        const file = (event.target as HTMLFormElement).files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            // @ts-ignore
            setImage(reader.result);
        };
    };

    return (
        <>
            <Card icon="avatar" title="Okay, Saurabh k!" key={'avatarcard'}>
                <Text
                    marginTop="0.4rem"
                    fontSize={{ ssm: '0.95rem', sm: '0.86rem' }}
                    fontWeight={500}
                    color={'main.text'}
                    gap="0.4rem"
                >
                    How's this photo?
                </Text>

                <WrapItem marginTop="0.9rem">
                    <Avatar
                        size="xl"
                        showBorder
                        name="user avatar"
                        borderColor="main.blue"
                        borderWidth="0.22rem"
                        overflow="hidden"
                        src={image}
                    />
                </WrapItem>
                <Flex
                    fontSize={{ ssm: '0.92rem', sm: '0.9rem' }}
                    fontWeight={500}
                    marginTop="0.8rem"
                    color="main.blue"
                    gap="0.4rem"
                    cursor="pointer"
                    // @ts-ignore
                    onClick={() => avatarRef.current.click()}
                >
                    <Input
                        type="file"
                        accept="image/png ,image/jpg, image/jpeg, image/gif, image/webp , image/svg"
                        display="none"
                        ref={avatarRef}
                        onChange={captureImage}
                        required
                        aria-required
                    />
                    Choose a different photo
                </Flex>
                <AuthButton
                    buttonText="Next"
                    marginTop="1rem"
                    onClick={onClick}
                />
            </Card>
        </>
    );
};

export default StepAvatar;

import {
    Box,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Text,
    Tooltip,
} from '@chakra-ui/react';

import { AiOutlineWhatsApp, AiOutlineTwitter } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';
import { HiQrcode } from 'react-icons/hi';

import { useAppSelector } from '../../../../store/hooks';

import { CopyField, ShareButton } from '../../../../Components';

import { stepShareProps } from '../../../../Types';

const StepShare = ({ nextModal }: stepShareProps) => {
    const { roomId, roomPassword } = useAppSelector((state) => state.rooms);

    //    TODO: show qr code

    return (
        <ModalContent>
            <ModalHeader
                justifyContent="space-between"
                alignItems="center"
                display="flex"
            >
                <Text fontSize="1.1rem" fontWeight="700">
                    Room link and password
                </Text>
                <ModalCloseButton
                    position="unset"
                    onClick={() => {
                        nextModal(1);
                    }}
                />
            </ModalHeader>

            <ModalBody pb={4}>
                <CopyField
                    inputCopyValue={roomId}
                    labelText="Room Links"
                    marginTop="0rem"
                    fieldType="ROOM_URL"
                    key={'room link'}
                />

                {roomPassword && (
                    <CopyField
                        inputCopyValue={roomPassword}
                        labelText="Room Password"
                        marginTop="0.7rem"
                        fieldType="ROOM_PASSWORD"
                        key={'room password'}
                    />
                )}
            </ModalBody>

            <ModalFooter
                justifyContent="center"
                alignItems="center"
                display="flex"
                gap="1rem"
                borderColor="main.bg.sec"
                pt=".5rem"
            >
                {/* FIXME:  qr code */}
                <Tooltip label="Qr Code">
                    <Box
                        bg="rgb(99 179 237)"
                        textColor="white"
                        fontSize="1.5rem"
                        height="auto"
                        borderRadius="0.2rem"
                        _focus={{}}
                        _active={{}}
                        p="0.4rem"
                        _hover={{ opacity: '0.8' }}
                        cursor="pointer"
                    >
                        <HiQrcode />
                    </Box>
                </Tooltip>

                <ShareButton
                    ToolTipText="Share on whatsapp"
                    Icon={AiOutlineWhatsApp}
                    ButtonColor={'rgb(37, 211, 102)'}
                    roomId={roomId}
                    roomPassword={roomPassword}
                    key={'share on whatsapp'}
                    shareType={'WHATSAPP'}
                />

                <ShareButton
                    ToolTipText="Share on twitter"
                    Icon={AiOutlineTwitter}
                    ButtonColor={'rgb(85, 172, 238);'}
                    roomId={roomId}
                    roomPassword={roomPassword}
                    key={'share on twitter'}
                    shareType={'TWITTER'}
                />

                <ShareButton
                    ToolTipText="Share on telegram"
                    Icon={FaTelegramPlane}
                    ButtonColor={'rgb(85, 172, 238)'}
                    roomId={roomId}
                    roomPassword={roomPassword}
                    key={'share on telegram'}
                    shareType={'TELEGRAM'}
                />
            </ModalFooter>
        </ModalContent>
    );
};

export default StepShare;

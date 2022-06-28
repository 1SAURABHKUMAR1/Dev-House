import { Box, Container } from '@chakra-ui/react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { SingleRoomButton } from '../../../../Components';

import { ControlsProps } from '../../../../Types';

const Controls = ({ btnRef, onOpen, handleMuted, userId }: ControlsProps) => {
    const navigate = useNavigate();

    const handleBackButton = () => {
        navigate('/rooms');
    };

    return (
        <Container
            maxW={{ ssm: '100%', mmd: 'max-content' }}
            bg="main.text.white"
            borderRadius="0.4rem"
            position={{ ssm: 'fixed', mmd: 'absolute' }}
            bottom={{ ssm: '0rem', mmd: '2rem' }}
            left={{ mmd: '50%' }}
            transform={{ mmd: 'translate(-50%,0%)' }}
            right={{ ssm: '0rem', mmd: 'auto' }}
            padding={'0.4rem'}
        >
            <Box display="flex" justifyContent="space-evenly">
                <SingleRoomButton
                    buttonText="Mute"
                    tooltipLabel="Mute"
                    onClick={() => handleMuted(userId)}
                />

                <SingleRoomButton
                    buttonText="Leave quietly"
                    tooltipLabel="Leave"
                    onClick={handleBackButton}
                />

                <SingleRoomButton
                    buttonText="Chat"
                    tooltipLabel="Chat Box"
                    btnRef={btnRef}
                    onClick={onOpen}
                />
            </Box>
        </Container>
    );
};

export default memo(Controls);

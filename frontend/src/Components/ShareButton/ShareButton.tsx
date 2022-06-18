import { Box, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';

import createShareLink from '../../Utils/CreateShareLink';

import { shareButtonProps } from '../../Types';

const ShareButton = ({
    ToolTipText,
    Icon,
    ButtonColor,
    roomId,
    roomPassword,
    shareType,
}: shareButtonProps) => {
    const [shareLink] = useState(() =>
        createShareLink(roomId, roomPassword, shareType),
    );

    return (
        <>
            <Tooltip label={ToolTipText}>
                <a href={shareLink} target="_blank" rel="noreferrer">
                    <Box
                        bg={ButtonColor}
                        textColor="white"
                        fontSize="1.5rem"
                        height="auto"
                        borderRadius="0.2rem"
                        _focus={{}}
                        _active={{}}
                        padding="0.4rem"
                        _hover={{ opacity: '0.8' }}
                        cursor="pointer"
                    >
                        <Icon />
                    </Box>
                </a>
            </Tooltip>
        </>
    );
};

export default ShareButton;

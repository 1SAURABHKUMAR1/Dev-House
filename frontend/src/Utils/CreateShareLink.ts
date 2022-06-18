const createShareLink = (
    roomId: string,
    roomPassword: string,
    shareType: 'WHATSAPP' | 'TWITTER' | 'TELEGRAM',
): string => {
    if (shareType === 'TELEGRAM') {
        return `https://telegram.me/share/url?text=Join the conversation on ${
            process.env.REACT_APP_LOCAL_URL
        }/room/${roomId} ${
            roomPassword ? `where password is ${roomPassword}` : ''
        }&url=${process.env.REACT_APP_LOCAL_URL}/room/${roomId}`;
    } else if (shareType === 'TWITTER') {
        return `https://twitter.com/intent/tweet/?text=Join the conversation on ${
            process.env.REACT_APP_LOCAL_URL
        }/room/${roomId} ${
            roomPassword ? `where password is ${roomPassword}` : ''
        }`;
    }

    return `https://api.whatsapp.com/send?text=Join the conversation on ${
        process.env.REACT_APP_LOCAL_URL
    }/room/${roomId}  ${
        roomPassword ? `where password is ${roomPassword}` : ''
    }`;
};

export default createShareLink;

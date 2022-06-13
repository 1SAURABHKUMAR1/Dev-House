import Axios from './Axios';

const checkEmail = (email: string) => Axios.post('/verify/email', { email });

const checkMobile = (mobile: string) =>
    Axios.post('/verify/mobile', { mobile });

const authenticateUser = (
    email: string,
    mobile: string,
    password: string,
    userType: 'MOBILE' | 'EMAIL',
) =>
    Axios.post('/user/authenticate', {
        email,
        mobile,
        password,
        userType,
    });

const checkUsername = (username: string) =>
    Axios.post('/verify/username', { username });

const activateUser = (name: string, avatar: string, username: string) =>
    Axios.post('/user/activate', { name, avatar, username });

export {
    checkEmail,
    checkMobile,
    authenticateUser,
    checkUsername,
    activateUser,
};

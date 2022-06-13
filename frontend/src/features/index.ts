import Home from './home/Home';
import Login from './auth/login/Login';
import Authenticate from './auth/authenticate/Authenticate';
import Activate from './auth/activate/Activate';
import StepMobile from './auth/authSteps/StepMobileEmail/StepMobileEmail';
import StepPassword from './auth/authSteps/StepPassword/StepPassword';
import StepName from './auth/authSteps/StepName/StepName';
import StepUsername from './auth/authSteps/StepUsername/StepUsername';
import StepAvatar from './auth/authSteps/StepAvatar/StepAvatar';
import StepActivate from './auth/authSteps/StepActivate/StepActivate';
import StepWelcome from './auth/authSteps/StepWelcome/StepWelcome';
import StepLoginPassword from './auth/login/Components/StepPassword';

export * from './home/homeSlice';
export * from './auth/authSlice';
export * from './auth/activateSlice';

export {
    Home,
    Login,
    Authenticate,
    Activate,
    StepWelcome,
    StepMobile,
    StepPassword,
    StepAvatar,
    StepActivate,
    StepName,
    StepUsername,
    StepLoginPassword,
};

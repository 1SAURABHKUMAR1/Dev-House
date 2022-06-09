import Home from './home/Home';
import Login from './auth/login/Login';
import Signup from './auth/signup/Signup';
import StepMobile from './auth/authSteps/StepMobile/StepMobile';
import StepPassword from './auth/authSteps/StepPassword/StepPassword';
import StepName from './auth/authSteps/StepName/StepName';
import StepUsername from './auth/authSteps/StepUsername/StepUsername';
import StepAvatar from './auth/authSteps/StepAvatar/StepAvatar';
import StepActivate from './auth/authSteps/StepActivate/StepActivate';
import StepWelcome from './auth/authSteps/StepWelcome/StepWelcome';

export * from './home/homeSlice';
export * from './auth/authSlice';

export {
    Home,
    Login,
    Signup,
    StepWelcome,
    StepMobile,
    StepPassword,
    StepAvatar,
    StepActivate,
    StepName,
    StepUsername,
};

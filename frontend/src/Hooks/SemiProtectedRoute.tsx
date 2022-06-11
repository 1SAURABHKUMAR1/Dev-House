import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface PrivateProp {
    element: JSX.Element;
}

const SemiProtectedRoute = ({ element }: PrivateProp) => {
    const { login, activated } = useAppSelector((state) => state.auth);

    if (!login) {
        return <Navigate to="/" />;
    } else if (login && !activated) {
        return <>{element}</>;
    }

    return <Navigate to="/rooms" />;
};

export default SemiProtectedRoute;

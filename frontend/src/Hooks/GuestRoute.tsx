import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface PrivateProp {
    element: JSX.Element;
}

const GuestRoute = ({ element }: PrivateProp): JSX.Element => {
    const { login, activated } = useAppSelector((state) => state.auth);
    const location = useLocation();

    if (!login) {
        return <>{element}</>;
    } else if (login && !activated) {
        return <Navigate to="/activate" state={{ from: location }} />;
    }

    return <Navigate to="/rooms" />;
};

export default GuestRoute;

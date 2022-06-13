import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface PrivateProp {
    element: JSX.Element;
}

const PrivateRoute = ({ element }: PrivateProp): JSX.Element => {
    const { login, activated } = useAppSelector((state) => state.auth);

    const location = useLocation();

    if (!login) {
        return <Navigate to="/login" state={{ from: location }} />;
    } else if (login && !activated) {
        return <Navigate to="/activate" state={{ from: location }} />;
    }

    return <>{element}</>;
};

export default PrivateRoute;

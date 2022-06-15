import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface PrivateProp {
    element: JSX.Element;
}

const SemiProtectedRoute = ({ element }: PrivateProp): JSX.Element => {
    const { login, activated } = useAppSelector((state) => state.auth);

    const location = useLocation();
    const state = location.state;

    if (!login) {
        return <Navigate to="/login" state={{ from: location }} />;
    } else if (login && !activated) {
        return <>{element}</>;
    }

    // @ts-ignore
    return <Navigate to={state.location ?? '/rooms'} />;
};

export default SemiProtectedRoute;

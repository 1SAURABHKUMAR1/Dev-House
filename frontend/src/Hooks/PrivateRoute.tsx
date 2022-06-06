import React, { useState } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

interface PrivateProp {
    element: JSX.Element;
}

const PrivateRoute = ({ element }: PrivateProp): JSX.Element => {
    const [login] = useState(false);
    const location = useLocation();

    if (login) {
        return <>{element}</>;
    } else {
        return <Navigate to="/login" state={{ from: location }} />;
    }
};

export default PrivateRoute;

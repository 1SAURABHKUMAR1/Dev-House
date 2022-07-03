import './App.css';

import { Routes, Route } from 'react-router-dom';

import Header from './Layout/Header/Header';

import {
    Home,
    Login,
    Authenticate,
    Activate,
    Rooms,
    SingleRoom,
    Codebox,
} from './features';
import { MainLoader, PageNotFound } from './Components';

import GuestRoute from './Hooks/GuestRoute';
import PrivateRoute from './Hooks/PrivateRoute';
import SemiProtectedRoute from './Hooks/SemiPrivateRoute';

import SetAuthWithRefresh from './Hooks/SetAuthWithRefresh';

const App = () => {
    const [loading] = SetAuthWithRefresh();

    if (loading) {
        return <MainLoader />;
    }

    return (
        <div className="app">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/authenticate"
                    element={<GuestRoute element={<Authenticate />} />}
                />
                <Route
                    path="/activate"
                    element={<SemiProtectedRoute element={<Activate />} />}
                />

                <Route
                    path="/login"
                    element={<GuestRoute element={<Login />} />}
                />
                <Route
                    path="/meetp"
                    element={<PrivateRoute element={<Rooms />} />}
                />
                <Route
                    path="/room/:roomId"
                    element={<PrivateRoute element={<SingleRoom />} />}
                />
                <Route
                    path="/code-box"
                    element={<PrivateRoute element={<Codebox />} />}
                />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
};

export default App;

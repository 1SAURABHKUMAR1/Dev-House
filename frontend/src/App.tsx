import './App.css';

import { Routes, Route } from 'react-router-dom';

import Header from './Layout/Header/Header';

import { Home, Login, Authenticate, Activate } from './features/index';

import GuestRoute from './Hooks/GuestRoute';
import PrivateRoute from './Hooks/PrivateRoute';

import useSetAuthWithRefresh from './Hooks/useSetAuthWithRefresh';

const App = () => {
    useSetAuthWithRefresh();

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
                    element={<PrivateRoute element={<Activate />} />}
                />

                <Route
                    path="/login"
                    element={<GuestRoute element={<Login />} />}
                />
                <Route
                    path="/rooms"
                    element={<PrivateRoute element={<Home />} />}
                />
                {/* <Route path="*" element={<PageNotFound />} /> */}
            </Routes>
        </div>
    );
};

export default App;

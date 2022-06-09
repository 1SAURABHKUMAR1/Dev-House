import './App.css';

import { Routes, Route } from 'react-router-dom';

import Header from './Layout/Header/Header';

import { Home, Login, Signup } from './features/index';

// import PrivateRoute from './Hooks/PrivateRoute';
// import useSetAuthWithRefresh from './Hooks/useSetAuthWithRefresh' ;

const App = () => (
    <div className="app">
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
    </div>
);

export default App;

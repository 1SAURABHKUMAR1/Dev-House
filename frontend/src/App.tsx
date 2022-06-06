import { Routes, Route } from 'react-router-dom';

import Header from './Layout/Header/Header';
import Footer from './Layout/Footer/Footer';

// import {} from './features/index';

// import PrivateRoute from './Hooks/PrivateRoute';
// import useSetAuthWithRefresh from './Hooks/useSetAuthWithRefresh' ;

const App = () => (
    <div className="app">
        <>
            <Header />
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                {/* <Route path="*" element={<PageNotFound />} /> */}
            </Routes>
            <Footer />
        </>
    </div>
);

export default App;

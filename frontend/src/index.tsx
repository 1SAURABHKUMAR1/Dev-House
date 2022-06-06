import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

// import { Provider } from 'react-redux';
// import { store } from './store/store';

import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ChakraProvider } from '@chakra-ui/react';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
    <React.StrictMode>
        <ChakraProvider resetCSS={true}>
            {/* <Provider store={store}> */}
            <Toaster position="top-right" reverseOrder={false} />
            <Router>
                <App />
            </Router>
            {/* </Provider> */}
        </ChakraProvider>
    </React.StrictMode>,
);

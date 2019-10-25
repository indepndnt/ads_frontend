import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import storeFactory from './store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';
import {unregister} from './registerServiceWorker';

import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';
import Loading from './Loading';
const {store, persistor} = storeFactory();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// registerServiceWorker();
unregister();

import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore, createTransform} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import root from './reducers/root';

const TokenTransform = createTransform(
    (inboundState, key) => {
        let {expires_at} = inboundState;
        if (expires_at instanceof Date) {
            expires_at = expires_at.toISOString();
        }
        return {
            ...inboundState,
            expires_at,
        }
    },
    (outboundState, key) => {
        let {login_token, expires_at} = outboundState;
        if (typeof expires_at === "string") {
            expires_at = Date.parse(expires_at);
        }
        if (new Date() > expires_at) {
            login_token = null;
            expires_at = null;
        }
        return {
            ...outboundState,
            login_token,
            expires_at,
        };
    },
    {whitelist: ['user']}
);

const persistConfig = {key: 'root', storage, whitelist: ['user'], transforms: [TokenTransform]};
const persistedReducer = persistReducer(persistConfig, root);

export default () => {
    let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
    let persistor = persistStore(store);
    return {store, persistor};
};

import {combineReducers} from 'redux';
import session from './session';
import user from './user';

const root = combineReducers({
    session,
    user,
});

export default root;

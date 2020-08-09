import {combineReducers} from 'redux';
import session from './session';
import user from './user';
import label from './label';

const root = combineReducers({
    session,
    user,
    label,
});

export default root;

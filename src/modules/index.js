import {combineReducers} from 'redux';
import root from './root/reducers';

const reducers = combineReducers({
    root: root
});
export default reducers;

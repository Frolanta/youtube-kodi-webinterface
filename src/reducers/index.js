import { combineReducers } from 'redux';
import SearchReducer from 'reducers/SearchReducer';
import PlaylistReducer from 'reducers/PlaylistReducer';
import AppReducer from 'reducers/AppReducer';

const rootReducer = combineReducers({
    search: SearchReducer,
    playlist: PlaylistReducer,
    app: AppReducer
});

export default rootReducer;
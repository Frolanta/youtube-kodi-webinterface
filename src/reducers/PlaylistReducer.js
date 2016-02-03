/**
 * Created by Frolanta on 03/02/16.
 */
import { ON_ADD, ON_REMOVE, ON_PLAY, ON_PAUSE, ON_STOP, ON_CLEAR, ON_VOLUME_CHANGED, REFRESH_PLAYLIST, GET_VOLUME, IS_PLAYER_OPENED, IS_VIDEO_PLAYING, CHANGE_VOLUME, GET_PLAYING_ITEM } from 'actions/index';


export default function (state = null, action) {

    switch (action.type) {
        case '@@redux/INIT':
        return {
            items: [],
            opened: false,
            playing: false,
            volume: 0,
            playingItemPosition: null
        };
        case ON_ADD: //NOT USED
            return {
                ...state,
                items: state.items.concat(action.item)
            };
        case ON_REMOVE: //NOT USED USE REFRESH INSTEAD
            return {
                ...state,
                items: state.items.slice(0, action.position).concat(state.items.slice(action.position + 1))
            };
        case GET_PLAYING_ITEM:

            var items = state.items;

            var i = 0;
            items.forEach(function (item) {
                if (i < action.payload) {
                    item.status = 'played';
                } else if (i > action.payload) {
                    item.status = 'notplayed';
                } else {
                    item.status = 'playing';
                }
                i++
            });

            return {
                ...state,
                items: items,
                playingItemPosition: action.payload
            };
        case ON_PLAY:
            return {
                ...state,
                playing: true,
                opened: true
            };
        case ON_PAUSE:
            return {
                ...state,
                playing: false
            };
        case ON_STOP:
            return {
                ...state,
                player: false,
                opened: false,
                playingItemPosition: null
            };
        case ON_CLEAR:
            return {
                ...state,
                items: []
            };
        case ON_VOLUME_CHANGED:
            return {
                ...state,
                volume: action.volume
            };
        case REFRESH_PLAYLIST:
            var i = 0;
            action.payload.items.forEach(function (item) {
                if (i < state.playingItemPosition) {
                    item.status = 'played';
                } else if (i > state.playingItemPosition) {
                    item.status = 'notplayed';
                } else {
                    item.status = 'playing';
                }
                i++
            });

            return {
                ...state,
                items: action.payload.items
            };
        case  GET_VOLUME:
            return {
                ...state,
                volume: action.payload
            };
        case CHANGE_VOLUME:
            return {
                ...state,
                volume: action.volume
            };
        case IS_PLAYER_OPENED:
            return {
                ...state,
                opened: action.payload
            };
        case IS_VIDEO_PLAYING:
            return {
                ...state,
                playing: action.payload
            };
    }
    return state;
}
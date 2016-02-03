import YoutubeUtils from 'utils/YoutubeUtils';
import KodiUtils from 'utils/KodiUtils';


export const FETCH_VIDEOS = 'FETCH_VIDEOS';
export const START_SEARCH = 'START_SEARCH';
export const FETCH_NEXT_VIDEOS = 'FETCH_NEXT_VIDEOS';

export function fetchVideos(search) {

    const request = YoutubeUtils.fetchVideos(search);

    return {
        type: FETCH_VIDEOS,
        payload: request
    }
}

export function fetchNextVideos(search, token) {

    const request = YoutubeUtils.fetchVideos(search, token);

    return {
        type: FETCH_NEXT_VIDEOS,
        payload: request
    }
}

export function startSearch(search) {
    return {
        type: START_SEARCH,
        search: search
    }
}


export const ON_ADD = 'ON_ADD';
export const ON_REMOVE = 'ON_REMOVE';
export const ON_PLAY = 'ON_PLAY';
export const ON_PAUSE = 'ON_PAUSE';
export const ON_STOP = 'ON_STOP';
export const ON_CLEAR = 'ON_CLEAR';
export const ON_VOLUME_CHANGED = 'ON_VOLUME_CHANGED';

export const IS_PLAYER_OPENED = 'IS_PLAYER_OPENED';
export const IS_VIDEO_PLAYING = 'IS_VIDEO_PLAYING';
export const REFRESH_PLAYLIST = 'REFRESH_PLAYLIST';
export const GET_VOLUME = 'GET_VOLUME';
export const CHANGE_VOLUME = 'CHANGE_VOLUME';
export const GET_PLAYING_ITEM = 'GET_PLAYING_ITEM';

export function onAdd(item) {
    return {
        type: ON_ADD,
        item: item
    }
}

export function onRemove(position) {

    return {
        type: ON_REMOVE,
        position: position
    }
}

export function onPlay(position) {
    return {
        type: ON_PLAY
    }
}

export function onPause(position) {
    return {
        type: ON_PAUSE
    }
}

export function onStop(position) {
    return {
        type: ON_STOP
    }
}

export function onClear(position) {
    return {
        type: ON_CLEAR
    }
}

export function onVolumeChanged(volume) {
    return {
        type: ON_VOLUME_CHANGED,
        volume: volume
    }
}

export function isPlayerOpened() {

    const request = KodiUtils.isPlayerVideoOpen();

    return {
        type: IS_PLAYER_OPENED,
        payload: request
    }
}

export function isVideoPlaying() {

    const request = KodiUtils.isVideoPlaying();

    return {
        type: IS_VIDEO_PLAYING,
        payload: request
    }
}

export function refreshPlaylist() {
    const request = KodiUtils.getItems();

    return {
        type: REFRESH_PLAYLIST,
        payload: request
    }
}

export function getVolume() {
    const request = KodiUtils.getVolume();

    return {
        type: GET_VOLUME,
        payload: request
    }
}

export function changeVolume(volume) {
    return {
        type: CHANGE_VOLUME,
        volume: volume
    }
}

export function getPlayingItem() {
    const request = KodiUtils.getPlayerPosition();

    return {
        type: GET_PLAYING_ITEM,
        payload: request
    }
}

export const TOGGLE_SNACKBAR = 'TOGGLE_SNACKBAR';
export const TOGGLE_SWIPPING = 'TOGGLE_SWIPPING';

export function toggleSnackBar(open, message= '') {
    return {
        type: TOGGLE_SNACKBAR,
        open: open,
        message: message
    }
}

export function toggleSwipping(bool) {
    return {
        type: TOGGLE_SWIPPING,
        value: bool
    }
}

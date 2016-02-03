/**
 * Created by Frolanta on 03/02/16.
 */
import { FETCH_VIDEOS, FETCH_NEXT_VIDEOS, START_SEARCH } from 'actions/index';

export default function (state = null, action) {

    switch (action.type) {
        case '@@redux/INIT':
            return {
                items: [],
                nextPageToken: null,
                loading: false,
                search: null
            };
        case FETCH_VIDEOS:
            return {
                items: action.payload.items,
                nextPageToken: action.payload.nextPageToken ? action.payload.nextPageToken : null,
                loading: false
            };
        case FETCH_NEXT_VIDEOS:
            return {
                items: state.items.concat(action.payload.items),
                nextPageToken: action.payload.nextPageToken ? action.payload.nextPageToken : null,
                loading: false
            };
        case START_SEARCH:
            return {
                items: state.items,
                nextPageToken: null,
                loading: true,
                search: action.search
            }
    }
    return state;

}

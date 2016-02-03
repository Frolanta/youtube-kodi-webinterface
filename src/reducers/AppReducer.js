/**
 * Created by Frolanta on 03/02/16.
 */
/**
 * Created by Frolanta on 03/02/16.
 */
import { TOGGLE_SNACKBAR, TOGGLE_SWIPPING } from 'actions/index';

export default function (state = null, action) {

    switch (action.type) {
        case '@@redux/INIT':
            return {
                snackBarOpen: false,
                snackBarMessage: '',
                swipping: true
            };
        case TOGGLE_SNACKBAR:
            return {
                snackBarOpen: action.open,
                snackBarMessage: action.message
            };
        case  TOGGLE_SWIPPING:
            return {
                ...state,
                swipping: action.value
            };
    }
    return state;
}

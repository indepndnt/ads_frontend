import * as act from '../actions/types';

const label = (
    state = {
        isUploading: false,
        uploadError: null,
        disable: false,
    },
    action
) => {
    switch (action.type) {
        case act.UPLOAD_LABELS_REQUEST:
            state = {
                ...state,
                isUploading: true,
                uploadError: null,
            };
            break;
        case act.UPLOAD_LABELS_SUCCESS:
            state = {
                ...state,
                ...action.payload,
                isUploading: false,
            };
            break;
        case act.UPLOAD_LABELS_FAILURE:
            state = {
                ...state,
                isUploading: false,
                uploadError: action.payload,
            };
            break;
        default:
    }
    return state;
};

export default label;

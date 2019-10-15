import * as act from "../actions/types";

const session = (
    state = {},
    action
) => {
    switch (action.type) {
        case act.FIRST_ACTION:
            console.log(action.type);
            break;
        default:
    }
    return state;
};

export default session;
const EnumTessellation = {
    ACTION_1: "ACTION_1"
};

function action1(param1, param2) {
    return {
        type: EnumTessellation.ACTION_1,
        payload: {
            param1,
            param2
        }
    };
}

function reducer1(state = {}, action) {
    if(action.type === EnumTessellation.ACTION_1) {
        return {
            ACTION: "acted"
        };
    }

    return state;
}

export default {
    EnumTessellation,
    action1,
    reducer1
};
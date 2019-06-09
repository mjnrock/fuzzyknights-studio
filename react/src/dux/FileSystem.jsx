const EnumFileSystem = {
    LOAD_FILE: "LOAD_FILE"
};

function LoadFile(data) {
    return {
        type: EnumFileSystem.LOAD_FILE,
        data
    };
}

function Reducer(state = {}, action) {
    if(action.type === EnumFileSystem.LOAD_FILE) {
        return {
            ...state,
            FileBase64: action.data
        };
    }

    return state;
}

export default {
    EnumFileSystem,
    LoadFile,
    Reducer
};
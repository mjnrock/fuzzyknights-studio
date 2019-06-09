const EnumFileSystem = {
    LOAD_FILE: "LOAD_FILE",
    UPDATE_ATTRIBUTE: "UPDATE_ATTRIBUTE"
};

function LoadFile(data) {
    return {
        type: EnumFileSystem.LOAD_FILE,
        data
    };
}
function UpdateAttribute(attr, value) {
    return {
        type: EnumFileSystem.UPDATE_ATTRIBUTE,
        data: {
            key: attr,
            value: !isNaN(value) ? +value : value
        }
    };
}

function Reducer(state = {}, action) {
    if(action.type === EnumFileSystem.LOAD_FILE) {
        return {
            ...state,
            FileBase64: action.data
        };
    } else if(action.type === EnumFileSystem.UPDATE_ATTRIBUTE) {
        if(!state.Attributes) {
            state["Attributes"] = {};
        }

        state.Attributes[ action.data.key ] = action.data.value;

        return state;
    }

    return state;
}

export default {
    EnumFileSystem,

    LoadFile,
    UpdateAttribute,

    Reducer
};
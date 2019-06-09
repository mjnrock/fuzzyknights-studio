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
    if(Array.isArray(attr)) {
        return {
            type: EnumFileSystem.UPDATE_ATTRIBUTE,
            data: attr
        };
    }

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

        if(Array.isArray(action.data)) {
            action.data.forEach(e => {
                state.Attributes[ e[0] ] = e[1];
            });
        } else {
            state.Attributes[ action.data.key ] = action.data.value;
        }

        return state;
    }

    return {
        FileBase64: null,
        Attributes: {}
    };
}

export default {
    EnumFileSystem,

    LoadFile,
    UpdateAttribute,

    Reducer
};
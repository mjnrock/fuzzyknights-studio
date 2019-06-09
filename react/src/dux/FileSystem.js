const MODULE_ID = `XFS`;
const EnumFileSystem = {
    LOAD_FILE: `${ MODULE_ID }:LOAD_FILE`,
    UPDATE_ATTRIBUTE: `${ MODULE_ID }:UPDATE_ATTRIBUTE`
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
        state["base64"] = action.data;
    } else if(action.type === EnumFileSystem.UPDATE_ATTRIBUTE) {
        if(Array.isArray(action.data)) {
            action.data.forEach(e => {
                state[ e[0] ] = e[1];
            });
        } else {
            state[ action.data.key ] = action.data.value;
        }
    }

    return state;
}

export default {
    EnumFileSystem,

    LoadFile,
    UpdateAttribute,

    Reducer
};
const MODULE_ID = `XFS`;
const EnumFileSystem = {
    UPDATE_ATTRIBUTE: `${ MODULE_ID }:UPDATE_ATTRIBUTE`
};

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
    if(action.type === EnumFileSystem.UPDATE_ATTRIBUTE) {
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

    UpdateAttribute,

    Reducer
};
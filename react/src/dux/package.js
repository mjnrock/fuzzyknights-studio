import { combineReducers } from "redux";

import FileSystem from "./FileSystem";

export default {
    FileSystem,

    RootReducer: combineReducers({
        FileSystem: FileSystem.Reducer
    })
};
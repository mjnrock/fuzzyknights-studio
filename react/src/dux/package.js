import { combineReducers } from "redux";

import FileSystem from "./FileSystem";
import Tessellation from "./Tessellation";

export default {
    FileSystem,
    Tessellation,

    RootReducer: combineReducers({
        FileSystem: FileSystem.Reducer,
        Tessellation: Tessellation.Reducer
    })
};
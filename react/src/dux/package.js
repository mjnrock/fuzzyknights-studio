import { combineReducers } from "redux";

import Tessellation from "./Tessellation";

export default {
    Tessellation,

    RootReducer: combineReducers({
        Tessellation: Tessellation.reducer1
    })
};
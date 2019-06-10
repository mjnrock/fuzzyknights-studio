import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import Dux from "./dux/package";

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
    const store = createStore(
        Dux.RootReducer,
        applyMiddleware(epicMiddleware)
    );

    epicMiddleware.run(Dux.RootEpic);

    return store;
}
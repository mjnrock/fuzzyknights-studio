import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import Animus from "./lib/animus/package";
Animus.Managers.Init();

console.log(Animus);

// console.log(Animus.Managers.Manager._scope());
// console.log(Animus.Managers.StateManager.GetInstance());

Animus.Managers.EventManager.GetInstance().AddActions([
    [ "urlFetch", (type, data) => ({
        type,
        ...data
    }) ]
]);
Animus.Managers.EventManager.GetInstance().AddReducers([
    (message) => {
        console.info("reducer-1", message);

        return message;
    },
    (message) => {
        console.info("reducer-2", message);

        return message;
    }
]);
// Animus.Managers.EventManager.GetInstance().Dispatch("test-1", 1231648948656165);

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
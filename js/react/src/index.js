import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import Animus from "./lib/animus/package";
Animus.Managers.Init();

// console.log(Animus.Managers.Manager._scope());
// console.log(Animus.Managers.StateManager.GetInstance());

Animus.Managers.EventManager.GetInstance().AddActions([
    [ "test-1", (data) => ({
        data
    }) ]
]);
Animus.Managers.EventManager.GetInstance().AddReducers([
    [ "reducer-1", (message) => {
        console.info("reducer-1", message);
    } ],
    [ "reducer-2", (message) => {
        console.info("reducer-2", message);
    } ]
]);
Animus.Managers.EventManager.GetInstance().Dispatch("test-1", 1231648948656165);

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
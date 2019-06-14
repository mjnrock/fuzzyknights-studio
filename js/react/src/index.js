import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import Animus from "./lib/animus/package";
Animus.Managers.Init();

console.log(Animus.Managers.Manager._scope());
console.log(Animus.Managers.StateManager.GetInstance());

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
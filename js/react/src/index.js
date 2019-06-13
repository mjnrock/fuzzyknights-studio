import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import Animus from "./lib/animus/package";
Animus.Init();

console.log(Animus.Manager._scope());
console.log(Animus.StateManager.GetInstance());

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
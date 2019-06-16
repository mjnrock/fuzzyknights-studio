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
        data
    }) ]
]);
Animus.Managers.EventManager.GetInstance().AddReducers([
    (state = {}, message) => {
		if(message.type === "urlFetch") {
			console.info("reducer-1");

			return message.data;
		}
		
		return state;
    },
    [ "reducer_scope", (state = {}, message) => {
		if(message.type === "urlFetch2") {
			console.info("reducer-2");

			return message.data;
		}

		return message.data || state;
    } ]
]);
// Animus.Managers.EventManager.GetInstance().Dispatch("test-1", 1231648948656165);
Animus.Managers.EventManager.GetInstance().AsyncDispatch();

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
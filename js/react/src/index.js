import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import Animus from "./lib/animus/package";
Animus.Managers.Init();

console.log(Animus);

Animus.Managers.EventManager.GetInstance().AddEnums([
    [ "Tessellation", {
		UPDATE_ATTRIBUTE: "XXX_UPDATE_ATTRIBUTE"
	}]
]);
Animus.Managers.EventManager.GetInstance().AddActions([
    [ Animus.Managers.EventManager.GetInstance().GetEnumValue("Tessellation", "UPDATE_ATTRIBUTE"), (type, key, value) => ({
        type,
        data: {
			key,
			value
		}
    }) ]
]);
Animus.Managers.EventManager.GetInstance().AddReducers([
    [ "Tessellation", (state = {}, message, [ enums, actions ]) => {
		if(message.type === enums.Tessellation.UPDATE_ATTRIBUTE) {
			return {
				...state,
				[ message.data.key ]: `${ message.data.value }`
			};
		}

		return {
			"tile-height": 128,
			"tile-width": 128,
			"tile-offset-x": "0",	// React is stupid and treats 0 as empty -> Making a string resolves this
			"tile-offset-y": "0"
		};
    } ]
]);
// Animus.Managers.EventManager.GetInstance().Dispatch("test-1", 1231648948656165);
Animus.Managers.EventManager.GetInstance().AsyncDispatch();

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
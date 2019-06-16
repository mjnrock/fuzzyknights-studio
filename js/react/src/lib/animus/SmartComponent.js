import { Component } from "react";
import uuidv4 from "uuid/v4";

import Manager from "./managers/Manager";
import RegistryManager from "./managers/RegistryManager";
import Observable from "./Observable";

class SmartComponent extends Component {
    constructor(props) {
        super(props);

		this._uuid = uuidv4();
        this._observer$ = new Observable();
	}
	
	componentWillMount() {
		RegistryManager.GetInstance().Register(this);
	}
	componentWillUnmount() {
		RegistryManager.GetInstance().Unregister(this);
	}

    Manager(endpoint) {
		if(arguments.length === 1) {
			return Manager._scope().managers[ Manager._processEndpoint(endpoint) ];
		}

		return Manager._scope().managers;
    }

    State(state) {
        if(arguments.length === 0) {
            return this.Manager("state").GetState();
        } else if(arguments.length === 1) {
            return this.Manager("state").SetState(state);
        }
    }
    Action(key, value) {
        if(arguments.length === 0) {
            return this.Manager("events").GetActions();
        } else if(arguments.length === 1) {
            return this.Manager("events").GetAction(key);
        } else if(arguments.length === 2) {
            return this.Manager("events").SetAction(key, value);
        }
    }
    Reducer(key, value) {
        if(arguments.length === 0) {
            return this.Manager("events").GetReducers();
        } else if(arguments.length === 1) {
            return this.Manager("events").GetReducer(key);
        } else if(arguments.length === 2) {
            return this.Manager("events").SetReducer(key, value);
        }
    }
    Dispatch(action, ...args) {
        this.Manager("events").Dispatch(action, ...args);
    }
    AsyncDispatch(action, url) {
        this.Manager("events").AsyncDispatch(action, url);
    }
}

export default SmartComponent;
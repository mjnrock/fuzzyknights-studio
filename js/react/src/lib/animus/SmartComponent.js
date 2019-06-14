import { Component } from "react";
import Manager from "./managers/Manager";
import Observable from "./Observable";

class SmartComponent extends Component {
    constructor(props) {
        super(props);

        this._observer$ = new Observable();
    }

    Manager(endpoint) {
		return Manager._scope().managers[ Manager._processEndpoint(endpoint) ];
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
}

export default SmartComponent;
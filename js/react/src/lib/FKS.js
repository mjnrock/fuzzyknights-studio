import { Component } from "react";
import uuidv4 from "uuid/v4";
import { type } from "os";

window._fks = window._fks || Object.freeze({
    subscribers: {},
    state: {},
    localState: {}
});

export class WatcherComponent extends Component {
    constructor(props) {
        super(props);

        this._uuid = uuidv4();
        this.state = {};
    }

    componentWillMount() {
        subscribe(this);
    }
    componentWillUnmount() {
        unsubscribe(this);
    }

    next(state) {
        if(state !== void 0) {
            this.setState(state);
        } else {
            this.setState(this.getLocalState());
        }
    }

    setLocalState(state = {}, callback = null) {
        window._fks = Object.freeze({
            ...window._fks,
            localState: {
                ...window._fks.localState,
                [ this._uuid ]: state
            }
        });

        this.next(state);

        if(typeof callback === "function") {
            callback(state);
        }
    }
    addLocalState(state = {}, callback = null) {
        window._fks = Object.freeze({
            ...window._fks,
            localState: {
                ...window._fks.localState,
                [ this._uuid ]: {
                    ...window._fks.localState[ this._uuid ] || {},
                    ...state
                }
            }
        });

        this.next(state);

        if(typeof callback === "function") {
            callback(state);
        }
    }
    getLocalState(search) {
        if(search) {
            try {
                let state = window._fks.localState[ this._uuid ],
                    tiers = search.split(".");
    
                tiers.forEach(t => {
                    state = state[t];
                });
    
                return state;
            } catch (e) {}

            return null;
        }

        return window._fks.localState[ this._uuid ];
    }
}

export function subscribe(subscriber) {
    if(subscriber instanceof WatcherComponent) {
        window._fks.subscribers[ subscriber._uuid ] = subscriber;
    } else {
        throw new Error("@subsciber does not extend WatcherComponent");
    }
}

export function unsubscribe(unsubscriber) {
    if(unsubscriber instanceof WatcherComponent) {
        delete window._fks.subscribers[ unsubscriber._uuid ];
    } else {
        throw new Error("@unsubscriber does not extend WatcherComponent");
    }
}

export function setState(state = {}) {
    if(typeof state === "function") {
        window._fks = Object.freeze({
            ...window._fks,
            state: {
                ...window._fks.state,
                ...state(window._fks.state)
            }
        });
    } else {
        window._fks = Object.freeze({
            ...window._fks,
            state: {
                ...window._fks.state,
                ...state
            }
        });
    }

    Object.values(window._fks.subscribers).forEach(s => {
        s.next(window._fks.state);
    });
}

export function getState() {
    return window._fks.state;
}



// export function setState(state = {}, localState = true) {
//     if(localState) {

//     }

//     return state
// }

// export function getState(localState = true) {
//     if(localState) {

//     }

//     return getState(false);
// }

export default {
    subscribe,
    unsubscribe,
    getState,
    setState
}
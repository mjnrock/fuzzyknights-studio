import { Component } from "react";
import uuidv4 from "uuid/v4";
import WebSocketHelper from "./WebSocketHelper";

window._fks = window._fks || Object.freeze({
    ws: new WebSocketHelper(),
    subscribers: {},
    state: {},
    localState: {}
});
window._fks.ws.OnMessage = (e) => {    
    if(e.isTrusted) {
        try {
            let data = JSON.parse(e.data);
    
            if(data.recipient && window._fks.subscribers[ data.recipient ]) {
                window._fks.subscribers[ data.recipient ].addMessage(data);
                

                // if(!Array.isArray(window._fks.queue[ data.recipient ])) {
                //     window._fks.queue[ data.recipient ] = [];
                // }
        
                // window._fks.queue[ data.recipient ].push(data);
            }
        } catch (e) {
            console.warn("Invalid JSON response");
        }
    }

    return false;
}

export class WatcherComponent extends Component {
    constructor(props) {
        super(props);

        this._uuid = "Matt";//uuidv4();
        this.state = {
            _queue: []
        };

        this.send = (msg) => window._fks.ws.Send(msg);
    }

    componentWillMount() {
        subscribe(this);
    }
    componentWillUnmount() {
        unsubscribe(this);
    }

    async next(state) {
        if(state !== void 0) {
            this.setState(await state);
        } else {
            this.setState(await this.getLocalState());
        }
    }

    hasMessages() {
        return this.getLocalState()._queue.length > 0;
    }
    addMessage(msg) {
        let state = this.getLocalState();
        state._queue.push(msg);


        this.setLocalState(state);
    }
    //  TODO Do something with the message
    retrieveMessage() {
        let msg = this.getLocalState()._queue.shift();

        if(msg) {
            return msg;
        }
    }

    async setLocalState(state = {}, callback = null) {
        window._fks = Object.freeze({
            ...window._fks,
            localState: {
                ...window._fks.localState || {},
                [ this._uuid ]: await state
            }
        });

        this.next(await state);

        if(typeof callback === "function") {
            callback(await state);
        }
    }
    async addLocalState(state = {}, callback = null) {
        window._fks = Object.freeze({
            ...window._fks,
            localState: {
                ...window._fks.localState || {},
                [ this._uuid ]: {
                    ...window._fks.localState[ this._uuid ] || {},
                    ...await state
                }
            }
        });

        this.next(await state);

        if(typeof callback === "function") {
            callback(await state);
        }
    }
    getLocalState(search) {
        if(search) {
            let state = window._fks.localState[ this._uuid ] || {},
                tiers = search.split(".");

            tiers.forEach(t => {
                state = state[t];
            });

            return state;
        }

        return window._fks.localState[ this._uuid ] || {};
    }
}

export function subscribe(subscriber) {
    if(subscriber instanceof WatcherComponent) {
        window._fks.subscribers[ subscriber._uuid ] = subscriber;
        window._fks.localState[ subscriber._uuid ] = {
            _queue: []
        };
    } else {
        throw new Error("@subsciber does not extend WatcherComponent");
    }
}

export function unsubscribe(unsubscriber) {
    if(unsubscriber instanceof WatcherComponent) {
        delete window._fks.subscribers[ unsubscriber._uuid ];
        delete window._fks.localState[ unsubscriber._uuid ];
    } else {
        throw new Error("@unsubscriber does not extend WatcherComponent");
    }
}

export async function setState(state = {}) {
    window._fks = Object.freeze({
        ...window._fks,
        state: {
            ...await state
        }
    });

    Object.values(window._fks.subscribers).forEach(s => {
        s.next(window._fks.state);
    });
}

export function getState() {
    return window._fks.state;
}

export default {
    subscribe,
    unsubscribe,
    getState,
    setState
}
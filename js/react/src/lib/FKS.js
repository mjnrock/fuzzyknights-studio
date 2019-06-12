import { Component } from "react";
import uuidv4 from "uuid/v4";

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

    async next(state) {
        if(state !== void 0) {
            this.setState(await state);
        } else {
            this.setState(await this.getLocalState());
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
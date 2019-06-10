import { Component } from "react";

window._fks = window._fks || Object.freeze({
    subscribers: [],
    state: {}
});

export class WatcherComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _fks: {}
        };
    }

    componentWillMount() {
        subscribe(this);
    }
    componentWillUnmount() {
        //TODO Remove
    }

    next() {
        this.setState({
            ...this.state,
            _fks: getState()
        })
    }
}

export function subscribe(subscriber) {
    window._fks.subscribers.push(subscriber);
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

    window._fks.subscribers.forEach(s => {
        s.next(window._fks.state);
    });
}

export function getState() {
    return window._fks.state;
}

export default {
    getState,
    setState
}
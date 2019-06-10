import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { setState, WatcherComponent } from "./lib/FKS";

import Routes from "./routes/package";

class App extends WatcherComponent {
    constructor() {
        super();

        window._fks.state.cat = 15;

        setInterval(() => {
            setState(state => ({
                cat: state.cat + 5
            }));
        }, 250);
    }

    render() {
        return (        
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={() => "Sup guy?"} />
                    <Route path="/test" component={ Routes.SpriteUpload } />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { setState, WatcherComponent } from "./lib/FKS";

import Routes from "./routes/package";

class App extends WatcherComponent {
    render() {
        return (        
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={() => "Ciao ciao! ^_^"} />
                    <Route path="/test" component={ Routes.SpriteUpload } />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
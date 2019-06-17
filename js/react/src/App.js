import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Routes from "./routes/package";
import SmartComponent from "./lib/animus/SmartComponent";

class App extends SmartComponent {
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
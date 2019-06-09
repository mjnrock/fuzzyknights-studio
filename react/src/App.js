import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import FileSystem from "./FileSystem";

function App() {
    return (        
        <BrowserRouter>
            <div>
                <Route exact path="/" component={() => "Sup guy?"} />
                <Route path="/test" component={ FileSystem } />
            </div>
        </BrowserRouter>
    );
}

export default App;

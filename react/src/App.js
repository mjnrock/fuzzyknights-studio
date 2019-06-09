import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Test from "./Test";

function App() {
    return (        
        <BrowserRouter>
            <div>
                <Route exact path="/" component={() => "Sup guy?"} />
                <Route path="/test" component={ Test } />
            </div>
        </BrowserRouter>
    );
}

export default App;

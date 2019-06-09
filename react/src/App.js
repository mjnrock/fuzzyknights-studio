import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Routes from "./routes/package";

function App() {
    return (        
        <BrowserRouter>
            <div>
                <Route exact path="/" component={() => "Sup guy?"} />
                <Route path="/test" component={ Routes.SpriteUpload } />
            </div>
        </BrowserRouter>
    );
}

export default App;

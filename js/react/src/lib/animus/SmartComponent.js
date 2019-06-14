import { Component } from "react";
import Observable from "./Observable";

class SmartComponent extends Component {
    constructor(props) {
        super(props);

        this._observer$ = new Observable();
    }
}

export default SmartComponent;
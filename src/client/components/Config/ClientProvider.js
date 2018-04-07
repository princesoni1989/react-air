import React, {Component} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "store/";
import App from "components/App";

const store = configureStore(window.App)

export default class Client extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router >
                    <App />
                </Router>
            </Provider>
        )
    }
}


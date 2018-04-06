import React, {Component} from "react";
import {StaticRouter} from 'react-router-dom'
import {Provider} from "react-redux";
import App from "components/App";

export default class Server extends Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <StaticRouter {...this.props} >
                    <App />
                </StaticRouter>
            </Provider>
        )
    }
}


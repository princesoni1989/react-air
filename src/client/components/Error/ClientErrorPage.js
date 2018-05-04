import React, {Component} from 'react'
import PropTypes from 'prop-types'
import "./ErrorPage.scss"

export default class ClientErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {error: null, errorInfo: null};
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h1 className="h1">Something went wrong.</h1>
          <details style={{ whiteSpace: 'pre-wrap', color: "red" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

ClientErrorPage.propTypes = {
  children: PropTypes.any
}

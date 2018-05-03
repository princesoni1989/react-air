import React, {Component} from "react";
import PropTypes from "prop-types";

class ErrorPage extends Component {
  static propTypes = {
    error: PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    error: null,
  };

  render() {
    const {error} = this.props;
    if (__DEV__ && error) {
      return (
        <div>
          <h1>{error.name}</h1>
          <pre>{error.stack}</pre>
        </div>
      );
    }

    return (
      <div>
        <h1>Error</h1>
        <p>Sorry, a critical error occurred on this page.</p>
      </div>
    );
  }
}

export default ErrorPage;

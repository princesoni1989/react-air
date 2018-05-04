import React, {Component} from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import fetchUsers from "../../actions/users";
import AuthService from "../../services/authService"
import Auth from "../../decorator/Auth"

import "./style.scss";

@Auth()
class Users extends Component {
  static propTypes = {
    users: PropTypes.array,
    getUsers: PropTypes.func,
    history: PropTypes.any
  };

  static defaultProps = {
    users: [],
  }

  componentDidMount() {
   this.props.getUsers({'authorization': `Bearer ${AuthService.getToken()}`});
  }

  logOut = () => {
    AuthService.removeToken()
    this.props.history.push("/login")
  }

  render() {
    const {users} = this.props;
    const renderUsers = users.map((user) => (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
        </tr>
      )
    )
    return (
      <div>
        <nav>
          <ul>
            <li><a onClick={this.logOut}>Logout</a></li>
          </ul>
        </nav>
        <table className="users">
          <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
          </tr>
          </thead>
          <tbody>
          {renderUsers}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  users: state.users.userList
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: bindActionCreators(fetchUsers, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);


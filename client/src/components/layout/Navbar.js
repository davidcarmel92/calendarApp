import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {


  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {

    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to={`/dashboard`}>Home</Link>
        </li>
        <li className="nav-item">
          <a href="logout" onClick={this.onLogoutClick} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    )

    const guestLinks = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        Navbar

      </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);

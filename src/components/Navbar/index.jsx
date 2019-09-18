import React, { Component } from "react";
import {  Navbar } from "react-bulma-components";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class NavbarComp extends Component {
  state = {
    open: false,
    user: {}
  };

  staticpropTypes = {
    userSession: PropTypes.object.isRequired,
    history : PropTypes.object.isRequired
  };

  handleSignOut = () => {
    const { userSession } = this.props;
    console.log(userSession);
    userSession.signUserOut();
    window.location = "/";
  };
  toggleNavBar = () => {
    this.setState({ open: !this.state.open })
  }

  componentDidMount() {
    const { userSession } = this.props

    if (userSession.isUserSignedIn()) {
      const user = userSession.loadUserData()
      this.setState({ user })
    }
  }
  goToUsers = () => {
    const { history } = this.props
    const { user } = this.state
  console.log(history , user)
    return history.push(`/admin/${user.username}/posts`)
  }
  goToAdminPosts = () => {
    const { history } = this.props
    const { user } = this.state
  console.log(history , user)
    return history.push(`/admin/${user.username}/posts`)
  }
  goToAdminProfile = () => {
    const { history } = this.props
    const { user } = this.state
  console.log(history , user)
    return history.push(`/admin/${user.username}`)
  }


  render() {
    const { userSession } = this.props;
    const {open} = this.state;
    const isSignedIn = userSession.isUserSignedIn();
    return (
      <Navbar color="info" fixed="top" active={open}>
       
        <Navbar.Brand>
          <Navbar.Item>
            <p>Blockstack</p>
          </Navbar.Item>
          <Navbar.Burger onClick={this.toggleNavBar} />
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Container position="end">
          {
              isSignedIn &&
              <React.Fragment>
                <Navbar.Item onClick={this.goToUsers}>
                  Users
                </Navbar.Item>
                <Navbar.Item onClick={this.goToAdminPosts}>
                  Feedbacks
                </Navbar.Item>
                <Navbar.Item onClick={this.goToAdminProfile}>
                  My Profile
                </Navbar.Item>
                <Navbar.Item onClick={this.goToAdminProfile}>
                 Reports
                </Navbar.Item>
                <Navbar.Item onClick={this.handleSignOut}>
                  Sign Out
                </Navbar.Item>
              </React.Fragment>
            }
          </Navbar.Container>
        </Navbar.Menu>
      
      </Navbar>
    );
  }
}

export default withRouter(NavbarComp);

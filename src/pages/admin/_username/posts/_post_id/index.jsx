import React, { Component } from "react";
import PropTypes from "prop-types";
import { MyContext } from "../../../../../components/User/UserProvider";
import PostDetailView from "../../../../../components/Post/PostDetailView";
class AdminPostView extends Component {
 
static propTypes ={
    match : PropTypes.object.isRequired,
  //  userSession : PropTypes.object.isRequired
}
  render() {
    console.log(this.props)
    const { match } = this.props;
    console.log(match)
    const { userSession,username } = this.context.state.currentUser;

    return (
      <div className="admin-post-view">
        <PostDetailView match={match} userSession={userSession} username={username} />
      </div>
    );
  }
}

export default AdminPostView;
AdminPostView.contextType = MyContext;

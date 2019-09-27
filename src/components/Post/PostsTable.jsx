import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Button, Table } from "react-bulma-components";
import { withRouter } from "react-router-dom";
import { POST_FILENAME } from "../../utils/constants";
import Loader from "../Loader/index";

class PostsTable extends Component {
  state = {
    posts: [],
    users: [],
    loading: true
  };
  static propTypes = {
    deleteUser: PropTypes.func.isRequired,
    userSession: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    type: PropTypes.string
  };
  componentDidMount() {
    this.loadPosts();
    this.loadUsers();
  }
  loadUsers = async () => {
    const options = {
      decrypt: false
    };
    try {
      const { userSession } = this.props;
      const result = await userSession.getFile(`users.json`, options);
      if (!result) {
        throw new Error("Post file  doesnot exist");
      }

      return this.setState({ users: JSON.parse(result), loading: false });
    } catch (e) {
      console.log(e.message);
    }
  };
  loadPosts = async () => {
    const options = {
      decrypt: false
    };
    try {
      const { userSession } = this.props;
      const result = await userSession.getFile(POST_FILENAME, options);
      if (!result) {
        throw new Error("Post file  doesnot exist");
      }
      return this.setState({ posts: JSON.parse(result) });
    } catch (e) {
      console.log(e.message);
    }
  };
  viewAdminPost(post) {
    const { history, username } = this.props;

    return history.push(`/admin/${username}/feedbacks/${post.id}`);
  }
  editAdminPost(post) {
    const { history, username } = this.props;

    return history.push(`/admin/${username}/users/${post.id}/edit`);
  }
  deleteAdminPost(post) {
   
     this.props.deleteUser(post.id)
  }
  viewPost(post) {
    const { history, username } = this.props;

    return history.push(`/${username}/posts/${post.id}`);
  }
  feedbackAdminPost(user) {
    const { history, username } = this.props;

    return history.push(`/admin/${username}/users/${user.id}/giveFeedback`);
  }
  displayAdminOptions(user) {
    return (
      <React.Fragment>
        <Button
          className="mr-one"
          color="warning"
          onClick={() => this.editAdminPost(user)}
        >
          Edit
        </Button>
        <Button
          className="mr-one"
          color="info"
          onClick={() => this.viewAdminPost(user)}
        >
          View Feedback
        </Button>
        <Button
          className="mr-one"
          color="info"
          onClick={() => this.feedbackAdminPost(user)}
        >
          Give Feedback
        </Button>
        <Button color="danger" onClick={() => this.deleteAdminPost(user)}>
          Delete
        </Button>
      </React.Fragment>
    );
  }
  displayPublicOptions(post) {
    return (
      <React.Fragment>
        <Button
          className="mr-one"
          color="info"
          onClick={() => this.viewPost(post)}
        >
          View
        </Button>
      </React.Fragment>
    );
  }
  render() {
    
    
      const { users } = this.props;
      const { loading } = this.state;
    if (loading) {
      return <Loader />;
    }

    return (
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>BlockStackId</th>
            <th>Department</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {_.map(users, user => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.personname}</td>
                <td>{user.email}</td>
                <td>{user.blockstackId}</td>
                <td>{user.department}</td>
                <td>
                  {this.props.type == "public"
                    ? this.displayPublicOptions(user)
                    : this.displayAdminOptions(user)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
PostsTable.defaultProp = {
  type: "admin"
};
export default withRouter(PostsTable);

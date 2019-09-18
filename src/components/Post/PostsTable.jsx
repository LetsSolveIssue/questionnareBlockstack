import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Button, Table } from "react-bulma-components";
import { withRouter } from "react-router-dom";
import { POST_FILENAME } from "../../utils/constants";

class PostsTable extends Component {
  state = {
    posts: []
  };
  static propTypes = {
    deletePost : PropTypes.func.isRequired,
    userSession: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    history : PropTypes.object.isRequired
    //  posts : PropTypes.array.isRequired
  };
  componentDidMount() {
    console.log("componentmount");
    this.loadPosts();
  }

  loadPosts = async () => {
    const options = {
      decrypt: false
    };
    try {
      const { userSession } = this.props;
      const result =await userSession.getFile(POST_FILENAME, options);
      if (!result) {
        throw new Error("Post file  doesnot exist");
      }
      console.log(result);

      return this.setState({ posts: JSON.parse(result) });
    } catch (e) {
      console.log(e.message);
    }
  };
  viewAdminPost(post){
 const {history,username} =this.props;
 console.log(post)
  return history.push(`/admin/${username}/posts/${post.id}`)
  }
  editAdminPost(post){
    const {history,username} =this.props;
    console.log(post)
     return history.push(`/admin/${username}/posts/${post.id}/edit`)
     }
     deleteAdminPost(post){
       console.log(post)
       this.props.deletePost(post.id)
     }
  displayAdminOptions(post) {
    return (
      <React.Fragment>
        <Button
          className="mr-one"
          color="warning"
          onClick={() => this.editAdminPost(post)}
        >
          Edit
        </Button>
        <Button
          className="mr-one"
          color="info"
          onClick={() => this.viewAdminPost(post)}
        >
          View
        </Button>
        <Button
          color="danger"
          onClick={() => this.deleteAdminPost(post)}
        >
          Delete
        </Button>
      </React.Fragment>
    );
  }
  render() {
    const { posts } = this.state;

    console.log(posts);
    return (
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {_.map(posts, (post) => {
              console.log(post)
            return (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{this.displayAdminOptions(post)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default withRouter(PostsTable);

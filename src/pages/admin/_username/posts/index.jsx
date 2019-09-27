import React, { Component } from "react";
import { Card, Content } from "react-bulma-components";
import { withRouter } from "react-router-dom";
import { POST_FILENAME } from "../../../../utils/constants";
import { MyContext } from "../../../../components/User/UserProvider";
import PostsTable from "../../../../components/Post/PostsTable";
import _ from "lodash";

class AdminPosts extends Component {
    state ={
       
        users : []
    }

  componentDidMount() {
    this.loadUsers()
  }

  loadUsers = async () => {
    const { userSession } = this.context.state.currentUser
    const options = { decrypt: false }

    try {
      const result = await userSession.getFile(`users.json`, options)

      if (!result) {
        throw new Error('Posts File does not exist')
      }

      return this.setState({ users: JSON.parse(result) })
    } catch (e) {
      console.log(e.message)
    }
  }
  deleteUser = async (userId) => {
    const { userSession,username } = this.context.state.currentUser;
    const { users } = this.state;
    const options = { encrypt: false };

    const filteredUsers = _.filter(users, (user) => user.id !== userId);

    try {
      await userSession.putFile(
        `users.json`,
        JSON.stringify(filteredUsers),
        options
      );
      //await userSession.deleteFile(`post-${postId}.json`, options);
      this.setState({ users: filteredUsers });
    
    } catch (e) {
      console.log(e.message);
    }
  };
  render() {
    //   const { posts } =this.state;
    const { userSession, username } = this.context.state.currentUser;
    //  console.log(posts);
    const { users } = this.state;
    console.log(this.context.state);
    console.log(userSession, username);
    return (
      <Card>
        <Card.Content>
          <Content>
            <PostsTable
              users = { users }
              userSession={userSession}
              username={username}
              deleteUser={this.deleteUser}
            />
          </Content>
        </Card.Content>
      </Card>
    );
  }
}

export default withRouter(AdminPosts);
AdminPosts.contextType = MyContext;

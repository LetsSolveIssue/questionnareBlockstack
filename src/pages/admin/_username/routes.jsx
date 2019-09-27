import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route,withRouter } from "react-router-dom";
import  AdminusernamePostsRoutes  from "../_username/posts/routes";
import AdminUsername from "../_username/index";
import {MyContext} from "../../../components/User/UserProvider";
import AdminusernameQuestionsRoutes from "../_username/questions/routes";
import AdminFeedbacks from "../../admin/_username/posts/feedback/feedbacks/index";

class AdminUsernameRoute extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history:PropTypes.object.isRequired
  }

  componentDidMount(){
    const {username} = this.context.state.currentUser;
    const {match,history} = this.props;
    if(match.params.username!== username){
     return history.push(`/admin/${username}`)
    }
  }
  render() {
    const { username,history } = this.props.match.params;
    console.log(this.props)
   console.log(username)
    return (
      <Switch>
        <Route
          exact
          path={this.props.match.url}
          render={() => <AdminUsername username={username} />}
        />
           <Route
         path={`${this.props.match.url}/feedbacks/:post_id`}
          render={({match}) => <AdminFeedbacks match={match} />}
        />
        <Route 
        path={`${this.props.match.url}/users`}
        render={({match}) => <AdminusernamePostsRoutes match={match} />}
        />
        
         <Route 
        path={`${this.props.match.url}/questions`}
        render={({match}) => <AdminusernameQuestionsRoutes match={match} />}
        />
      </Switch>
    );
  }
}

export default withRouter(AdminUsernameRoute);
AdminUsernameRoute.contextType = MyContext

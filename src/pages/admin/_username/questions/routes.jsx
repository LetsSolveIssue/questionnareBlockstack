import React, { Component } from 'react';
import { Switch,Route } from 'react-router-dom';
import AdminQuestionCreate from '../questions/create/index';

class AdminusernameQuestionsRoutes extends Component {
    state = {  }
    render() { 
      console.log(this.props);
        return ( 
        <Switch>
            {/* <Route
              exact
              path={this.props.match.url}
              render={() => <div>Hello</div>}
            /> */}
            <Route
              path={`${this.props.match.url}/create`}
              render={() => <AdminQuestionCreate />}
            />
            
            {/* <Route
              exact
              path={`${this.props.match.url}/:post_id`}
              render={({ match }) => <AdminPostView match={match} />}
            />
            <Route
              path={`${this.props.match.url}/:post_id/edit`}
              render={({match}) =><AdminPostEdit match={match} />}
            /> */}
        </Switch> );
    }
}
 
export default AdminusernameQuestionsRoutes;
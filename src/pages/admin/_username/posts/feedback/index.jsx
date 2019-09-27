import React, { Component } from 'react';
import FeedbackForm from "../../../../../components/Feedback/index";
import PropTypes from 'prop-types';
import { MyContext } from "../../../../../components/User/UserProvider"
class AdminGiveFeedBack extends Component {
    state = {  }
    static propTypes = {
      match : PropTypes.object.isRequired
    }
    render() { 
        console.log(this.props)
        const { match } = this.props;
        const { username,userSession } =  this.context.state.currentUser;
        return (<div className="feedback-form-view">
            <FeedbackForm match={match} username={username} userSession={userSession}/>
        </div>);
    }
}
 
export default AdminGiveFeedBack;
AdminGiveFeedBack.contextType = MyContext;
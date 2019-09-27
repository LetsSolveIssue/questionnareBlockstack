import React, { Component } from 'react';
import { MyContext } from "../../../../../../components/User/UserProvider";
import FeedbackDetailView from "../../../../../../components/Feedback/FeedbacksDetailView/index";

class AdminFeedbacks extends Component {

    state = {  }
    render() { 
        const {match} = this.props;
        console.log(match);
        const {userSession,username} = this.context.state.currentUser;
        return (<FeedbackDetailView match={match}  userSession={userSession}/> );
    }
}
 
AdminFeedbacks.contextType = MyContext;
export default AdminFeedbacks;
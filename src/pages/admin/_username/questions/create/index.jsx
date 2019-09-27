import React, { Component } from 'react';
import QuestionForm from "../../../../../components/Question/QuestionForm";
import { MyContext } from "../../../../../components/User/UserProvider";

class AdminQuestionCreate extends Component {
    state = {  }

    render() { 

        const {userSession , username} = this.context.state.currentUser;
        return ( 
            <QuestionForm 
            username = {username}
            userSession={userSession}
            type="create"/>

         );
    }
}
AdminQuestionCreate.contextType = MyContext;
export default AdminQuestionCreate;
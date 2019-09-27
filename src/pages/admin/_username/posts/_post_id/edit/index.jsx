import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
import { MyContext } from "../../../../../../components/User/UserProvider"
import PostForm from '../../../../../../components/Post/PostForm';
import Loader from '../../../../../../components/Loader/index'
class AdminPostEdit extends Component {

    state = { 
        post : {},
        users : [],
        user : {},
        loading : true
     }
    static propTypes = {
        match : PropTypes.object.isRequired
    }

    componentDidMount = async () => {
     
        const { userSession } = this.context.state.currentUser;
        
       const { match } = this.props;
       const options ={
           decrypt : false
       }
       const  result = await userSession.getFile(`users.json`,options)
       if(result){
         this.setState({
            users : JSON.parse(result)
           
        })
        const {users} = this.state;
        _.map(users,(user,index) => {
            if(user.id === match.params.post_id){
                this.setState({
                    user : user,
                    loading : false
                })
            }
        })
       
       }
       
    }
    render() {
      
       const { loading , user} = this.state;
      
       const { userSession,username } = this.context.state.currentUser;
       if (loading) {
        return <Loader />
      }
        return (
         
           <PostForm 
                 userSession={userSession}
                 username = {username}
                 user={user}
                 type="edit"/> );
        }
}
 
export default AdminPostEdit;
AdminPostEdit.contextType = MyContext; 
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { MyContext } from "../../components/User/UserProvider";
import { POST_FILENAME } from "../../utils/constants";
import {lookupProfile} from "blockstack";
import Error from "../../components/error/index";
import PostsTable from "../../components/Post/PostsTable";

class UsernamePostsRoute extends Component {
    state = { 
        error : '',
        loading : true,
        users : []
     }

    static propTypes = {
        match : PropTypes.object.isRequired 
    }
loadPosts = async () => {
const { match }=this.props;
const username = match.params.username;
const { userSession } = this.context.state.currentUser;

//for fetching information of other user
const options = {
    username,
    decrypt : false
}

try{
    const users = await userSession.getFile(`users.json`,options)
    if(users){
        console.log(users)
        this.setState({
            users : JSON.parse(users),
            loading : false
        })
    }
}catch(e){
    this.setState({
        error : "user doesnot have any posts!!",
        loading : false
    })
}

}
    componentDidMount = async () => {
        const { match } =  this.props;
        const username = match.params.username;
        try{
            const profile = await lookupProfile(username);
            if(profile){
                this.loadPosts();
            }
        }catch(e){
            this.setState({
                error : e.message,
                loading : false
            })
        }
    }
    render() { 
        const { match } = this.props;
        if (!this.state.loading && this.state.error) {
            return <Error errorMessage={this.state.error} />
          }
        
        return ( 
            <Switch>
                <Route
                path={`/${match.params.username}/posts`}
                render = {()=><PostsTable 
                posts = {this.state.posts}
                username = {match.params.username}
                type = "public"/>}
                exact />
                <Route 
                path={`/${match.params.username}/posts/:post_id`}
                render = {()=><div>Post Detail View</div>}/>
                 {/* <Route 
                path={`/${match.params.username}/users/:post_id/giveFeedback`}
                render = {()=><div>Post Detail View</div>}/> */}

            </Switch>
         );
         
    }
}
 
export default UsernamePostsRoute;
UsernamePostsRoute.contextType = MyContext;
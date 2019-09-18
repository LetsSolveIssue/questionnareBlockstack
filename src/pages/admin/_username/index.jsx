import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Heading,Button,Card,Content,Columns } from "react-bulma-components";
import { withRouter } from "react-router-dom";


class AdminUsername extends Component {
    state = { 
        searchWord : ''
     }
    static propTypes = {
        username : PropTypes.string.isRequired
    }
navigateToCreatePost = () =>{
    const {history ,  username} = this.props;
    history.push(`/admin/${username}/posts/create`)
}
onChange = (event) => {
    console.log(event)
    
    this.setState({
        searchWord :  event.target.value
    })
}
onKeyPress = (event) => {
    const {searchWord} =this.state;
    const {history}=this.props;
    if(event.key == 'Enter'){
        return history.push(`/${searchWord}/posts`)
    }
}
    render() { 
        const {username} = this.props
        return ( <div className="admin-username">
            <Card>
                <Card.Content>
                    <Heading renderAs="h2">Hello {username}</Heading>
                    <Button
                    color="primary"
                    onClick={this.navigateToCreatePost}>
                       Create Post 
                    </Button>
                    <div className="mt-one">
                        <Columns>
                        <Columns.Column size={6}>
                            <div className="field">
                            <label className="label">Explore User's posts!</label>
                            <input type="text" className="input" placeholder="Type Here" onChange={this.onChange} onKeyPress={this.onKeyPress}/>
                            </div>
                        </Columns.Column>
                        </Columns>

                    </div>
                </Card.Content>
            </Card>
        </div> );
    }
}
 
export default withRouter(AdminUsername);
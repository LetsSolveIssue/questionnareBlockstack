import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Heading ,Content} from "react-bulma-components";
import { withRouter } from "react-router-dom";

class PostDetailView extends Component {
  state = {
      post : {}
  };
  static propTypes = {
    match: PropTypes.object.isRequired,
    userSession: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  componentDidMount  = async () => {
    const { match,userSession ,history, username  } = this.props;
    const options  = {
      decrypt: false,
      username
    };
    
  let result = await userSession.getFile(`post-${match.params.post_id}.json`,options);
  
      if(result){
        return this.setState({
             post : JSON.parse(result)
         })
     }
     return history.push(`/admin/${username}/posts`)
  }
  render() {
      const { post } = this.state;
      console.log(post)
    return (<Card>
        <Card.Content>
            <Heading renderAs="h1">{ post.title }</Heading>
            <Heading renderAs="h3">ID-{ post.id }</Heading>
            <p>{ post.description }</p>
        </Card.Content>
    </Card>);
  }
}

export default withRouter(PostDetailView);

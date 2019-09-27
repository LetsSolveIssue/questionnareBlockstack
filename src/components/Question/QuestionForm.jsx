import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import {
  Control,
  Field,
  Input,
  Label,
  Textarea,
  Select,
  Option
} from "react-bulma-components/lib/components/form";
import Loader from "../Loader/index";
import { Button, Card, Content,Table } from "react-bulma-components";
import { POST_FILENAME } from "utils/constants";
import generateUUID from "utils/generateUUID";

class QuestionForm extends Component {
  constructor(props) {
    super(props);
   
   
    this.state = {
      question : [],
     questions : [],
     loading : true
    };
  }

  static propTypes = {
    userSession: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    post: PropTypes.object,
    type: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.loadQuestions();
  }
  loadQuestions = async () => {
    const { userSession } = this.props;
    const options = { decrypt: false };

    const result = await userSession.getFile(`questions.json`, options);
    console.log(result);
    if (result) {
      return this.setState({ questions: JSON.parse(result),loading: false });
    }

    return null;
  };

  loadPosts = async () => {
    const { userSession } = this.props;
    const options = { decrypt: false };

    const result = await userSession.getFile(`users.json`, options);
    console.log(result);
    if (result) {
      return this.setState({ users: JSON.parse(result) });
    }

    return null;
  };
  editPost = async () => {
    const options = { encrypt: false };
    const { title, description, posts } = this.state;
    const { history, userSession, username, post } = this.props;

    // for posts.json
    const params = {
      id: post.id,
      title
    };
    console.log(params);
    //  await userSession.putFile(`random.json`, JSON.stringify(params), options)
    // for post-${post-id}.json
    // { id, title, description }
    const detailParams = {
      ...params,
      description
    };
    const editedPostForIndex = _.map(posts, p => {
      if (p.id === post.id) {
        return params;
      }
      return p;
    });

    try {
      await userSession.putFile(
        `posts.json`,
        JSON.stringify(editedPostForIndex),
        options
      );
      await userSession.putFile(
        `post-${post.id}.json`,
        JSON.stringify(detailParams),
        options
      );
      this.setState(
        {
          title: "",
          description: ""
        },
        history.push(`/admin/${username}/posts`)
      );
    } catch (e) {
      console.log(e.message);
    }
  };
  createQuestion = async () => {
    const options = { encrypt: false };
    const { question,questions } = this.state;
    const { history, userSession, username } = this.props;
    const id = generateUUID();

    // for posts.json
    const params = {
      id,
      question
    };
    
    try {
      if (questions.length > 0)
        await userSession.putFile(
          `questions.json`,
          JSON.stringify([...questions, params]),
          options
        );
      else
        await userSession.putFile(
          `questions.json`,
          JSON.stringify([questions, params]),
          options
        );
        this.setState({
          question: '',
          loading : false
         
        }, () =>  window.location.reload())
    } catch (e) {
      console.log(e);
    }
  };
  createPost = async () => {
    const options = { encrypt: false };
    const { personname, email, blockstackId, department, users } = this.state;
    const { history, userSession, username } = this.props;
    const id = generateUUID();

    // for posts.json
    const params = {
      id,
      personname,
      email,
      blockstackId,
      department
    };
    console.log(params);
    //  await userSession.putFile(`random.json`, JSON.stringify(params), options)
    // for post-${post-id}.json
    // { id, title, description }
    // const detailParams = {
    //   ...params,
    //   description
    // }
    // console.log(posts)
    try {
      if (users.length > 0)
        await userSession.putFile(
          `users.json`,
          JSON.stringify([...users, params]),
          options
        );
      else
        await userSession.putFile(
          `users.json`,
          JSON.stringify([users, params]),
          options
        );
    } catch (e) {
      console.log(e);
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

  onSubmit = e => {
    e.preventDefault();
    const { type } = this.props;
   
    return type === "edit" ? this.editPost() : this.createQuestion();
  };
  
  loadQuestionTable = (questions) => {
    return(
      _.map(questions, (question) => {
            
        return (
          <tr key={question.id}>
            <td>{question.id}</td>
            <td>{question.question}</td>
            <td>Finally Sahi Ja rahe h</td>
{/*                
            <td>{this.props.type == 'public'?this.displayPublicOptions(user):this.displayAdminOptions(user)}</td> */}
          </tr>
        );
      })
    )
  }
  render() {
    const {questions,loading}= this.state;
    return (
     
        <div id="parent">
        <Card>
        <Card.Content>
          <Content>
            <form onSubmit={this.onSubmit} className="question-form">
              <Field>
                <Label>Question</Label>
                <Control>
                  <Input
                    name="question"
                    onChange={this.onChange}
                    placeholder="Add your question"
                    value={this.state.question}
                  />
                </Control>
              </Field>
              <Field kind="group">
                <Control>
                  <Button>Cancel</Button>
                </Control>
                <Control>
                  <Button color="link" type="submit">
                    Submit
                  </Button>
                </Control>
              </Field>
            </form>
          
          </Content>
        </Card.Content>
      </Card>
     
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Question</th>
            <th>Options</th>
           
          </tr>
        </thead>
        <tbody>
          {loading == true ? <Loader /> : this.loadQuestionTable(questions)}
        
        </tbody>
      </Table>
        
        </div>
       
     
     
     
      
      
    
    );
  }
}

export default withRouter(QuestionForm);

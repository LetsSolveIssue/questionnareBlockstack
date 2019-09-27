import React, { Component } from "react";
import _ from "lodash";
import {
  Control,
  Field,
  Input,
  Label,
  Textarea,
  Select,
  Option
} from "react-bulma-components/lib/components/form";
import { withRouter } from "react-router-dom";
import Loader from "../Loader/index";
import generateUUID from "../../utils/generateUUID";
import { Button, Card, Content } from "react-bulma-components";
class FeedbackForm extends Component {
  state = {
    questions: [],
    feedbacks: [],
    
    submittedAnswer: "",
   
    loading: true
  };

  componentDidMount = async () => {
    console.log(this.props)
    this.loadQuestions();
    this.loadFeedbacks();
   
  };

  loadFeedbacks = async () => {
    const { userSession,match,username } = this.props;
    const options = {
      decrypt: false
    };
  try{
      let result = await userSession.getFile(
        `feedback-${match.params.post_id}.json`,
        options
      );
      if(result){
        this.setState({
          feedbacks: JSON.parse(result)
        });
      }
     
    }catch(e){
      console.log(e.message)
    }
   
  }
  loadQuestions = async () => {
    const { userSession } = this.props;
    const options = {
      decrypt: false
    };
    try {
      const result = await userSession.getFile(`questions.json`, options);
      if (result) {
        this.setState({
          questions: JSON.parse(result)
        });
        const { questions } = this.state;
        var questionFeedback = questions;
        _.forEach(questionFeedback, (question, index) => {
          question.submittedAnswer = "";
        });
        this.setState({
          questions: questionFeedback,
          loading: false
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  onChange = (question, e) => {
    
    question.question[e.target.name] = e.target.value;
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  addFeedback = async () => {
    const { userSession, match, username } = this.props;
    const options = {
      encrypt: false
    };
    const id = generateUUID();
   console.log(this.props)
   const { history } = this.props;
    const { questions, feedbacks } = this.state;
    const  userId  = match.params.post_id;
    const  timestamp  = new Date().getTime();
    console.log(userId)
    console.log(timestamp)
    const params = {
      id,
      userId,
      timestamp,
      username,
      ...questions
    };
    try {
      if(feedbacks.length>0){
        console.log("going into this")
        let result = await userSession.putFile(
          `feedback-${match.params.post_id}.json`,
          JSON.stringify([...feedbacks,params]),
          options
        );
       
      }else{
        console.log("going out")
        let result = await userSession.putFile(
          `feedback-${match.params.post_id}.json`,
          JSON.stringify([feedbacks,params]),
          options
        );
       
      }
      this.setState({
       submittedAnswer : ''
      }, history.push(`/admin/${username}/users`))
     } catch (e) {
      console.log(e.message);
    }
  };
  onSubmit = e => {
    e.preventDefault();
    // const { type } = this.props;
    this.addFeedback();
    //  return type === 'edit' ? this.editPost() : this.createPost()
  };
  render() {
    const { questions, loading } = this.state;

    if (loading) {
      return <Loader />;
    }

    return (
      <form onSubmit={this.onSubmit} className="feedback-form">
        <Field>
          {_.map(questions, (question, index) => {
            if (question.id) {
              return (
                <div key={question.id}>
                  <Label>
                    Question-{index}:{question.question}
                  </Label>
                  <Input
                    name="submittedAnswer"
                    onChange={e => this.onChange({ question }, e)}
                    placeholder="Review your answer between 1-10"
                    value={question.submittedAnswer}
                  />
                </div>
              );
            }
          })}
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
    );
  }
}

export default withRouter(FeedbackForm);

import React, { Component } from "react";
import { Card, Heading, Content, Label ,Button, Table} from "react-bulma-components";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import Moment from 'react-moment';


class FeedbackdetailView extends Component {
  state = {
    feedbacks: [],
    questions : [],
  };
  componentDidMount = async () => {
    this.loadQuestions();
    this.loadFeedbacks();
  };
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
        
      }
    } catch (e) {
      console.log(e.message);
    }
  }
  loadFeedbacks = async () => {
    const { userSession, match, username } = this.props;
    const options = {
      decrypt: false
    };
    try {
      let result = await userSession.getFile(
        `feedback-${match.params.post_id}.json`,
        options
      );
      console.log(JSON.parse(result));
      this.setState({
        feedbacks: JSON.parse(result)
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  render() {
    const { feedbacks,questions } = this.state;

    console.log(feedbacks.timestamp)
    return (
      
      <div>
      <Card>
                  <Card.Content>
        <Table>
          <thead>
            <tr>
              <th>Timestamp</th>
             {_.map(questions,(question,index) => { 
               if(question.id){
                 return(
                   <th>{question.question}</th>
                 )
               }
             })}
            </tr>
          </thead>
          <tbody>
            {_.map(feedbacks,(feedback,index) => {
              console.log(feedbacks.id)
              if(feedback.id){

                return(
                  <tr>
                    <td>
                    <Moment format="YYYY/MM/DD">{feedback.timestamp ? feedback.timestamp : "NA"}</Moment>
                  </td>
                    {_.map(feedback,(feed,index) => {
                      if(feed.id){
                        return(
                          <td>{feed.submittedAnswer ? feed.submittedAnswer : "0"}</td>
                        )
                      }
                      
                      
                    })}
                  </tr>
                )
              }
            })
            }
           
          </tbody>
        </Table>
        </Card.Content>
        </Card>
                 
      </div>
     
    );
  }
}

export default withRouter(FeedbackdetailView);

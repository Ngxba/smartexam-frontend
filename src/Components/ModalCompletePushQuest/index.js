import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Alert,
//   Spinner
} from "reactstrap";
import QuestItem from "../QuestItem"

class ModalComplePushQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      quizData : [],
      essayData: [],
    };
  }


  onToggle = () => {
    this.props.onToggle();
  };

  componentDidMount() {
    this.setState({
        quizData : this.props.quizData,
        essayData : this.props.essayData
    })
  }

  render() {
    return (
      <Modal isOpen={this.props.visible} toggle={this.onToggle} style={{minWidth : "70vh"}}>
        <ModalHeader>ALL QUEST JUST INPUT</ModalHeader>
        <ModalBody>
        {this.state.quizData[0] === undefined && <p>You haven't push any quiz question yet</p> }
        {this.state.quizData.map((post, index) => {
              return (
                <QuestItem
                  key={post.QuizQuestionContent}
                  data={post}
                  numberOfQuizQuest={index + 1}
                ></QuestItem>
              );
            })}
            <br/>
            <hr/>
            <br/>
            {this.state.essayData[0] === undefined && <p>You haven't push any essay question yet</p> }
            {this.state.essayData.map((post, index) => {
              return (
                <QuestItem
                  key={post.essayQuestionContent}
                  data={post}
                  numberOfEssayQuest={index + 1}
                ></QuestItem>
              );
            })}   
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={this.state.loading}
            color="primary"
            onClick={this.onToggle}
            style={{margin : "0 2em"}}
          >
            OK
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalComplePushQuestion;

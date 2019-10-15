import React, { Component } from "react";
import { getQuiz } from "../../Action/getQuest";
import QuestItem from "../QuestItem";
import ModalAskTeacher from "./modalAskTeacher";
import { Container, Alert } from "reactstrap";
import { createTest } from "../../Action/class";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

class MakeTest extends Component {
  state = {
    listQuest: [],
    ModalAskTeacherVisible: true,
    listOfQuizQuestChoose: [],
    listOfEssayQuestChoose: [],
    listOfQuizQuest: [],
    listOfEssayQuest: [],
    testCode : "",
    classCode : ""
  };


  fetchQuestPool = async () => {
    const query = queryString.parse(this.props.location.search).q; //class code
    console.log(query)
    try {
      const response = await getQuiz();
      this.setState({
        listQuest: response
      });
    } catch (err) {
      console.log(err.message);
    }
    var listOfQuizQuest = this.state.listQuest.filter(function(quest) {
      return quest.model === "quiz";
    });
    var listOfEssayQuest = this.state.listQuest.filter(function(quest) {
      return quest.model === "essay";
    });
    this.setState({
      listOfQuizQuest: listOfQuizQuest,
      listOfEssayQuest: listOfEssayQuest,
      classCode : query
    });
  };

  onToggle = () => {
    this.setState({
      ModalAskTeacherVisible: !this.state.ModalAskTeacherVisible
    });
    this.props.history.push(`/class/get?q=${this.state.classCode}`);
  };
  onSubmit = async data => {
    
    let chooseQuizArr = [];
    let chooseQuizQuestion = [];
    while (chooseQuizArr.length < data.numberOfQuizQuest) {
      let random = Math.floor(
        Math.random() * this.state.listOfQuizQuest.length
      );
      if (!(chooseQuizArr.indexOf(random) >= 0)) {
        chooseQuizArr.push(random);
      }
    }
    chooseQuizArr.map(index => {
      return (chooseQuizQuestion = [
        ...chooseQuizQuestion,
        this.state.listOfQuizQuest[index]
      ]);
    });

    let chooseEssayArr = [];
    let chooseEssayQuestion = [];
    while (chooseEssayArr.length < data.numberOfEssayQuest) {
      let random = Math.floor(
        Math.random() * this.state.listOfEssayQuest.length
      );
      if (!(chooseEssayArr.indexOf(random) >= 0)) {
        chooseEssayArr.push(random);
      }
    }
    chooseEssayArr.map(index => {
      return (chooseEssayQuestion = [
        ...chooseEssayQuestion,
        this.state.listOfEssayQuest[index]
      ]);
    });
    this.setState({
      listOfQuizQuestChoose: chooseQuizQuestion,
      listOfEssayQuestChoose: chooseEssayQuestion,
      testCode: data.testCode,
    });
    await createTest(
      this.state.classCode,
      data.title,
      data.description,
      chooseQuizQuestion,
      chooseEssayQuestion,
      this.props.authedUser
    );
  };


  componentDidMount = () => {
    this.fetchQuestPool();
  };
  render() {
    let numberOfQuizQuest = 0;
    let numberOfEssayQuest = 0;
    return (
      <div>
        <Container>
        <h2>CLASS CODE : "{this.state.classCode}"</h2>
          {this.state.testCode && (
            <Alert color="success">
              Create quest pool success, your code : "{this.state.testCode}"
            </Alert>
          )}
          <ModalAskTeacher
            visible={this.state.ModalAskTeacherVisible}
            onToggle={this.onToggle}
            onSubmit={this.onSubmit}
            numberOfQuizQuest={this.state.listOfQuizQuest.length}
            numberOfEssayQuest={this.state.listOfEssayQuest.length}
          ></ModalAskTeacher>
          {this.state.listOfQuizQuestChoose.map((item, index) => {
            numberOfQuizQuest += 1;
            return (
              <QuestItem
                key={item._id}
                data={item}
                numberOfQuizQuest={numberOfQuizQuest}
              ></QuestItem>
            );
          })}
          <hr />
          {this.state.listOfEssayQuestChoose.map((item, index) => {
            numberOfEssayQuest += 1;
            return (
              <QuestItem
                key={item._id}
                data={item}
                numberOfEssayQuest={numberOfEssayQuest}
              ></QuestItem>
            );
          })}
        </Container>
      </div>
    );
  }
}

export default withRouter(MakeTest);
import React, { Component } from "react";
import { CardBody, CardSubtitle, CardTitle, CardText, Input } from "reactstrap"

class ExamItem extends Component {
  state = {
    quest: this.props.data
  }

  onChange = object => {
    this.setState(Object.assign(this.state.quest, object))
  }

  render() {
    return (
      <div>
        {this.props.data.model === "quiz" && (
          <Quiz
            data={this.props.data}
            numberOfQuest={this.props.numberOfQuizQuest}
            onChange={this.onChange}
          ></Quiz>
        )}
        {this.props.data.model === "essay" && (
          <Essay
            data={this.props.data}
            numberOfQuest={this.props.numberOfEssayQuest}
            onChange={this.onChange}
          ></Essay>
        )}
      </div>
    );
  }
}



function Quiz(props) {
  const { numberOfQuest, data, onChange } = props;
  return (
    <div>
      <CardBody style={{minHeight: "45vh"}}>
        <CardTitle>
          <h5 style={{ display: "inline-block" }}>
            Quiz question number: {numberOfQuest}
          </h5>
          {" "}
        </CardTitle>
        <hr />
        <CardSubtitle>
          <h6>
            <em>Read the question and choose the right answer</em>
          </h6>
          <p>{data.QuizQuestionContent}</p>
        </CardSubtitle>
        <hr />
        <CardText>Answers: </CardText>
        {data.Answers.map(answer => {
          return (
            <div key={answer._id}>
              <input
                type="radio"
                name={data._id}
                onChange={() => onChange({ userAnswer: answer.value })}
                value={answer.value}
                checked={data.userAnswer === answer.value}
              />
              {" "}{answer.value}
            </div>
          );
        })}
      </CardBody>
    </div>
  );
}

function Essay(props) {
  const { numberOfQuest, data, onChange } = props;
  return (
    <div>
      <CardBody style={{minHeight: "45vh"}}>
        <CardTitle>
          <h5 style={{ display: "inline-block" }}>
            Essay questions: {numberOfQuest}
          </h5>
          {" "}
        </CardTitle>
        <hr />
        <CardSubtitle>
          <h6>
            <em>Read the question and write down the answer</em>
          </h6>
          <p>{data.essayQuestionContent}</p>
        </CardSubtitle>
        <hr />
        <CardText>Answers : </CardText>
        <Input
          type="textarea"
          name="text"
          rows="5"
          value={data.userAnswer}
          onChange={e => onChange({ userAnswer: e.target.value })}
        />
      </CardBody>
    </div>
  );
}

export default ExamItem;

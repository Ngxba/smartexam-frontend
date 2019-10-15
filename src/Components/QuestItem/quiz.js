import React, { Component } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CustomInput,
  Button
} from "reactstrap";
export default class Quiz extends Component {

  render() {
    return (
      <div><Card><CardBody><CardTitle><h5 style={{ display: "inline-block" }}>
        Quiz question number: {this.props.numberOfQuest}</h5>
        {" "}
        {this.props.authenUser.roll === "Teacher" &&<><Button
          outline
          className="float-right"
          color="danger"
          style={{ marginRight: 5, borderRadius: 50 }}
          onClick={()=> this.props.deleteOne(this.props.data._id)}
        ><i className="fas fa-trash"></i>
        </Button>
        <Button
          outline
          className="float-right"
          color="primary"
          style={{ marginRight: 5, borderRadius: 50 }}
          onClick={this.props.onEdit}
        ><i className="fas fa-pen"></i>
        </Button>
        {(this.props.selected === true ||
          this.props.selected === false) && (
            <CustomInput
              type="checkbox"
              className="float-right"
              id={this.props.data._id}
              checked={this.props.selected}
              onChange={() =>
                this.props.onSelect(this.props.data._id, "quiz")
              }
              inline
            />
          )}</>}
      </CardTitle>
        <hr />
        <CardSubtitle>
          <p style={{whiteSpace: "pre"}}>Read the question and choose the right answer</p>
          <h5>
            <em>{this.props.data.QuizQuestionContent}</em>
          </h5>
        </CardSubtitle>
        <hr />
        <CardText>Answers: </CardText>
        {this.props.data.Answers.map(answer => {
          return (
            <div key={answer.order}>
              <input type="radio" name={answer + this.props.data._id} />
              {" "}{answer.value}
            </div>
          );
        })}
        <br />
        <CardText>
        Right Answer : {this.props.data.rightAnswer}
        </CardText>
      </CardBody>
      </Card>
      </div>
    );
  }
}

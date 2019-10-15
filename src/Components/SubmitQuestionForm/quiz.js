import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  Button,
  FormGroup,
  Input,
  Label,
  Form,
  Alert,
  Spinner,
  Popover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";

import { addQuiz } from "../../Action/addQuestion";

export default class Quiz extends Component {
  state = {
    model: "quiz",
    numberOfQuest: 1,
    QuizQuestionContent: "",
    Answers: [{ order: 0, value: " " }, { order: 1, value: "  " }],
    rightAnswer: "",
    loading: false,
    pushStatus: "not",
    allQuizQuestions: [],
    classCode: "",
    type: "",
    _id: "",
    popoverOpen: false
  };

  togglePopover = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
    setTimeout(()=>{this.setState({
      popoverOpen: !this.state.popoverOpen
    });},1500)
  };

  addAnwser = () => {
    this.setState(prev => ({
      Answers: [
        ...prev.Answers,
        {
          order: prev.Answers.length,
          value: ""
        }
      ]
    }));
  };

  deleteAnswer = () => {
    if (this.state.Answers.length > 2) {
      this.state.Answers.pop();
      this.setState({
        Answers: this.state.Answers
      });
    } else {
      this.togglePopover()
    }
  };

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  onChangeAnwser = (order, value) => {
    this.setState(prev => {
      const answers = [...prev.Answers];
      answers[order - 1].value = value;
      return {
        Answers: answers
      };
    });
  };

  submit = async event => {
    event.preventDefault();
    const {
      type,
      model,
      QuizQuestionContent,
      Answers,
      rightAnswer
    } = this.state;
    try {
      const res = await addQuiz(
        type,
        model,
        QuizQuestionContent,
        Answers,
        rightAnswer
      );
      this.setState({
        _id: res._id
      });
      this.setState(prevState => ({
        model: "quiz",
        numberOfQuest: this.state.numberOfQuest + 1,
        QuizQuestionContent: "",
        Answers: [
          { order: 0, value: " " },
          { order: 1, value: "  " }
        ],
        rightAnswer: "",
        pushStatus: true,
        _id: "",
        allQuizQuestions: [...prevState.allQuizQuestions, this.state]
      }));
      this.props.sendQuizdata(this.state.allQuizQuestions);
      setTimeout(() => {
        this.setState({
          pushStatus: "not"
        });
      }, 2000);
    } catch (err) {
      this.setState({
        pushStatus: false
      });
      setTimeout(() => {
        this.setState({
          pushStatus: "not"
        });
      }, 2000);
    }
  };

  componentDidMount() {
    this.setState({
      classCode: this.props.classCode
    });
    if (this.props.classCode) {
      this.setState({
        type: this.props.classCode
      });
    } else {
      this.setState({
        type: "SECRET_KEYCLASS_12345@gmz@123@000@721"
      });
    }
  }

  onChange = object => {
    this.setState(Object.assign(this.state, object));
  };
  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  rightAnswerOnChange = value => {
    this.setState({
      rightAnswer: value
    });
  };

  render() {
    let canSubmit = true;
    return (
      <div>
        <Card>
          <CardBody >
            {this.state.pushStatus === true && (
              <Alert color="success">Submit Question SUCCESS</Alert>
            )}
            {this.state.pushStatus === false && (
              <Alert color="danger">Submit Question FALSE</Alert>
            )}
            <CardTitle>
              <h5>Quiz question number: {this.state.numberOfQuest}</h5>{" "}
            </CardTitle>
            <hr />
            <CardSubtitle>
              <h6>
                <em>Please input your question</em>
              </h6>
            </CardSubtitle>
            <Form onSubmit={this.submit}>
              <FormGroup>
                <Input
                  type="textarea"
                  name="text"
                  id="quizQuestion"
                  rows="3"
                  placeholder="Noi dung cau hoi"
                  value={this.state.QuizQuestionContent}
                  onChange={event => {
                    this.onChange({
                      QuizQuestionContent: event.target.value
                    });
                  }}
                  required={true}
                />
                <hr />
                <CardText>
                  <strong>Answers</strong>
                </CardText>
                {this.state.Answers.map((v, index) => {
                  let duplicate = false;
                  this.state.Answers.map(item => {
                    if (v !== item) {
                      if (v.value === item.value) {
                        duplicate = true;
                        canSubmit = false;
                      }
                    }
                    return null;
                  });
                  return (
                    <Answer
                      duplicate={duplicate}
                      order={v.order + 1}
                      key={v.order}
                      value={v.value}
                      onChangeValue={this.onChangeAnwser}
                    />
                  );
                })}
                {this.state.Answers.map((v, index) => {
                  this.state.Answers.map(item => {
                    if (v !== item) {
                      if (v.value === item.value) {
                        canSubmit = false;
                      }
                    }
                    return null;
                  });
                  return null;
                })}
                <br />
                <Button
                  outline
                  color="primary"
                  style={{ marginRight: 5 }}
                  className="float-right"
                  type="button"
                  onClick={this.addAnwser}
                >
                  <i className="fas fa-plus"></i>
                </Button>
                <Button
                  outline
                  style={{ marginRight: 5 }}
                  color="primary"
                  className="float-right"
                  id="minus"
                  type="button"
                  onClick={this.deleteAnswer}
                >
                  <i className="fas fa-minus"></i>
                </Button>
                <Popover
                  placement="bottom"
                  isOpen={this.state.popoverOpen}
                  target="minus"
                  className="popover-primary"
                >
                  <PopoverHeader>WARNING</PopoverHeader>
                  <PopoverBody>
                  Minimun 2 answers - IT A QUIZZZZ
                  </PopoverBody>
                </Popover>
                <br />
                <br />
                <hr />
                <Label>Right answers:</Label>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around"
                  }}
                >
                  {this.state.Answers.map(v => (
                    <span key={this.state.numberOfQuest + v.order}>
                      <input
                        type="radio"
                        name={this.state.numberOfQuest}
                        onChange={e => this.rightAnswerOnChange(v.value)}
                        value={v.value}
                        style={{ marginRight: 10 }}
                        required
                      />
                      <Label>{v.value}</Label>
                    </span>
                  ))}
                </div>
                <br />
                {this.state.loading && (
                  <div style={{ textAlign: "center" }}>
                    <Spinner style={{ width: "3rem", height: "3rem" }} />
                  </div>
                )}
                <Button
                  disabled={
                    this.state.pushStatus === true ||
                    this.state.pushStatus === false ||
                    !canSubmit
                  }
                  type="submit"
                  className="float-right"
                >
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export function Answer(props) {
  const { order, onChangeValue, value, duplicate } = props;
  let opacity = 1;
  if (value === "") {
    opacity = 0.5;
  }
  return (
    <>
      <Label style={{ opacity: opacity }}>Answer {order}:</Label>
      {duplicate && (
        <Label
          style={{ opacity: opacity, color: "#dc3545" }}
          className="float-right"
        >
          DUPLICATED
        </Label>
      )}
      {!duplicate ? (
        <Input
          type="textarea"
          name="text"
          onChange={e => onChangeValue(order, e.target.value)}
          value={value}
          style={{ opacity: opacity }}
          required={true}
        />
      ) : (
        <Input
          type="textarea"
          name="text"
          onChange={e => onChangeValue(order, e.target.value)}
          value={value}
          style={{ opacity: opacity, border: "1px solid #dc3545" }}
          required={true}
        />
      )}
    </>
  );
}

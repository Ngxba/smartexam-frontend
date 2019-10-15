import React, { Component } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  FormGroup,
  Input,
  Label,
  Button,
  Form,
  Alert
} from "reactstrap";
import { addEssayQuest } from "../../Action/addQuestion";

export default class Essay extends Component {
  state = {
    model: "essay",
    numberOfQuest: 1,
    essayQuestionContent: "",
    modelEssayQuestionAnswer: "",
    pushStatus: "not",
    allEssayQuestions : [],
    _id : "",
    type : ""
  };

  onChange = object => {
    this.setState(Object.assign(this.state, object));
  };

  submit = async event => {
    event.preventDefault();
    const {
      type,
      model,
      essayQuestionContent,
      modelEssayQuestionAnswer
    } = this.state;
    try {
      const res = await addEssayQuest(
        type,
        model,
        essayQuestionContent,
        modelEssayQuestionAnswer
      );
      this.setState({
        _id : res._id
      })
      this.setState(prevState => ({
        numberOfQuest: this.state.numberOfQuest + 1,
        model: "essay",
        essayQuestionContent: "",
        modelEssayQuestionAnswer: "",
        pushStatus: true,
        _id : "",
        allEssayQuestions : [...prevState.allEssayQuestions,this.state]
      }));
      this.props.sendEssayData(this.state.allEssayQuestions)
      setTimeout(() => {
        this.setState({
          pushStatus: "not"
        });
      }, 3000);
      
    } catch (err) {
      this.setState({
        pushStatus: false
      });
      setTimeout(() => {
        this.setState({
          pushStatus: "not"
        });
      }, 3000);
    }
  };
  componentDidMount() {
    this.setState({
      classCode: this.props.classCode
    });
    if(this.props.classCode){
      this.setState({
        type : this.props.classCode
      })
      
    } else {
      this.setState({
        type : "SECRET_KEYCLASS_12345@gmz@123@000@721"
      })
      
    }
  }
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            {this.state.pushStatus === true && (
              <Alert color="success">Submit Question SUCCESS</Alert>
            )}
            {this.state.pushStatus === false && (
              <Alert color="danger">Submit Question FALSE</Alert>
            )}
            <CardTitle>
              <h5>Essay question number: {this.state.numberOfQuest}</h5>{" "}
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
                  id="essayQuestion"
                  rows="3"
                  value={this.state.essayQuestionContent}
                  placeholder="Noi dung cau hoi"
                  onChange={event => {
                    this.onChange({
                      essayQuestionContent: event.target.value
                    });
                  }}
                  required = {true}
                />
              </FormGroup>
              <hr />

              <CardText>
              </CardText>
              <FormGroup>
                <Label for="questionContent">Sample Answer:</Label>
                <Input
                  type="textarea"
                  name="text"
                  id="questionContent"
                  rows="5"
                  value={this.state.modelEssayQuestionAnswer}
                  placeholder="Noi dung cau tra loi"
                  onChange={event => {
                    this.onChange({
                      modelEssayQuestionAnswer: event.target.value
                    });
                  }}
                  required = {true}
                />
                <br />
                <Button type="submit" className="float-right">
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

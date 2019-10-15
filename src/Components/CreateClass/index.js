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
  Alert,
  Container
} from "reactstrap";
import { createNewClass } from "../../Action/class";
import { getAllUserWithRoll } from "../../Action/user";

export default class CreateClass extends Component {
  state = {
    pushStatus: "not",
    classCode: "",
    Student: [{ order: 0, value: "" }],
    teacher: this.props.authedUser,
    listOfCorrectStudent: [],
    wrongValue: []
  };
  addStudent = () => {
    this.setState(prev => ({
      Student: [
        ...prev.Student,
        {
          order: prev.Student.length,
          value: ""
        }
      ]
    }));
  };

  deleteStudent = () => {
    if(this.state.Student.length >1){
      this.state.Student.pop();
      this.setState({
        Student: this.state.Student
      });
    }
  };

  onChange = object => {
    this.setState(Object.assign(this.state, object));
  };

  onChangeStudent = (order, value) => {
    this.setState(prev => {
      const student = [...prev.Student];
      student[order - 1].value = value;
      return {
        Student: student
      };
    });
  };

  async componentDidMount() {
    const response = await getAllUserWithRoll("Student");
    const listOfCorrectStudent = [];
    response.map(item => listOfCorrectStudent.push(item.email));
    this.setState({
      listOfCorrectStudent: listOfCorrectStudent
    });
  }

  submit = async event => {
    event.preventDefault();
    const wrongValue = [];
    this.state.Student.filter((item, index) => {
      if (this.state.listOfCorrectStudent.indexOf(item.value) === -1) {
        wrongValue.push(index);
      }
      return this.state.listOfCorrectStudent.indexOf(item.value) === -1;
    });
    this.setState({
      wrongValue: wrongValue,
      pushStatus: "wrongUser"
    });
    if (wrongValue.length === 0) {
      try {
        await createNewClass(
          this.state.classCode,
          this.state.Student,
          this.state.teacher.userEmail
        );
        this.setState({
          pushStatus: true
        });

        setTimeout(() => {
          this.props.getClass(this.state.classCode);
        }, 2000);
      } catch (er) {
        this.setState({
          pushStatus: false
        });
      }
    }
  };

  render() {
    let canSubmit = true
    return (
      <div>
      {this.state.teacher.roll === "Teacher" ?  <Container>
          <div style={{ height: "70px" }}></div>
          <Card>
            <CardBody>
              {this.state.pushStatus === true && (
                <Alert color="success">Create Class SUCCESS</Alert>
              )}
              {this.state.pushStatus === false && (
                <Alert color="danger">
                  Create Class FALSE (check your CONNECTION or CLASS CODE)
                </Alert>
              )}
              {this.state.pushStatus === "wrongUser" && (
                <Alert color="danger">
                  Create Class FALSE ( Invalid student )
                </Alert>
              )}
              <h3>Teacher: {this.state.teacher.userName}</h3>
              <Form onSubmit={this.submit}>
              <CardTitle>
                  <Label for="classCode">Class Code: </Label>
                  <Input
                    type="text"
                    name="classCode"
                    id="classCode"
                    onChange={event => {
                      this.onChange({ classCode: event.target.value });
                    }}
                    value={this.state.classCode}
                    placeholder="class code"
                    required={true}
                  />
              </CardTitle>
              <hr />
              <CardSubtitle>
                <h6>
                  <em>Take note : Class code cannot be duplicated</em>
                </h6>
              </CardSubtitle>
              
                <hr />
                <CardText>
                  <strong>Class's Student</strong>
                </CardText>
                <FormGroup>
                  {this.state.Student.map((v, index) => {
                    canSubmit = true
                    let duplicate = false;
                    let wrong = false;
                    this.state.Student.map(item => {
                      if (v !== item) {
                        if (v.value === item.value) {
                          duplicate = true;
                          canSubmit = false
                        }
                      }
                      return null
                    });
                    
                    if (this.state.wrongValue.indexOf(index) > -1) {
                      wrong = true;
                    }
                    return (
                      <Student
                        wrong={wrong}
                        duplicate={duplicate}
                        order={v.order + 1}
                        key={v.order}
                        value={v.value}
                        onChangeValue={this.onChangeStudent}
                      />
                    );
                  })}
                  {this.state.Student.map((v, index) => {
                    this.state.Student.map(item => {
                      if (v !== item) {
                        if (v.value === item.value) {
                          canSubmit = false
                        }
                      }
                      return null
                    });
                    return null
                  })}
                  <br />
                  <Button
                    outline
                    color="primary"
                    style={{ marginRight: 5 }}
                    className="float-right"
                    type="button"
                    onClick={this.addStudent}
                  >
                    <i className="fas fa-plus"></i>
                  </Button>
                  <Button
                    outline
                    style={{ marginRight: 5 }}
                    color="primary"
                    className="float-right"
                    type="button"
                    onClick={this.deleteStudent}
                  >
                    <i className="fas fa-minus"></i>
                  </Button>
                  <br />
                  <br />
                  <br />
                  <Button type="submit" className="float-right" disabled={!canSubmit}>
                    Submit
                  </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Container> : <Container>
          <h1>You are not suppose to be here !!</h1>
        </Container>}
        
      </div>
    );
  }
}

function Student(props) {
  const { order, onChangeValue, value, wrong, duplicate } = props;
  let opacity = 1;
  if (value === "") {
    opacity = 0.5;
  }
  return (
    <>
      {duplicate && (
        <Label
          style={{ opacity: opacity, color: "#dc3545" }}
          className="float-right"
        >
          DUPLICATED
        </Label>
      )}
      {wrong && (
        <Label
          style={{ opacity: opacity, color: "#dc3545" }}
          className="float-right"
        >
          USER NOT EXIST 
        </Label>
      )}
      <Label style={{ opacity: opacity }}>Student {order}:</Label>
      {wrong || duplicate ? (
        <Input
          type="text"
          name="text"
          onChange={e => onChangeValue(order, e.target.value)}
          value={value}
          style={{ opacity: opacity, border: "1px solid #dc3545" }}
          required={true}
        />
      ) : (
        <Input
          type="text"
          name="text"
          onChange={e => onChangeValue(order, e.target.value)}
          value={value}
          style={{ opacity: opacity }}
          required={true}
        />
      )}
    </>
  );
}

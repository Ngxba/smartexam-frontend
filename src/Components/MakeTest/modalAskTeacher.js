import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class ModalAskTeacher extends React.Component {
  state = {
    numberOfQuizQuest: "",
    numberOfEssayQuest: "",
    title:"",
    description:"",
    testCode: ""
  };

  onChange = object => {
    this.setState(Object.assign(this.state, object));
  };

  onSubmit = () => {
    this.onChange({ testCode: this.makeTestCode(5) });
    this.props.onSubmit(this.state);
    this.onToggle();
  };

  onToggle = () => {
    this.props.onToggle();
  };
  makeTestCode = length => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };
  render() {
    return (
      <Modal isOpen={this.props.visible} toggle={this.onToggle}>
        <ModalHeader>MAKE TEST</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Test name:</Label>
              <Input
                type="textarea"
                rows="1"
                placeholder="Title"
                value={this.state.title}
                onChange={event => this.onChange({title: event.target.value})}
              />
              <Label>Description</Label>
              <Input
                type="textarea"
                rows="3"
                placeholder="Description"
                value={this.state.description}
                onChange={event => this.onChange({description: event.target.value})}
              />
              <Label for="quiz">
                Number of quiz questions (max : {this.props.numberOfQuizQuest})
              </Label>
              <Input
                type="text"
                name="quiz"
                id="quiz"
                onChange={event => {
                  this.onChange({ numberOfQuizQuest: event.target.value });
                }}
                value={this.state.numberOfQuizQuest}
                placeholder="10"
              />
              <Label for="essay">
              Number of essay questions (max : {this.props.numberOfEssayQuest})
              </Label>
              <Input
                type="text"
                name="essay"
                id="essay"
                placeholder="10"
                onChange={event => {
                  this.onChange({ numberOfEssayQuest: event.target.value });
                }}
                value={this.state.numberOfEssayQuest}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
        <br/>
        <br/>
        <br/>
        <br/>
          <Button
            disabled={
              !(
                this.state.numberOfQuizQuest <= this.props.numberOfQuizQuest &&
                this.state.numberOfEssayQuest <= this.props.numberOfEssayQuest &&
                this.state.numberOfQuizQuest > 0 &&
                this.state.numberOfEssayQuest > 0 &&
                this.state.title !== "" &&
                this.state.description !== ""
              )
            }
            color="primary"
            onClick={this.onSubmit}
          >
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={this.onToggle} style={{marginRight : "10px"}}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalAskTeacher;

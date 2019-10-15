import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  CustomInput,
  Button
} from "reactstrap";

export default class Essay extends Component {
  render() {
    return (
      <div><Card>
          <CardBody>
            <CardTitle>
              <h5 style={{ display: "inline-block" }}>
              Essay question number: {this.props.numberOfQuest}
              </h5>
              {" "}
              {this.props.authenUser.roll === "Teacher" && <><Button
                outline
                className="float-right"
                color="danger"
                style={{ marginRight: 5, borderRadius: 50 }}
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
                this.props.selected === false) && (<CustomInput
                  type="checkbox"
                  className="float-right"
                  id={this.props.data._id}
                  checked={this.props.selected}
                  onChange={() =>
                    this.props.onSelect(this.props.data._id, "essay")
                  }
                  inline
                />
              )}</> }
              </CardTitle>
            <hr />
              <CardSubtitle>
          <p style={{whiteSpace: "pre"}}>Read the question and write down the answer</p>
          <h5>
            <em>{this.props.data.essayQuestionContent}</em>
          </h5>
            </CardSubtitle>
            <hr /><CardText>Sample Answer: </CardText>
            <CardText>{this.props.data.modelEssayQuestionAnswer}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

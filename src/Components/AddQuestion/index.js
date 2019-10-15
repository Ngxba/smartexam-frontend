import React, { Component } from "react";
import { Container, Button, Spinner } from "reactstrap";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import SubmitQuestionForm from "../SubmitQuestionForm";

class AddQuestion extends Component {
  state = {
    loading: false,
    ModalComplePushQuestion : false,
    classCode : ""
  };

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  componentDidMount() {
    const query = queryString.parse(this.props.location.search).q; //class code
    this.setState({
      classCode : query
    })
    this.toggleLoading();
    setTimeout(this.toggleLoading, 1000);
  }

  ToggleModalComplePushQuestion = () => {
    this.setState({
      ModalComplePushQuestion : !this.state.ModalComplePushQuestion
    })
  }
  render() {
    return (
      <Container>
      {this.props.authenUser.roll === "Teacher" ? <>{this.state.loading ? (
          <div style={{ textAlign: "center" }}>
          <div style={{ height: "5em" }}></div>
            <Spinner style={{ width: "3rem", height: "3rem" }} />
          </div>
        ) : (
          <>
            {queryString.parse(this.props.location.search).q && <h3 style={{ textAlign: "center" }}>Pay attention, you are adding questions to the practice pool quest of Class: "{queryString.parse(this.props.location.search).q}"</h3>}
            {!(queryString.parse(this.props.location.search).q) && <h3 style={{ textAlign: "center" }}>Pay attention, you are adding questions to the general exam pool quest</h3>}
            <SubmitQuestionForm classCode={this.state.classCode}  ModalComplePushQuestion ={this.state.ModalComplePushQuestion} onToggle = {this.ToggleModalComplePushQuestion}></SubmitQuestionForm>
            <br />
            <div style={{ textAlign: "center" }}>
              <Button color="danger" onClick={this.ToggleModalComplePushQuestion}>Fininsh</Button>
            </div>
          </>
        )}</> : <>
          <h1>You are not suppose to be here !</h1>
        </>}
      </Container>
    );
  }
}

export default withRouter(AddQuestion);
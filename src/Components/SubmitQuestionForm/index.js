import React from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col
} from "reactstrap";
import Quiz from "./quiz";
import Essay from "./essay";
import classnames from "classnames";
import ModalComplePushQuestion from "../ModalCompletePushQuest";

class SubmitQuestionForm extends React.Component {
  state = {
    activeTab: "1",
    quizData: [],
    essayData: []
  };
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    return (
      <div>
        <br />
        <div className="nav-tabs-navigation">
          <div className="nav-tabs-wrapper">
            <Nav role="tablist" tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  Quiz question
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  Essay question
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </div>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12" className="ml-auto mr-auto text-center" md="6">
                <Quiz
                  classCode={this.props.classCode}
                  sendQuizdata={data => {
                    this.setState({
                      quizData: data
                    });
                  }}
                ></Quiz>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12" className="ml-auto mr-auto text-center" md="6">
                <Essay
                  classCode={this.props.classCode}
                  sendEssayData={data => {
                    this.setState({
                      essayData: data
                    });
                  }}
                ></Essay>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        {this.props.ModalComplePushQuestion && (
          <ModalComplePushQuestion
            essayData={this.state.essayData}
            quizData={this.state.quizData}
            visible={this.props.ModalComplePushQuestion}
            onToggle={this.props.onToggle}
          ></ModalComplePushQuestion>
        )}
      </div>
    );
  }
}

export default SubmitQuestionForm;

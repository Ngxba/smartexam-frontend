import React, { Component } from "react";
import QuestItem from "../QuestItem";
import { getQuiz } from "../../Action/getQuest";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { delQuest } from "../../Action/delQuest";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Spinner,
  Container,
  CustomInput,
  Button,
  UncontrolledPopover,
  PopoverHeader,
} from "reactstrap";
import classnames from "classnames";
class GetQuestion extends Component {
  state = {
    listQuest: [],
    loading: false,
    numberOfQuizQuest: [],
    numberOfEssayQuest: [],
    activeTab: "1",
    selectedQuest: [],
    selectedAll: false,
    type: ""
  };
  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  fetchQuestPool = async time => {
    this.toggleLoading();
    const query = queryString.parse(this.props.location.search).q;
    if (query) {
      setTimeout(async () => {
        try {
          const response = await getQuiz();
          this.setState({
            listQuest: response
          });
        } catch (err) {
          console.log(err.message);
        }
        var numberOfQuizQuest = this.state.listQuest.filter(function(quest) {
          quest.checked = false;
          return quest.model === "quiz" && quest.type === query;
        });
        var numberOfEssayQuest = this.state.listQuest.filter(function(quest) {
          quest.checked = false;
          return quest.model === "essay" && quest.type === query;
        });
        this.setState({
          numberOfQuizQuest: numberOfQuizQuest,
          numberOfEssayQuest: numberOfEssayQuest
        });
        this.toggleLoading();
      }, time);
    } else {
      setTimeout(async () => {
        try {
          const response = await getQuiz();
          this.setState({
            listQuest: response
          });
        } catch (err) {
          console.log(err.message);
        }
        var numberOfQuizQuest = this.state.listQuest.filter(function(quest) {
          quest.checked = false;
          return (
            quest.model === "quiz" &&
            quest.type === "SECRET_KEYCLASS_12345@gmz@123@000@721"
          );
        });
        var numberOfEssayQuest = this.state.listQuest.filter(function(quest) {
          quest.checked = false;
          return (
            quest.model === "essay" &&
            quest.type === "SECRET_KEYCLASS_12345@gmz@123@000@721"
          );
        });
        this.setState({
          numberOfQuizQuest: numberOfQuizQuest,
          numberOfEssayQuest: numberOfEssayQuest
        });
        this.toggleLoading();
      }, time);
    }
  };
  componentDidMount() {
    this.fetchQuestPool(1000);
  }

  toggle = tab => {
    let selectQuizList = [];
    this.state.numberOfQuizQuest.map(item => {
      item.checked = false;
      return (selectQuizList = [...selectQuizList, item]);
    });
    let selectEssayList = [];
    this.state.numberOfEssayQuest.map(item => {
      item.checked = false;
      return (selectEssayList = [...selectEssayList, item]);
    });
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        selectedAll: false,
        numberOfEssayQuest: selectEssayList,
        numberOfQuizQuest: selectQuizList
      });
    }
  };

  onSelectAll = async questType => {
    this.setState({
      selectedAll: await !this.state.selectedAll
    });
    let selectList = [];
    if (questType === "quiz") {
      this.state.numberOfQuizQuest.map(item => {
        item.checked = this.state.selectedAll;
        return (selectList = [...selectList, item]);
      });
    } else {
      this.state.numberOfEssayQuest.map(item => {
        item.checked = this.state.selectedAll;
        return (selectList = [...selectList, item]);
      });
    }
    if (questType === "quiz") this.setState({ numberOfQuizQuest: selectList });
    else this.setState({ numberOfEssayQuest: selectList });
  };

  onSelectOne = (questID, questType) => {
    let selectList = [];
    if (questType === "quiz") {
      this.state.numberOfQuizQuest.map(item => {
        if (item._id === questID) item.checked = !item.checked;
        return (selectList = [...selectList, item]);
      });
    } else {
      this.state.numberOfEssayQuest.map(item => {
        if (item._id === questID) item.checked = !item.checked;
        return (selectList = [...selectList, item]);
      });
    }
    if (questType === "quiz") this.setState({ numberOfQuizQuest: selectList });
    else this.setState({ numberOfEssayQuest: selectList });
  };

  onDeleteQuest = async () => {
    let questIDs = [];
    this.state.numberOfQuizQuest.map(item => {
      if (item.checked) return (questIDs = [...questIDs, item._id]);
      else return null;
    });
    this.state.numberOfEssayQuest.map(item => {
      if (item.checked) return (questIDs = [...questIDs, item._id]);
      else return null;
    });
    try {
      await delQuest(questIDs);
      this.setState({
        selectedAll: false,
        numberOfEssayQuest: this.state.numberOfEssayQuest.filter(
          item => !item.checked
        ),
        numberOfQuizQuest: this.state.numberOfQuizQuest.filter(
          item => !item.checked
        )
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div style={{ textAlign: "center" }}>
          <div style={{ height: "5em" }}></div>
            <Spinner style={{ width: "3rem", height: "3rem" }} />
          </div>
        ) : (
          <Container>
            {queryString.parse(this.props.location.search).q && (
              <h3 style={{ textAlign: "center" }}>
              Pay attention, you are watching questions from the practice pool quest of Class: "{queryString.parse(this.props.location.search).q}"
              </h3>
            )}
            {!queryString.parse(this.props.location.search).q && (
              <h3 style={{ textAlign: "center" }}>
              Pay attention, you are watching questions from the general exam pool quest
              </h3>
            )}
            <hr/>
            {this.state.numberOfQuizQuest.length === 0 && this.state.numberOfEssayQuest.length ===0 ? <>
              <h4>No question founded</h4>
            </> : <><Nav>
              <NavItem className="p-2 flex-grow-1 bd-highlight">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "1"
                      })}
                      onClick={() => {
                        this.toggle("1");
                      }}
                    >
                      Quiz questions
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
                      Essay questions
                    </NavLink>
                  </NavItem>
                </Nav>
              </NavItem>
              {this.props.authenUser.roll === "Teacher" && <NavItem
                className="d-flex align-items-center"
                style={{ marginRight: "3em" }}
              >
                <UncontrolledPopover
                  placement="right-start"
                  target="UncontrolledPopover"
                >
                  <PopoverHeader>Sellect all</PopoverHeader>
                </UncontrolledPopover>
                <Button
                  color="danger"
                  style={{ textAlign: "end", marginRight : "2em" }}
                  onClick={this.onDeleteQuest}
                >
                  DELETE
                  
                </Button>
                <CustomInput
                  type="checkbox"
                  id="UncontrolledPopover"
                  checked={this.state.selectedAll}
                  onChange={() => {
                    if (this.state.activeTab === "1") {
                      this.onSelectAll("quiz");
                    } else if (this.state.activeTab === "2") {
                      this.onSelectAll("essay");
                    }
                  }}
                  inline
                />
              </NavItem>}
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    {this.state.numberOfQuizQuest.map((post, index) => {
                      return (
                        <QuestItem
                          key={post._id}
                          data={post}
                          numberOfQuizQuest={index + 1}
                          onSelect={this.onSelectOne}
                          selected={post.checked}
                          authenUser = {this.props.authenUser}
                        ></QuestItem>
                      );
                    })}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    {this.state.numberOfEssayQuest.map((post, index) => {
                      return (
                        <QuestItem
                          key={post._id}
                          data={post}
                          numberOfEssayQuest={index + 1}
                          authenUser = {this.props.authenUser}
                          onSelect={this.onSelectOne}
                          selected={post.checked}
                        ></QuestItem>
                      );
                    })}
                  </Col>
                </Row>
              </TabPane>
            </TabContent></> }
            
          </Container>
        )}
      </div>
    );
  }
}

export default withRouter(GetQuestion);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { getClass } from "../../Action/class";
import { Col, Row, Container, Button, Input, Modal, Label, Spinner } from "reactstrap";
import "./index.css";
import { getAllUserWithRoll } from "../../Action/user";
import { addUserIntoClass } from "../../Action/class";

class GetClass extends Component {
  state = {
    classCode: "",
    listOfStudent: [],
    listOfTeacher: [],
    QuestPool: [],
    getStudent: false,
    getTeacher: false,
    modalAddTeacher: false,
    TA: "",
    listOfCorrectTeacher: [],
    submitTA: "not",
    teacherDuplicated: "not",
    ModalAddStudent: false,
    loading: false,
    Student : "",
    listOfCorrectStudent : [],
    studentDuplicated : false,
    studentNotExist : false
  };
  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };
  async componentDidMount() {
    this.fetchClassResult();
    const response = await getAllUserWithRoll("Teacher");
    const listOfCorrectTeacher = [];
    const res = await getAllUserWithRoll("Student");
    const listOfCorrectStudent = [];
    res.map(item => listOfCorrectStudent.push(item.email));
    response.map(item => listOfCorrectTeacher.push(item.email));
    this.setState({
      listOfCorrectTeacher: listOfCorrectTeacher,
      listOfCorrectStudent: listOfCorrectStudent
    });
  }
  fetchClassResult = async () => {{
    this.toggleLoading();
    const query = queryString.parse(this.props.location.search).q; //class code
    setTimeout(async () => {
      try {
        const response = await getClass(query);
        this.setState({
          classCode: response.classCode,
          listOfTeacher: response.listOfTeacher,
          listOfStudent: response.listOfStudent,
          QuestPool: response.poolQuest
        });
      } catch (err) {
        console.log("get class err");
      }
      this.toggleLoading();
    }, 1000);
    

  }
  };
  onChangeStudent = value => {
    this.setState({
      Student: value
    });
  }
  onChangeTA = value => {
    this.setState({
      TA: value
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      this.fetchClassResult();
    }
  }

  makeTest = () => {
    this.props.history.push(`/class/maketest?q=${this.state.classCode}`);
  };

  addQuestInPool = () => {
    this.props.history.push(`/class/addquestion?q=${this.state.classCode}`);
  };

  getQuestPool = () => {
    this.props.history.push(`/class/getallquestion?q=${this.state.classCode}`);
  };
  getAllUserInClass = (data, roll) => {
    if (roll === "Teacher") {
      this.setState({
        getTeacher: true
      });
    } else if (roll === "Student") {
      this.setState({
        getStudent: true
      });
    }
  };
  setStateToOrigin = () => {
    this.setState({
      getStudent: false,
      getTeacher: false
    });
  };

  getAllTest = () => {
    this.props.history.push(`/class/getalltest?q=${this.state.classCode}`);
  };

  seeUser = (user, roll) => {
    this.props.history.push(`/profile?q=${user}&&d=${roll}`);
  };
  toggleModalAddTeacher = () => {
    this.setState({
      modalAddTeacher: !this.state.modalAddTeacher
    });
  };

  toggleModalAddStudent = () => {
    this.setState({
      modalAddStudent: !this.state.modalAddStudent
    });
  };
  addTeacher = async () => {
    this.setState({
      submitTA: true
    });
    if (this.state.listOfTeacher.indexOf(this.state.TA) > -1) {
      this.setState({
        teacherDuplicated: true
      });
    } else {
      this.setState({
        teacherDuplicated: false
      });
    }
    if (this.state.listOfCorrectTeacher.indexOf(this.state.TA) === -1) {
      this.setState({
        submitTA: false
      });
    } else if (
      this.state.listOfCorrectTeacher.indexOf(this.state.TA) > -1 &&
      this.state.listOfTeacher.indexOf(this.state.TA) === -1
    ) {
      await addUserIntoClass(this.state.classCode, this.state.TA, "Teacher");
      this.setState({
        submitTA: true,
        TA: "",
        listOfTeacher: [...this.state.listOfTeacher, this.state.TA]
      });
      this.toggleModalAddTeacher();
    }
  };
  addStudent = async () => {
    if(this.state.listOfCorrectStudent.indexOf(this.state.Student) === -1){
      console.log("user not exist")
      this.setState({
        studentNotExist : true
      })
    } else {
      this.setState({
        studentNotExist : false
      })
    }
    if(this.state.listOfStudent.indexOf(this.state.Student) > -1){
      console.log("duplicated")
      this.setState({
        studentDuplicated : true
      })
    } else {
      this.setState({
        studentDuplicated :  false
      })
    }
    if(this.state.listOfCorrectStudent.indexOf(this.state.Student) > -1 && this.state.listOfStudent.indexOf(this.state.Student) === -1){
      await addUserIntoClass(this.state.classCode, this.state.Student, "Student");
      this.setState({
        studentDuplicated: false,
        studentNotExist: false,
        Student : "",
        listOfStudent: [...this.state.listOfStudent, this.state.Student]
      });
      this.toggleModalAddStudent();
    }
  };
  render() {
    return (
      <Container >
      <div style={{ height: "5em" }} ></div>
        {this.state.loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner style={{ width: "3rem", height: "3rem" }} />
          </div>
        ) : (
          <>
            <h2 style={{ textAlign: "center" }}>
              Wellcome to class: "
              {queryString.parse(this.props.location.search).q}"
            </h2>
            <br />
            <br />
            Main Teacher: <strong>{this.state.listOfTeacher[0]}</strong>
            <br />
            Total students : {this.state.listOfStudent.length} students
            <br />
            Teaching Asisstant:
            <ul>
              {this.state.listOfTeacher.map((item, index) => {
                if (index === 0) {
                  return null;
                }
                return (
                  <li key={index}>
                    <span
                      className="Btn"
                      onClick={() => this.seeUser(item, "Teacher")}
                    >
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
            <hr />
            {!this.state.getStudent && !this.state.getTeacher && (
              <div>
                <Row style={{ textAlign: "center" }}>
                {this.props.authenUser.roll === "Teacher" && <Col>
                    <Button
                      className="Button"
                      onClick={this.toggleModalAddTeacher}
                    >
                      ADD TEACHER
                    </Button>
                  </Col>}
                  <Col>
                    <Button
                      className="Button"
                      onClick={() =>
                        this.getAllUserInClass(
                          this.state.listOfStudent,
                          "Student"
                        )
                      }
                    >
                      GET STUDENT
                    </Button>
                  </Col>
                </Row>
                <br />
                <Row style={{ textAlign: "center" }}>
                {this.props.authenUser.roll === "Teacher" && <Col>
                    <Button className="Button" onClick={this.makeTest}>
                      TAKE TEST / MAKE TEST
                    </Button>
                  </Col>}
                  <Col>
                    <Button className="Button" onClick={this.getQuestPool}>
                      GET QUESTPOOL
                    </Button>
                  </Col>
                </Row>
                <br />
                <Row style={{ textAlign: "center" }}>
                {this.props.authenUser.roll === "Teacher" && <Col>
                    <Button className="Button" onClick={this.addQuestInPool}>
                      ADD QUEST IN QUESTPOOL
                    </Button>
                  </Col> }
                  <Col>
                    <Button className="Button" onClick={this.getAllTest}>
                      SEE ALL TEST
                    </Button>
                  </Col>
                </Row>
              </div>
            )}
            {this.state.getTeacher && (
              <GetAllUserInClass
                listOfTeacher={this.state.listOfTeacher}
                goBack={this.setStateToOrigin}
                seeUser={this.seeUser}
              ></GetAllUserInClass>
            )}
            {this.state.getStudent && (
              <GetAllUserInClass
                listOfStudent={this.state.listOfStudent}
                goBack={this.setStateToOrigin}
                seeUser={this.seeUser}
                toggleModalAddStudent={this.toggleModalAddStudent}
                userRoll = {this.props.authenUser.roll}
              ></GetAllUserInClass>
            )}
            <ModalAddTeacher
              isOpen={this.state.modalAddTeacher}
              canADD={this.state.submitTA}
              addTeacher={this.addTeacher}
              onChangeValue={this.onChangeTA}
              TA={this.state.TA}
              onToggle={this.toggleModalAddTeacher}
              teacherDuplicated={this.state.teacherDuplicated}
            ></ModalAddTeacher>
            <ModalAddStudent
              isOpen={this.state.modalAddStudent}
              onToggle={this.toggleModalAddStudent}
              onChangeValue = {this.onChangeStudent}
              student = {this.state.Student}
              addStudent = {this.addStudent}
              studentNotExist = {this.state.studentNotExist}
              studentDuplicated = {this.state.studentDuplicated}
              
            ></ModalAddStudent>
          </>
        )}
      </Container>
    );
  }
}

function ModalAddStudent(props) {
  const { isOpen, onToggle, onChangeValue, student, addStudent, studentNotExist, studentDuplicated  } = props;
  return (
    <>
      <Modal isOpen={isOpen} toggle={onToggle}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLiveLabel">
            Add Student
          </h5>
        </div>
        <div className="modal-body">
          {studentNotExist && (
            <Label style={{ color: "#dc3545" }} className="float-right">
            STUDENT NOT EXIST
            </Label>
          )} 
          {studentDuplicated&& (
            <Label style={{ color: "#dc3545" }} className="float-right">
              DUPLICATED {" "}
            </Label>
          )}
          {(studentNotExist || studentDuplicated)? (
          <Input
            type="text"
            name="text"
            onChange={e => onChangeValue(e.target.value)}
            value={student}
            style={{ border: "1px solid #dc3545" }}
            required={true}
          />
          ) : (
            <Input
              type="text"
              name="text"
              onChange={e => onChangeValue(e.target.value)}
              value={student}
              required={true}
            />
          )}
        </div>
        <div className="modal-footer">
          <div className="left-side">
            <Button
              className="btn-link"
              color="default"
              data-dismiss="modal"
              type="button"
              onClick={addStudent}
            >
              Add
            </Button>
          </div>
          <div className="divider" />
          <div className="right-side">
            <Button
              className="btn-link"
              color="danger"
              type="button"
              onClick={onToggle}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

function GetAllUserInClass(props) {
  const { listOfStudent, seeUser, toggleModalAddStudent, userRoll } = props;
  return (
    <div>
      <h4>List of students in class: </h4>
      <br />
      <ol>
        {listOfStudent &&
          listOfStudent.map((item,index) => (
              <div key={index}>
                <li >
                  <span
                    className="Btn"
                    onClick={() => seeUser(item, "Student")}
                  >
                    {item}
                  </span>
                </li>
                <hr />
              </div>
          ))}
      </ol>
      {userRoll === "Teacher" && <Button
        className="float-right align-center"
        onClick={toggleModalAddStudent}
        style={{ color: "gray" }}
        outline
      >
        Add student
      </Button>}
    </div>
  );
}

function ModalAddTeacher(props) {
  const {
    isOpen,
    onToggle,
    onChangeValue,
    TA,
    addTeacher,
    canADD,
    teacherDuplicated
  } = props;
  return (
    <>
      <Modal isOpen={isOpen} toggle={onToggle}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLiveLabel">
            Add Teaching Assistant
          </h5>
        </div>
        <div className="modal-body">
          {canADD === false && (
            <Label style={{ color: "#dc3545" }} className="float-right">
              TEACHER NOT EXIST
            </Label>
          )}
          {teacherDuplicated === true && (
            <Label style={{ color: "#dc3545" }} className="float-right">
              DUPLICATED{" "}
            </Label>
          )}
          {!canADD || teacherDuplicated === true ? (
            <Input
              type="text"
              name="text"
              onChange={e => onChangeValue(e.target.value)}
              style={{ border: "1px solid #dc3545" }}
              value={TA}
              required={true}
            />
          ) : (
            <Input
              type="text"
              name="text"
              onChange={e => onChangeValue(e.target.value)}
              value={TA}
              required={true}
            />
          )}
        </div>
        <div className="modal-footer">
          <div className="left-side">
            <Button
              className="btn-link"
              color="default"
              data-dismiss="modal"
              type="button"
              onClick={addTeacher}
            >
              Add
            </Button>
          </div>
          <div className="divider" />
          <div className="right-side">
            <Button
              className="btn-link"
              color="danger"
              type="button"
              onClick={onToggle}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default withRouter(GetClass);

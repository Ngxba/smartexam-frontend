import React from "react";
import NavBar from "./Components/NavBar";
import Carousel from "./Components/Carousel";
import "./Style/App.css";
import axios from "axios";
import { Route, withRouter } from "react-router-dom";
import AddQuestion from "./Components/AddQuestion";
import GetQuestion from "./Components/GetQuestion";
import MakeTest from "./Components/MakeTest";
import TakeExam from "./Components/TakeExam";
import { Row, Container } from "reactstrap";
import CreateClass from "./Components/CreateClass";
import GetClass from "./Components/GetClass";
import GetAllClass from "./Components/GetAllClass";
import GetAllTest from "./Components/GetAllTest";
import MarkExam from "./Components/MarkExam";
import ViewTest from "./Components/ViewTest"
// import LandingPage from "./Components/TESTING/paper-kit-react-master/src/views/examples/LandingPage.js";
// import LandingPage from "./Components/TESTING/paper-kit-react-master/src/components/Navbars/IndexNavbar";
import ProfilePage from "./Components/ProfilePage";
class App extends React.Component {
  state = {
    authenUser: {
      isAuthen: false,
      userName: "",
      userEmail: "",
      roll: "",
      address: "",
      officeAddress: "",
      city: "",
      state: "",
      zip: "",
      ModalLogin : false,
    }
  };
  onRegister = async register_data => {
    const response = await axios.post("http://localhost:5000/auth/register", {
      email: register_data.email,
      password: register_data.password,
      name: register_data.name,
      address1: register_data.address1,
      address2: register_data.address2,
      city: register_data.city,
      state: register_data.state,
      zip: register_data.zip,
      agree: register_data.agree,
      roll: register_data.roll
    });
    if (response.status === 200) {
      this.setState({
        authenUser: {
          isAuthen: true,
        userName: register_data.name,
        userEmail: register_data.email,
        roll: register_data.roll,
        address: register_data.address1,
        officeAddress: register_data.address2,
        city: register_data.city,
        state: register_data.state,
        zip: register_data.zip,
        }
      });
    }
    return response;
  };

  onLogOut = () => {
    this.setState({
      authenUser: {
        isAuthen: null,
        userName: "",
        userEmail: "",
        roll: "",
        address: "",
        officeAddress: "",
        city: "",
        state: "",
        zip: "",
      }
    });
    localStorage.setItem("jwt_token", null);
  };

  onLogin = async login_data => {
    const response = await axios.post("http://localhost:5000/auth/login", {
      email: login_data.loginEmail,
      password: login_data.loginPassword
    });

    if (response.status === 200) {
      this.setState({
        authenUser: {
          isAuthen: true,
          userName: response.data.user.name,
          userEmail: response.data.user.email,
          address: response.data.user.address1,
          officeAddress: response.data.user.address2,
          city: response.data.user.city,
          state: response.data.user.state,
          zip: response.data.user.zip,
          roll: response.data.user.roll
        }
      });
      if(login_data.remember_me){localStorage.setItem("jwt_token", response.data.token);}
    }
    return response;
  };
  addQuest = () => {
    this.props.history.push("/addquestion");
  };
  makeTest = () => {
    this.props.history.push("/maketest");
  };
  home = () => {
    this.props.history.push("/");
  };
  getQuest = () => {
    this.props.history.push(`/getallquestion`);
  };
  takeTest = () => {
    this.props.history.push(`/taketest`);
  };
  createClass = () => {
    this.props.history.push(`/createclass`);
  };
  getClass = classCode => {
    this.props.history.push(`/class/get?q=${classCode}`);
  };
  seeOwnedClass = () => {
    this.props.history.push(
      `/class/getallclasses?q=${this.state.authenUser.roll}&&d=${this.state.authenUser.userEmail}`
    );
  };
  TESTUI = () => {
    this.props.history.push(`/TESTUI`);
  };
  getProfilePage = () => {
    this.props.history.push(`/profile`);
  };

  async componentDidMount() {
    const token = localStorage.getItem("jwt_token");
    const response = await this.getCurrentUser(token);
    this.setState({
      authenUser: {
        isAuthen: true,
        userName: response.data.user.name,
        userEmail: response.data.user.email,
        address: response.data.user.address1,
        officeAddress: response.data.user.address2,
        city: response.data.user.city,
        state: response.data.user.state,
        zip: response.data.user.zip,
        roll: response.data.user.roll
      }
    });
  }

  getCurrentUser = async token => {
    const currentUser = await axios.get("http://localhost:5000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return currentUser;
  };
  toggleLogin = () => {
    this.setState({
      ModalLogin : !this.state.ModalLogin
    })
  }
  render() {
    return (
      <div className="d-flex flex-column h-100">
        <NavBar
          submitRegister={this.onRegister}
          submitLogin={this.onLogin}
          isAuthen={this.state.authenUser.isAuthen}
          userInfo={this.state.authenUser}
          logOut={this.onLogOut}
          addQuest={this.addQuest}
          home={this.home}
          getQuest={this.getQuest}
          makeTest={this.makeTest}
          takeTest={this.takeTest}
          createClass={this.createClass}
          seeOwnedClass={this.seeOwnedClass}
          getProfilePage={this.getProfilePage}
          TESTUI = {this.TESTUI}
          ModalLogin = {this.state.ModalLogin}
          toggleLogin = {this.toggleLogin}
        ></NavBar>
        <div className="flex-grow-1">
        <Route exact path="/" render={() => <Carousel authenUser = {this.state.authenUser} openLogin={this.toggleLogin}></Carousel>} />
          {/* <Route exact path="/TESTUI" render={() => <LandingPage></LandingPage>} /> */}
          {this.state.authenUser.isAuthen && (
            <>
            <Route path="/class/get" render={() => <GetClass authenUser = {this.state.authenUser}></GetClass>} />
          <Route
            path="/profile"
            render={() => (
              <ProfilePage
                authenUser={this.state.authenUser}
                seeOwnedClass={this.seeOwnedClass}
              ></ProfilePage>
            )}
          />
          <Route
            path="/class/getallclasses"
            render={() => <GetAllClass getClass={this.getClass}></GetAllClass>}
          />
          <Route
            path="/class/maketest"
            render={() => {
              return <MakeTest authedUser={this.state.authenUser}></MakeTest>;
            }}
          />
          <Route
            exact
            path="/class/getalltest"
            render={() => <GetAllTest authenUser={this.state.authenUser}></GetAllTest>}
          />
          <Route
            exact
            path="/class/getallquestion"
            render={() => <GetQuestion authenUser={this.state.authenUser}></GetQuestion>}
          />
              <Route
                path="/createclass"
                render={() => (
                  <CreateClass
                    authedUser={this.state.authenUser}
                    getClass={this.getClass}
                  ></CreateClass>
                )}
              />
              <Route
                path="/addquestion"
                render={() => <AddQuestion authenUser={this.state.authenUser}></AddQuestion>}
              />
              <Route
                path="/class/addquestion"
                render={() => <AddQuestion authenUser={this.state.authenUser}></AddQuestion>}
              />
              <Route
                path="/maketest"
                render={() => {
                  console.log("aaa");
                  return (
                    <MakeTest authedUser={this.state.authenUser}></MakeTest>
                  );
                }}
              />
              <Route
                exact
                path="/getallquestion"
                render={() => <GetQuestion authenUser={this.state.authenUser}></GetQuestion>}
              />
            </>
          )}
          <>
            <Route
              exact
              path="/taketest"
              render={() => <TakeExam></TakeExam>}
            />
            <Route exact path="/class/taketest" render={() => <TakeExam authedUser={this.state.authenUser}></TakeExam>} />
            <Route exact path="/class/marktest" render={() => <MarkExam authedUser={this.state.authenUser}></MarkExam>} />
            <Route exact path="/class/viewtest" render={() => <ViewTest authedUser={this.state.authenUser}></ViewTest>} />

          </>
          <br />
        </div>
        <footer
          className="footer footer-black footer-white"
          style={{ backgroundColor: "transparent" }}
        >
          <Container>
            <Row>
              <nav className="footer-nav">
                <ul>
                  <li>
                    <a href="#love">Created by love</a>
                  </li>
                  <li>
                    <a href="#blog">Blog</a>
                  </li>
                  <li>
                    <a href="#licenses">Licenses</a>
                  </li>
                </ul>
              </nav>
              <div className="credits ml-auto">
                <span className="copyright">
                  © {new Date().getFullYear()}, made with{" "}
                  <i className="fa fa-heart heart" /> by Lam and Thanh
                </span>
              </div>
            </Row>
          </Container>
        </footer>
      </div>
    );
  }
}

export default withRouter(App);

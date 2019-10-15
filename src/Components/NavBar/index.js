import React from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import Register from "../ModalRegister";
import Login from "../ModalLogin";
import PesonalBar from "../PesonalBar";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false, // bien nay dung de khi thu nho vao thi drop down co hoat dong hay khong
      modalRegister: false,
      modalLogin: false,
      registerSuccessful: "not",
      loginSuccessful: "not",
      personalProfile: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  setModalRegister = () => {
    this.setState({
      modalRegister: !this.state.modalRegister,
      registerSuccessful: "not"
    });
  };

  setModalLogin = () => {
    this.setState({
      loginSuccessful: "not"
    });
    this.props.toggleLogin();
  };
  setPersonalProfile = () => {
    this.setState({
      personalProfile: !this.state.personalProfile
    });
  };

  wantToRegisterOnLogin = () => {
    this.setModalLogin();
    this.setModalRegister();
  };
  onSubmitRegister = async register_data => {
    try {
      const response = await this.props.submitRegister(register_data);
      console.log(response);
      if (response.status === 200) {
        this.setState({
          registerSuccessful: true
        });
        await setTimeout(() => {
          this.setModalRegister();
        }, 600);
      }
    } catch (err) {
      this.setState({
        registerSuccessful: false
      });
    }
  };

  onSubmitLogin = async login_data => {
    try {
      const response = await this.props.submitLogin(login_data);
      if (response.status === 200) {
        this.setState({
          loginSuccessful: true
        });
        await setTimeout(() => {
          this.setModalLogin();
        }, 600);
      }
    } catch (err) {
      this.setState({
        loginSuccessful: false
      });
    }
  };

  onLogOut = () => {
    this.props.logOut();
    this.props.home();
  };

  render() {
    return (
      <div>
        {this.state.isOpen ? (
          <div
            id="bodyClick"
            onClick={() => {
              document.documentElement.classList.toggle("nav-open");
              this.toggle();
            }}
          />
        ) : null}
        <Navbar color="dark" expand="md">
          <Container>
            
              <NavbarBrand
                href="#"
                onClick={this.props.home}
                data-placement="bottom"
              >
                <img
                  className="logo"
                  src="https://blindspot.vn/wp-content/uploads/2019/05/cropped-Final-Final-LOGO-Blind-SpotDone.png"
                  alt="logo"
                />
                <span className="clr-black" onClick={this.props.home}>
                  SmartEXAM
                </span>
              </NavbarBrand>
            
              <Nav className="ml-auto" navbar>
                {/* <NavItem>
                  <NavLink href="#" onClick={this.props.takeTest}>
                    Take test
                  </NavLink>
                </NavItem> */}
                {/* <NavItem>
                  <NavLink href="#" onClick={this.props.TESTUI}>
                    TESTING UI
                  </NavLink>
                </NavItem> */}
                {!this.props.isAuthen ? (
                  <>
                    <NavItem>
                      <NavLink href="#" onClick={this.setModalLogin}>
                        Login
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#" onClick={this.setModalRegister}>
                        Register
                      </NavLink>
                    </NavItem>
                  </>
                ) : (
                  <>
                    {/* {this.props.userInfo.roll === "Teacher" && (
                      <>
                        <NavItem>
                          <NavLink href="#" onClick={this.props.getQuest}>
                            See all Quest
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="#" onClick={this.props.addQuest}>
                            Add Question
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="#" onClick={this.props.createClass}>
                            CREATE A CLASS
                          </NavLink>
                        </NavItem>
                      </>
                    )}
                    {/* <NavItem>
                      <NavLink href="#" onClick={this.props.makeTest}>
                        Make Test
                      </NavLink>
                    </NavItem> */}

                    <PesonalBar
                      logOut={this.onLogOut}
                      visible={this.state.personalProfile}
                      onToggle={this.setPersonalProfile}
                      userInfo={this.props.userInfo}
                      seeOwnedClass={this.props.seeOwnedClass}
                      seeMyProfile={this.props.getProfilePage}
                      createClass = {this.props.createClass}
                      seeAllQuest = {this.props.getQuest}
                      addQuestion = {this.props.addQuest}
                      userRoll = {this.props.userInfo.roll}
                    />
                  </>
                )}
              </Nav>
          </Container>
        </Navbar>
        <Login
          visible={this.props.ModalLogin}
          onToggle={this.setModalLogin}
          submit={this.onSubmitLogin}
          loginStatus={this.state.loginSuccessful}
          wantToRegister={this.wantToRegisterOnLogin}
        ></Login>
        <Register
          visible={this.state.modalRegister}
          onToggle={this.setModalRegister}
          submit={this.onSubmitRegister}
          registerStatus={this.state.registerSuccessful}
        ></Register>
      </div>
    );
  }
}

export default NavBar;

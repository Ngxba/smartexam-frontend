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
  Input,
  Alert,
  Spinner
} from "reactstrap";

import "./style.css";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginEmail: "",
      loginPassword: "",
      remember_me: false,
      loading: false
    };
  }

  onChange = object => {
    this.setState(Object.assign(this.state, object));
  };

  setStatetoOrigin = () => {
    this.setState({
      loginEmail: "",
      loginPassword: "",
      remember_me: false,
      loading : false
    });
  };

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  onLogin = async () => {
    this.toggleLoading();
    setTimeout(async () => {
      await this.props.submit(this.state);
      this.toggleLoading();
      if (this.props.loginStatus === true) {
        this.setStatetoOrigin();
      }
    }, 1000);
  };

  onToggle = () => {
    this.props.onToggle();
    this.setStatetoOrigin();
  };
  render() {
    return (
      <Modal isOpen={this.props.visible} toggle={this.onToggle}>
        <ModalHeader>Login</ModalHeader>
        <ModalBody>
          {this.props.loginStatus === true && (
            <Alert color="success">Login SUCCESSFUL.</Alert>
          )}
          {!this.props.loginStatus && (
            <Alert color="danger">
              Login FALSE. <em>Email or password are incorrect</em>.
            </Alert>
          )}
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                onChange={event => {
                  this.onChange({ loginEmail: event.target.value });
                }}
                value={this.state.loginEmail}
                placeholder="email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="Password">Password</Label>
              <Input
                type="password"
                name="password"
                id="Password"
                placeholder="password"
                onChange={event => {
                  this.onChange({ loginPassword: event.target.value });
                }}
                value={this.state.loginPassword}
              />
            </FormGroup>
            <FormGroup check>
              <Input
                type="checkbox"
                name="check"
                id="Check"
                onChange={event => {
                  this.onChange({ remember_me: !this.state.remember_me });
                }}
                checked={this.state.remember_me}
              />
               <Label check>
                <Input defaultValue="true" type="checkbox" checked={this.state.agree}  onChange={event => {
                      this.onChange({ remember_me: !this.state.remember_me});
                    }} />
                <span className="form-check-sign" />Remember me{" "}
              </Label>
            </FormGroup>
          </Form>

          {this.state.loading ? (
            <div style={{ textAlign: "center" }}>
              <Spinner style={{ width: "3rem", height: "3rem" }} />
            </div>
          ) : (
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <p>
                Don't have an account? <span id="regBtn" onClick={this.props.wantToRegister}>Register now</span>
              </p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
        <br/>
        <br/>
        <br/>
          <Button
            disabled={this.state.loading}
            color="primary"
            onClick={this.onLogin}
          >
            Login
          </Button>{" "}
          <Button style={{marginRight : "1em"}} color="secondary" onClick={this.onToggle}>
            Cancel
          </Button>
          <br/>
        </ModalFooter>
      </Modal>
    );
  }
}

export default Login;

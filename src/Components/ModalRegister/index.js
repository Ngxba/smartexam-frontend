import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Spinner
} from "reactstrap";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      address1: "",
      name: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      agree: false,
      loading: false,
      roll: "Teacher"
    };
  }

  onChange = object => {
    this.setState(Object.assign(this.state, object));
  };
  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  onRegister = async () => {
    this.toggleLoading();
    setTimeout(async () => {
      await this.props.submit(this.state);
      this.toggleLoading();
      if (this.props.registerStatus === true) {
        this.setStatetoOrigin();
      }
    }, 1000);
  };
  setStatetoOrigin = () => {
    this.setState({
      email: "",
      password: "",
      name: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      agree: false,
      roll: "",
      loading : false
    });
  };
  onToggle = () => {
    this.props.onToggle();
    this.setStatetoOrigin();
  };

  render() {
    return (
      <Modal isOpen={this.props.visible} toggle={this.onToggle}>
        <ModalHeader>Register</ModalHeader>
        <ModalBody>
          {this.props.registerStatus === true && (
            <Alert color="success">
              Register <em>your account</em> successful
            </Alert>
          )}
          {!this.props.registerStatus && (
            <Alert color="warning">
              Register <em>your account</em> false
            </Alert>
          )}
          <Form>
            <Row form>
              <Col md={6}>
                  <Label for="Email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="Email"
                    value={this.state.email}
                    onChange={event => {
                      this.onChange({ email: event.target.value });
                    }}
                    placeholder="1213@email.com"
                    required = {true}
                  />
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="Password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="Password"
                    value={this.state.password}
                    onChange={event => {
                      this.onChange({ password: event.target.value });
                    }}
                    placeholder="password"
                    required = {true}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="Name">Name</Label>
              <Input
                type="text"
                name="name"
                id="Name"
                value={this.state.name}
                onChange={event => {
                  this.onChange({ name: event.target.value });
                }}
                placeholder="Your Name"
                required = {true}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Roll">Roll</Label>
              <Input
                name="roll"
                type="select"
                onChange={event => {
                  this.onChange({ roll: event.target.value });
                }}
                required = {true}
              >
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="Address">Address</Label>
              <Input
                type="text"
                name="address"
                id="Address"
                value={this.state.address1}
                onChange={event => {
                  this.onChange({ address1: event.target.value });
                }}
                placeholder="1234 Main St"
                required = {true}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Address2">Office Address</Label>
              <Input
                type="text"
                name="address2"
                id="Address2"
                value={this.state.address2}
                onChange={event => {
                  this.onChange({ address2: event.target.value });
                }}
                placeholder="Apartment, studio, or floor"
                required = {true}
              />
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="City">City</Label>
                  <Input
                    type="text"
                    name="city"
                    id="City"
                    onChange={event => {
                      this.onChange({ city: event.target.value });
                    }}
                    value={this.state.city}
                    required = {true}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="State">State</Label>
                  <Input
                    type="text"
                    name="state"
                    id="State"
                    onChange={event => {
                      this.onChange({ state: event.target.value });
                    }}
                    value={this.state.state}
                    required = {true}
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="Zip">Zip</Label>
                  <Input
                    type="text"
                    name="zip"
                    id="Zip"
                    value={this.state.zip}
                    onChange={event => {
                      this.onChange({ zip: event.target.value });
                    }}
                    required = {true}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup check>
              <Input
                type="checkbox"
                name="check"
                id="Check"
                checked={this.state.agree}
                onChange={event => {
                  this.onChange({ agree: !this.state.agree });
                }}
              />
              <Label check>
                <Input defaultValue="true" type="checkbox" checked={this.state.agree}  onChange={event => {
                      this.onChange({ agree: !this.state.agree});
                    }} />
                <span className="form-check-sign" />I agree with the{" "}
                <a href="/term" className="alert-link">
                  term
                </a>
              </Label>
            </FormGroup>
          </Form>
          {this.state.loading && (
            <div style={{ textAlign: "center" }}>
              <Spinner style={{ width: "3rem", height: "3rem" }} />
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
            onClick={this.onRegister}
          >
            Register
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

export default Register;

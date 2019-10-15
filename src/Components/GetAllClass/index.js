import React from "react";
import {
  Card,
  //   CardImg,
  //   CardText,
  CardBody,
  CardTitle,
  //   CardSubtitle,
  Button,
  Media,
  Container,
  Row,
  Spinner
} from "reactstrap";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { getOwnedClass } from "../../Action/class";

class GetAllClass extends React.Component {
  state = {
    listOwnedClass: [],
    loading: false
  };
  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };
  fetchClassResult = async () => {
    {
      const rollOfUser = queryString.parse(this.props.location.search).q; //roll of teacher
      const emailOfUser = queryString.parse(this.props.location.search).d;
      this.toggleLoading();
      setTimeout(async () => {
        try {
          const response = await getOwnedClass(rollOfUser, emailOfUser);
          this.setState({
            listOwnedClass: response
          });
        } catch (err) {
          console.log("get class err");
        }
        this.toggleLoading();
      }, 1000);
    }
  };
  async componentDidMount() {
    this.fetchClassResult();
  }
  render() {
    return (
      <Container>
        <div style={{ height: "3em" }}></div>
        {this.state.loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner style={{ width: "3rem", height: "3rem" }} />
          </div>
        ) : (
          <>
            {this.state.listOwnedClass.length === 0 && (
              <h2>You haven't participate in any class yet !</h2>
            )}
            {this.state.listOwnedClass.map((item, index) => {
              return (
                <ClassForm
                  key={index}
                  classCode={item.classCode}
                  teacher={item.listOfTeacher[0]}
                  totalStudentsNumber={item.listOfStudent.length}
                  getClass={this.props.getClass}
                ></ClassForm>
              );
            })}
          </>
        )}
      </Container>
    );
  }
}

function ClassForm(props) {
  const { classCode, teacher, totalStudentsNumber, getClass } = props;
  return (
    <div>
      <Card>
        <CardTitle>
          <Button
            onClick={() => getClass(classCode)}
            style={{ width: "100%", height: "4em" }}
          >
            {" "}
            <p className="float-left">
              <strong>Class : {classCode}</strong>
            </p>
            <i className="fas fa-arrow-right float-right mt-2"></i>
          </Button>
        </CardTitle>
        <CardBody>
          <Media>
            {/* <Media left href="#">
              <i className="fas fa-user fa-5x"></i>
            </Media> */}
            <Media body>
              {/* <Row>Môn học :</Row><br/> */}
              <br />
              <Row>
                <i className="fas fa-user-friends fa-lg mr-2 ml-3"></i>Number of students : {totalStudentsNumber}
              </Row>{" "}
              <br />
              <Row>
                <i className="fas fa-briefcase fa-lg mr-2 ml-3"></i>Main Teacher: {teacher}
              </Row>{" "}
              <br />
            </Media>
          </Media>
        </CardBody>
      </Card>
    </div>
  );
}

export default withRouter(GetAllClass);

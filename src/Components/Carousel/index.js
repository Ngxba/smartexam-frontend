import React, { Component } from 'react';
import {Container, Button, Row, Col} from "reactstrap"
import "./index.css"

class CAROUSEL extends Component {
  render() {
    return(<div className="d-flex flex-column justify-content-center align-content-center h-100">
  <video poster="https://us.123rf.com/450wm/sedatseven/sedatseven1601/sedatseven160100036/51502027-m%C3%A0u-x%C3%A1m-%C4%91en-gradient-n%E1%BB%81n-tr%E1%BB%ABu-t%C6%B0%E1%BB%A3ng-d%E1%BB%B1ng-h%C3%ACnh-%C4%91%E1%BB%83-tr%C6%B0ng-b%C3%A0y-montage-s%E1%BA%A3n-ph%E1%BA%A9m-c%E1%BB%A7a-b%E1%BA%A1n.jpg?ver=6"  id="bgvid" playsInline autoPlay muted loop>
  <source src="https://storage.coverr.co/videos/Working-it?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjExNDMyN0NEOTRCMUFCMTFERTE3IiwiaWF0IjoxNTcxMDY1MzkxfQ.qqR5IQ4NFfuPtR6KtG0TbPdTRDXhd-QrjdfQimSWbYA" type="video/mp4"/>
  Your browser does not support the video tag.
  </video>
  
  <>
      <div className="main">
        <div className="section text-center" style={{background : "transparent"}}>
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h1 className="title" style={{color : "#F5F5F5", textDecoration: "underline"}}>SMART EXAM</h1>
                <h5 className="description" style={{color : "#F5F5F5"}}>
                 <br/>
                  <hr/>
                  <strong>"WE HERE TO HELP"</strong>  
                </h5>
                <br />
                {!this.props.authenUser.isAuthen &&<Button
                  className="btn-round"
                  color="info"
                  onClick={this.props.openLogin}
                >
                  SIGN IN
                </Button>}
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info grow grow">
                    <i className="nc-icon nc-album-2" />
                  </div>
                  <div className="description">
                    <h4 style={{color : "white"}} className="info-title">Full control</h4>
                    {/* <p style={{color : "white"}} className="description">
                      Spend your time generating new ideas. You don't have to
                      think of implementing.
                    </p> */}
                    {/* <Button className="btn-link" color="info" href="#pablo">
                      See more
                    </Button> */}
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info grow">
                    <i className="nc-icon nc-bulb-63" />
                  </div>
                  <div className="description">
                    <h4 style={{color : "white"}} className="info-title">User friendly</h4>
                    {/* <p style={{color : "white"}} className="description" >
                      Larger, yet dramatically thinner. More powerful, but
                      remarkably power efficient.
                    </p> */}
                    {/* <Button className="btn-link" color="info" href="#pablo">
                      See more
                    </Button> */}
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info grow">
                    <i className="nc-icon nc-chart-bar-32" />
                  </div>
                  <div className="description">
                    <h4 style={{color : "white"}} className="info-title">Statistics</h4>
                    {/* <p style={{color : "white"}} className="description">
                      Choose from a veriety of many colors resembling sugar
                      paper pastels.
                    </p> */}
                    {/* <Button className="btn-link" color="info" href="#pablo">
                      See more
                    </Button> */}
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info grow">
                    <i className="nc-icon nc-sun-fog-29" />
                  </div>
                  <div className="description">
                    <h4 style={{color : "white"}} className="info-title">Delightful design</h4>
                    {/* <p style={{color : "white"}} className="description">
                      Find unique and handmade delightful designs related items
                      directly from our sellers.
                    </p> */}
                    {/* <Button className="btn-link" color="info" href="#pablo">
                      See more
                    </Button> */}
                  </div>
                </div>
              </Col>
            </Row>
            <br/>
            <br/>
            <br/>
            <h6 style={{color:"#F5F5F5"}}>"Smart Exam was created in order to help students, teachers, lectures connect together and work in the most effective way. <br/>
                  In Smart Exam, we understand the struggle."</h6>
          </Container>
        </div>
      </div>
    </>
    </div>)
  }
}


export default CAROUSEL;
import React, { Component } from 'react'
import queryString from "query-string"
import { withRouter } from "react-router-dom"
import { getTest, deleteTest, getTakenTest } from "../../Action/class"
import {
    Button,
    Container,
    Table,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Spinner
} from "reactstrap";
import { getListQuest } from "../../Action/getQuest"
import QuestItem from "../QuestItem"

class GetAllTest extends Component {

    state = {
        listTest: [],
        listQuest: [],
        modalListQuest: false,
        testNum: 0,
        loading: false,
    }

    toggleLoading = () => {
        this.setState({
            loading: !this.state.loading
        });
    };

    onDeleteTest = async (testID) => {
        await deleteTest(testID)
        // var quests= this.state.listQuest
        // quests.filter(item => item._id !== testID)
        this.setState({
            listTest: this.state.listTest.filter(item => item._id !== testID)
        })
    }

    toggleModalListQuest = () => {
        this.setState({
            modalListQuest: !this.state.modalListQuest
        })
    }

    onGetListQuest = async (listOfQuizQuest, listOfEssayQuest, testNum) => {
        const res = await getListQuest(listOfQuizQuest, listOfEssayQuest)
        this.setState({
            listQuest: res,
            testNum: testNum
        })
        this.toggleModalListQuest()
    }

    onDeleteListQuest = () => {
        this.setState({
            listQuest: []
        })
        this.toggleModalListQuest()
    }

    fetchAllTest = async () => {
        this.toggleLoading()
        const classCode = queryString.parse(this.props.location.search).q
        setTimeout(async () => {
            try {
                const response = await getTest(classCode)
                this.setState({
                    listTest: response
                })
            } catch (err) {
                console.log(err.message)
            }
            this.toggleLoading()
        }, 500)
    }

    componentDidMount() {
        this.fetchAllTest()
    }

    takeTest = async (testID, student) => {
        const classCode = queryString.parse(this.props.location.search).q
        const takenTests = await getTakenTest(testID)
        if (takenTests.test.length === 0) {
            if (takenTests.test.filter(item => item.studentEmail === student))
                this.props.history.push(`/class/taketest?q=${testID}&&c=${classCode}`)
        } else {

        }
    }

    markTest = testID => {
        const classCode = queryString.parse(this.props.location.search).q
        this.props.history.push(`/class/marktest?q=${testID}&&c=${classCode}`)
    }

    viewTest = (testID, testTitle) => {
        const classCode = queryString.parse(this.props.location.search).q
        this.props.history.push(`/class/viewtest?q=${testID}&&c=${classCode}&&t=${testTitle}`)
    }

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
                            <h3 style={{ textAlign: "center" }}>
                                Attention, this is list of exam in Class: "{queryString.parse(this.props.location.search).q}"
                            </h3>
                            <br />
                            <hr />
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Test Title</th>
                                        <th>Teacher</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.listTest.map((item, index) => {
                                        return <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.title}</td>
                                            <td>{item.authedUser.userName}</td>
                                            <td>
                                                <Button
                                                    outline
                                                    className="float-left"
                                                    color="warning"
                                                    style={{ marginRight: 5, borderRadius: 50 }}
                                                    onClick={() => this.viewTest(item._id, item.title)}
                                                >View test
                                    </Button>
                                                {this.props.authenUser.roll === "Teacher" && <>
                                                    <Button
                                                        outline
                                                        className="float-left"
                                                        color="success"
                                                        style={{ marginRight: 5, borderRadius: 50 }}
                                                        onClick={() => this.markTest(item._id)}
                                                    >Marking
                                    </Button>
                                                    <Button
                                                        className="float-right"
                                                        color="primary"
                                                        style={{ marginRight: 5, borderRadius: 50 }}
                                                        onClick={() => this.onGetListQuest(item.listOfQuizQuest, item.listOfEssayQuest, index)}
                                                        outline
                                                    ><i className="far fa-eye"></i>
                                                    </Button>
                                                    <Button
                                                        outline
                                                        className="float-right"
                                                        color="danger"
                                                        style={{ marginRight: 5, borderRadius: 50 }}
                                                        onClick={() => this.onDeleteTest(item._id)}
                                                    ><i className="fas fa-trash"></i>
                                                    </Button>
                                                </>}

                                                {this.props.authenUser.roll === "Student" && <><Button
                                                    outline
                                                    className="float-left"
                                                    color="primary"
                                                    style={{ marginRight: 5, borderRadius: 50 }}
                                                    onClick={() => this.takeTest(item._id, this.props.authenUser.userName)}
                                                >Take Exam
                                    </Button></>}

                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                                <ModalListQuest
                                    testNum={this.state.testNum}
                                    isOpen={this.state.modalListQuest}
                                    onToggle={this.toggleModalListQuest}
                                    onCancel={this.onDeleteListQuest}
                                    listQuest={this.state.listQuest}
                                    authenUser={this.props.authenUser}
                                />
                            </Table>
                        </Container>
                    )}
            </div>
        )
    }
}

export default withRouter(GetAllTest)

function ModalListQuest(props) {
    const { isOpen, onToggle, onCancel, listQuest, testNum, authenUser } = props

    return (
        <Modal isOpen={isOpen} toggle={onCancel} style={{ minWidth: "70vh" }} >
            <ModalHeader toggle={onCancel}>Test number: {testNum + 1}</ModalHeader>
            <ModalBody>
                {listQuest[0] && <>
                    <h3 style={{ textAlign: "center" }}>
                        Quiz questions:
                    </h3>
                    <br />
                    <hr />
                    {listQuest[0].map((item, index) => {
                        return <QuestItem
                            key={index}
                            data={item}
                            numberOfQuizQuest={index + 1}
                            authenUser={authenUser}
                        />
                    })}
                </>}
                {listQuest[1] && <>
                    <h3 style={{ textAlign: "center" }}>
                        Essay questions:
                    </h3>
                    <br />
                    <hr />
                    {listQuest[1] && listQuest[1].map((item, index) => {
                        return <QuestItem
                            key={index}
                            data={item}
                            numberOfQuizQuest={index + 1}
                            authenUser={authenUser}
                        />
                    })}
                </>}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onToggle}>Save</Button>{' '}
                <Button className="m-2" color="secondary" onClick={onCancel}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}
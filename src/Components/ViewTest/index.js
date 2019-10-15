import React, { Component } from 'react'
import queryString from "query-string"
import { withRouter } from "react-router-dom"
import { getTakenTest } from "../../Action/class"
import {
    Button,
    Container,
    Table,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import { Essay, Quiz } from "../MarkExam"

class ViewTest extends Component {

    state = {
        takenTestList: [],
        modalListQuest: false,
        testNum: 0
    }

    onShowModal = testNum => {
        this.setState(Object.assign(this.state, {
            testNum: testNum
        }))
        this.toggleModalListQuest()
    }

    toggleModalListQuest = () => {
        this.setState({
            modalListQuest: !this.state.modalListQuest
        })
    }

    fetchData = async () => {
        const testID = queryString.parse(this.props.location.search).q
        const takenTests = await getTakenTest(testID)
        this.setState(Object.assign(this.state, {
            takenTestList: takenTests.test
        }))
    }

    componentDidMount() {
        this.fetchData()
    }
    render() {
        console.log(this.state)
        return (
            <Container>
                <h3 style={{ textAlign: "center" }}>
                    Attention, you are viewing test result of all students from Class: "{queryString.parse(this.props.location.search).c}"
                </h3>
                <br />
                <hr />
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Test Title</th>
                            <th>Student</th>
                            <th>Quiz score</th>
                            <th>Essay score</th>
                            <th>Overall score</th>
                            <th>Status</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.takenTestList.map((item, index) => {
                            return <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{queryString.parse(this.props.location.search).t}</td>
                                <td>{item.studentName}</td>
                                <td>{item.quizScore * 5}</td>
                                <td>{item.essayScore}</td>
                                <td>{item.quizScore * 5 + item.essayScore}</td>
                                <td>{item.isMarked ? "graded" : "Not graded"}</td>
                                <td>
                                    <Button
                                        outline
                                        className="float-left"
                                        color="primary"
                                        style={{ marginRight: 5, borderRadius: 50 }}
                                        onClick={() => this.onShowModal(index)}
                                    >view Answer
                                    </Button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                <ModalListQuest
                    testNum={this.state.testNum}
                    isOpen={this.state.modalListQuest}
                    onToggle={this.toggleModalListQuest}
                    listQuest={this.state.takenTestList[this.state.testNum]}
                />
            </Container>
        )
    }
}


export default withRouter(ViewTest)

function ModalListQuest(props) {
    const { isOpen, onToggle, listQuest, testNum } = props

    return (
        <Modal isOpen={isOpen} toggle={onToggle} style={{minWidth: "90vh"}}>
            <ModalHeader toggle={onToggle}>Test NO: {testNum + 1}</ModalHeader>
            <ModalBody>
                {listQuest !== undefined && listQuest.quest.map((item, index) => {
                    if (item.model === "quiz") {
                        return <div key={index}>
                            <h3 style={{ textAlign: "center" }}>
                                Quiz:
                            </h3>
                            <br />
                            <hr />
                            <Quiz
                                data={item}
                                numberOfQuest={index + 1}
                                onScoreChange={() => { }}
                            />
                        </div>
                    } else {
                        return <div key={index}>
                            <h3 style={{ textAlign: "center" }}>
                                Essay:
                            </h3>
                            <br />
                            <hr />
                            <Essay
                                data={item}
                                numberOfQuest={index + 1}
                                onCommentChange={() => { }}
                                onScoreChange={() => { }}
                            />
                        </div>
                    }
                })}
            </ModalBody>
            <ModalFooter>
                <Button className="m-2" color="secondary" onClick={onToggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}
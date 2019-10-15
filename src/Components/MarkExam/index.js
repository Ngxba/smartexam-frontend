import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import {
    getTakenTest,
    getClass,
    markTakenTest
} from "../../Action/class"
import {
    Container,
    Button,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    CardText,
    CardTitle,
    CardSubtitle,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "reactstrap"
import queryString from "query-string";
import { Scrollbars } from 'react-custom-scrollbars';


class MarkExam extends Component {

    state = {
        isDropdownOpen: false,
        listStudent: [],
        listTest: [],
        displayTest: {
            student: "",
            listQuiz: [],
            listEssay: [],
            model: "essay",
            quizScore: 0,
            essayScore: 0
        }
    }

    onSubmit = async () => {
        try {
            const test = this.state.listTest.filter(item => item.studentEmail === this.state.displayTest.student)[0]
            console.log(test)
            await markTakenTest(test._id, this.state.displayTest.quizScore, this.state.displayTest.essayScore, test.quest)
            this.setState(Object.assign(this.state, {
                listTest: this.state.listTest.map(item => {
                    if (item.studentEmail === this.state.displayTest.student) {
                        item.isMarked = true;
                    }
                    return item
                })
            }))
        } catch (err) {
            console.log(err.message)
        }
    }

    onScoreChange = (questIndex, model, score) => {
        if (model === "essay") {
            let tempScore1 = 0;
            let essay = this.state.displayTest.listEssay.map((item, index) => {
                if (index === questIndex - 1 && score <= 10) {
                    item.score = Number(score)
                } else if (index === questIndex - 1) {
                    item.score = 10
                }
                tempScore1 = tempScore1 + item.score
                return item
            })
            this.setState({
                displayTest: {
                    student: this.state.displayTest.student,
                    listQuiz: this.state.displayTest.listQuiz,
                    listEssay: essay,
                    model: this.state.displayTest.model,
                    quizScore: this.state.displayTest.quizScore,
                    essayScore: tempScore1
                }
            })
        } else {
            let tempScore = 0;
            let quiz = this.state.displayTest.listQuiz.map((item, index) => {
                if (index === questIndex - 1 && score <= 1) {
                    item.score = Number(score)
                } else if (index === questIndex - 1) {
                    item.score = 1
                }
                tempScore = tempScore + item.score
                return item
            })
            this.setState({
                displayTest: {
                    student: this.state.displayTest.student,
                    listQuiz: quiz,
                    listEssay: this.state.displayTest.listEssay,
                    model: this.state.displayTest.model,
                    quizScore: tempScore,
                    essayScore: this.state.displayTest.essayScore
                }
            })
        }
    }

    onCommentChange = (essayIndex, comment) => {
        let essay = this.state.displayTest.listEssay.map((item, index) => {
            if (index === essayIndex - 1) item.essayComment = comment
            return item
        })
        this.setState({
            student: this.state.displayTest.student,
            listQuiz: this.state.displayTest.listQuiz,
            listEssay: essay,
            model: this.state.displayTest.model,
            quizScore: this.state.displayTest.quizScore,
            essayScore: this.state.displayTest.essayScore
        })
    }

    onModelChange = model => {
        this.setState(Object.assign(this.state.displayTest, model))
    }

    nextDisplayTest = student => {
        if (this.state.listStudent.indexOf(student) < this.state.listStudent.length - 1) {
            this.onToggleDisplayTest(this.state.listStudent[this.state.listStudent.indexOf(student) + 1])
        }
    }

    preDisplayTest = student => {
        if (this.state.listStudent.indexOf(student) > 0) {
            this.onToggleDisplayTest(this.state.listStudent[this.state.listStudent.indexOf(student) - 1])
        }
    }

    onToggleDropDown = () => {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen
        })
    }

    onToggleDisplayTest = student => {
        const studentTest = this.state.listTest.filter(item => item.studentEmail === student)
        this.setState(Object.assign(this.state.displayTest, {
            student: student,
            listQuiz: studentTest.length > 0 ? studentTest[0].quest.filter(item => item.model === "quiz") : [],
            listEssay: studentTest.length > 0 ? studentTest[0].quest.filter(item => item.model === "essay") : [],
            quizScore: studentTest.length > 0 ? studentTest[0].quizScore : 0,
            essayScore: studentTest.length > 0 ? studentTest[0].essayScore : 0
        }))
    }

    fetchData = async () => {
        const testID = queryString.parse(this.props.location.search).q
        const classID = queryString.parse(this.props.location.search).c
        let takenTestList = [], fetchedClass = []
        try {
            takenTestList = await getTakenTest(testID)
            fetchedClass = await getClass(classID)
        } catch (err) {
            console.log(err.message)
        }
        this.setState({
            listStudent: fetchedClass.listOfStudent,
            listTest: [...takenTestList.test],
            displayTest: {
                student: takenTestList.test.length > 0 ? takenTestList.test[0].studentEmail : "NO STUDENT FOUND",
                listQuiz: takenTestList.test.length > 0 ? takenTestList.test[0].quest.filter(item => item.model === "quiz") : [],
                listEssay: takenTestList.test.length > 0 ? takenTestList.test[0].quest.filter(item => item.model === "essay") : [],
                model: "essay",
                quizScore: takenTestList.test.length > 0 ? takenTestList.test[0].quizScore : 0,
                essayScore: takenTestList.test.length > 0 ? takenTestList.test[0].essayScore : 0
            }
        })
    }

    componentDidMount() {
        this.fetchData();
    }
    render() {
        console.log(this.state)
        return (
            <Container className="d-flex justify-content-center">
                <Card
                    className="mt-5 d-flex"
                    style={{
                        minWidth: "100%",
                        minHeight: "80vh",
                        WebkitTransform: "translateY(0px)"
                    }}
                >
                    <CardHeader
                        className="d-flex justify-content-between"
                        style={{
                            minHeight: "8vh"
                        }}
                    >
                        <Button
                            onClick={() => this.preDisplayTest(this.state.displayTest.student)}
                        ><i className="fas fa-arrow-left"></i></Button>
                        <Dropdown isOpen={this.state.isDropdownOpen} toggle={this.onToggleDropDown} >
                            <DropdownToggle caret>
                                <span className="pr-2" style={{ fontSize: "1.5em" }}>{this.state.displayTest.student}</span>
                            </DropdownToggle>
                            <DropdownMenu
                                modifiers={{
                                    setMaxHeight: {
                                        enabled: true,
                                        order: 890,
                                        fn: (data) => {
                                            return {
                                                ...data,
                                                styles: {
                                                    ...data.styles,
                                                    overflow: 'auto',
                                                    maxHeight: 250,
                                                },
                                            };
                                        },
                                    },
                                }}
                            >
                                {this.state.listStudent.map((item, index) => {
                                    return <DropdownItem key={index} onClick={() => this.onToggleDisplayTest(item)}>{item}</DropdownItem>
                                })}
                            </DropdownMenu>
                        </Dropdown>
                        <Button
                            onClick={() => this.nextDisplayTest(this.state.displayTest.student)}
                        ><i className="fas fa-arrow-right"></i></Button>
                    </CardHeader>
                    <CardBody className="row" style={{ paddingTop: "initial", paddingBottom: "initial" }}>
                        <CardBody
                            className="col-8"
                            style={{ minHeight: "60vh" }}
                        >
                            <Scrollbars
                                universal
                                autoHide
                                // Hide delay in ms
                                autoHideTimeout={1500}
                                // Duration for hide animation in ms.
                                autoHideDuration={800}
                                style={{ height: "70vh" }}
                            >
                                {this.state.displayTest.listEssay.length > 0
                                    ?
                                    <div className="pl-2 pr-4">
                                        {this.state.displayTest.model === "essay"
                                            ?
                                            <>
                                                {this.state.displayTest.listEssay.map((item, index) => {
                                                    return <Essay
                                                        key={index}
                                                        data={item}
                                                        numberOfQuest={index + 1}
                                                        onCommentChange={this.onCommentChange}
                                                        onScoreChange={this.onScoreChange}
                                                    />
                                                })}
                                            </>
                                            :
                                            <>
                                                {this.state.displayTest.listQuiz.map((item, index) => {
                                                    return <Quiz
                                                        key={index}
                                                        data={item}
                                                        numberOfQuest={index + 1}
                                                        onScoreChange={this.onScoreChange}
                                                    />
                                                })}
                                            </>
                                        }
                                    </div>
                                    :
                                    <h3 style={{ textAlign: "center" }}>No Submission found</h3>
                                }

                            </Scrollbars>
                        </CardBody>
                        <CardBody
                            className="col-4"
                            style={{
                                minHeight: "72vh",
                                borderLeft: "1px solid rgba(0, 0, 0, 0.125)",
                                padding: "inherit"
                            }}
                        >
                            <CardHeader className="row text-align-center" style={{ backgroundColor: "#fff" }}>
                                <Button
                                    className="col m-1"
                                    onClick={() => this.onModelChange({ model: "quiz" })}
                                >quiz</Button>
                                <Button
                                    className="col m-1"
                                    onClick={() => this.onModelChange({ model: "essay" })}
                                >Essay</Button>
                            </CardHeader>
                            <CardBody
                                style={{
                                    height: "57vh",
                                    marginRight: "-15px",
                                    marginLeft: "-15px",
                                    marginBottom: "10px",
                                    borderBottom: "1px solid rgba(0, 0, 0, 0.125)",
                                }}
                            >
                                <h2>Test Info</h2>
                                <br />
                                <ul>
                                    <li><p>Test duration: </p></li>
                                    <br />
                                    <li><p>Quiz Score: {this.state.displayTest.quizScore * 5}</p></li>
                                    <li><p>Essay Score: {this.state.displayTest.essayScore}</p></li>
                                    <hr />
                                    <li><p>Overall Score: {this.state.displayTest.quizScore * 5 + this.state.displayTest.essayScore}</p></li>
                                </ul>
                                <p>*Note: Overall Score = ( Quiz score x 5 ) + Essay Score</p>
                            </CardBody>
                            <CardFooter
                                className="d-flex justify-content-center"
                            >
                                <Button
                                    onClick={this.onSubmit}
                                    disabled={
                                        this.state.listTest.length > 0 && this.state.listTest.filter(item => item.studentEmail === this.state.displayTest.student)[0] !== undefined
                                            ?
                                            this.state.listTest.filter(item => item.studentEmail === this.state.displayTest.student)[0].isMarked
                                            :
                                            true
                                    }
                                >
                                    {this.state.listTest.filter(item => item.studentEmail === this.state.displayTest.student)[0] !== undefined
                                    ?
                                    <span>
                                        {this.state.listTest.filter(item => item.studentEmail === this.state.displayTest.student)[0].isMarked
                                        ?
                                        "Marked"
                                        :
                                        "Mark this test"
                                        }
                                    </span>
                                    :
                                    <span>Can't mark this test</span>
                                    }
                                </Button>
                            </CardFooter>
                        </CardBody>
                    </CardBody>
                </Card>
            </Container>
        )
    }
}

export default withRouter(MarkExam)

export function Essay(props) {
    const { numberOfQuest, data, onCommentChange, onScoreChange } = props;

    return (
        <Card>
            <CardBody>
                <CardTitle className="row">
                    <h5 className="col-10 col-md-9" style={{ display: "inline-block" }}>
                        Essay NO: {numberOfQuest}
                    </h5>
                    <InputGroup className="col-4 col-md-3">
                        <Input
                            placeholder="Score"
                            min={0}
                            max={10}
                            type="number"
                            step="1"
                            value={data.score}
                            onChange={e => onScoreChange(numberOfQuest, "essay", e.target.value)}
                        />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>/10</InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </CardTitle>
                <hr />
                <CardSubtitle>
                    <h6>
                        <em>Question: </em>
                    </h6>
                    <p>{data.essayQuestionContent}</p>
                </CardSubtitle>
                <hr />
                <CardSubtitle>
                    <h6><em>Student's Answer :</em>
                    </h6>
                    {data.userAnswer !== "" ? <p>{data.userAnswer}</p> : <p style={{ color: "red" }}>NO ANSWER FOUND</p>}
                </CardSubtitle>
                <hr /><CardText>Sample Answer : </CardText>
                <CardText>{data.modelEssayQuestionAnswer}</CardText>
                <CardText>Teacher's comment: </CardText>
                <Input
                    type="textarea"
                    name="text"
                    rows="5"
                    value={data.essayComment}
                    onChange={e => onCommentChange(numberOfQuest, e.target.value)}
                />
            </CardBody>
        </Card>
    )
}

export function Quiz(props) {
    const { numberOfQuest, data, onScoreChange } = props;
    return (
        <div>
            <Card>
                <CardBody style={{ minHeight: "45vh" }}>
                    <CardTitle className="row">
                        <h5 className="col-10 col-md-9" style={{ display: "inline-block" }}>
                            Quiz NO: {numberOfQuest}
                        </h5>
                        <InputGroup className="col-4 col-md-3">
                            <Input
                                placeholder="Score"
                                min={0}
                                max={1}
                                type="number"
                                step="1"
                                value={data.score}
                                onChange={e => onScoreChange(numberOfQuest, "quiz", e.target.value)}
                            />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>/1</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </CardTitle>
                    <hr />
                    <CardSubtitle>
                        <h6>
                            <em>Question: </em>
                        </h6>
                        <p>{data.QuizQuestionContent}</p>
                    </CardSubtitle>
                    <hr />
                    <CardSubtitle>
                        <h6>
                            <em>Right Answer: </em>
                        </h6>
                        <p>{data.rightAnswer}</p>
                    </CardSubtitle>
                    <hr />
                    <CardText>
                        Student's answer: {data.userAnswer === "" && <span style={{ color: "red" }}>NO ANSWER FOUND</span>}
                    </CardText>
                    {data.Answers.map(answer => {
                        return (
                            <div key={answer._id}>
                                <input
                                    type="radio"
                                    name={data._id}
                                    onChange={() => { }}
                                    checked={data.userAnswer === answer.value}
                                />
                                {" "}{answer.value}
                            </div>
                        );
                    })}
                </CardBody>
            </Card>
        </div>
    );
}
import React, { Component } from 'react'
import {
    Card,
    CardBody,
    CardSubtitle,
    CardTitle,
    CardText,
    Button,
    Input,
    Form,
    FormGroup,
    Alert
} from "reactstrap";
import { editEssayQuest } from "../../../Action/editQuest"

export default class editEssay extends Component {
    preEssay = {
        Answers: this.props.data.Answers,
        checked: this.props.data.checked,
        essayQuestionContent: this.props.data.essayQuestionContent,
        model: this.props.data.model,
        modelEssayQuestionAnswer: this.props.data.modelEssayQuestionAnswer,
        _id: this.props.data._id
    }
    state = {
        essay: this.props.data,
        editStatus: true
    }

    onChange = object => {
        this.setState(Object.assign(this.state.essay, object));
    };

    onSubmit = async e => {
        e.preventDefault()
        try {
            await editEssayQuest(
                this.state.essay._id,
                this.state.essay.model,
                this.state.essay.essayQuestionContent,
                this.state.essay.modelEssayQuestionAnswer
            )
            this.props.onEdit()
        } catch (err) {
            this.setState({
                editStatus: false
            });
            let alert = document.getElementById("alert")
            alert.scrollIntoView()
            setTimeout(() => {
                this.setState({
                    editStatus: true
                });
            }, 3000);
        }
    }


    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        {this.state.editStatus === false && (
                            <Alert id="alert" color="danger">
                                <p>CAN NOT EDIT</p>
                                <p>QUESTION ALREADY EXISTED</p>
                            </Alert>
                        )}
                        <CardTitle>
                            <h5 style={{ display: "inline-block" }}>
                                Essay question number: {this.props.numberOfQuest}
                            </h5>
                        </CardTitle>
                        <hr />
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <CardSubtitle>
                                    <h6><em>Read the question and write down the answer</em></h6>
                                    <Input
                                        type="textarea"
                                        name="text"
                                        id="essayQuestion"
                                        rows="3"
                                        value={this.state.essay.essayQuestionContent}
                                        onChange={event => {
                                            this.onChange({
                                                essayQuestionContent: event.target.value
                                            });
                                        }}
                                        required={true}
                                    />
                                </CardSubtitle>
                                <hr />
                                <CardText>Sample Answer: </CardText>
                                <Input
                                    type="textarea"
                                    name="text"
                                    id="essayQuestion"
                                    rows="3"
                                    value={this.state.essay.modelEssayQuestionAnswer}
                                    onChange={event => {
                                        this.onChange({
                                            modelEssayQuestionAnswer: event.target.value
                                        });
                                    }}
                                    required={true}
                                />
                                <br />
                                {" "}<Button
                                    outline
                                    type="submit"
                                    className="float-right"
                                    color="success"
                                    style={{ marginRight: 5, borderRadius: 50 }}
                                ><i className="fas fa-check"></i>
                                </Button>
                                <Button
                                    outline
                                    className="float-right"
                                    color="danger"
                                    style={{ marginRight: 5, borderRadius: 50 }}
                                    onClick={() => { this.props.onEdit(); this.onChange(this.preEssay) }}
                                ><i className="fas fa-times"></i>
                                </Button>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

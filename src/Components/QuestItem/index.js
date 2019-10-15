import React, { Component } from "react";
import Essay from "./essay";
import Quiz from "./quiz";
import EditQuiz from "./Edit/editQuiz"
import EditEssay from "./Edit/editEssay"

class QuestItem extends Component {

  state = {
    isEdited : false
  }

  onEdit = () => {
    this.setState({
      isEdited: !this.state.isEdited
    })
  }

  render() {
    // console.log(this.props.data)
    return (
      <div>
                        
        {this.props.data.model === "quiz" && (
          this.state.isEdited 
          ?
          <EditQuiz
          data={this.props.data}
          numberOfQuest={this.props.numberOfQuizQuest}
          onEdit={this.onEdit}
          /> 
          :
          <Quiz
            authenUser = {this.props.authenUser}
            data={this.props.data}
            numberOfQuest={this.props.numberOfQuizQuest}
            onSelect={this.props.onSelect}
            selected={this.props.selected}
            onEdit={this.onEdit}
          ></Quiz>
        )}
        {this.props.data.model === "essay" && (
          this.state.isEdited 
          ?
          <EditEssay
            data={this.props.data}
            numberOfQuest={this.props.numberOfEssayQuest}
            onEdit={this.onEdit}
          /> 
          :
          <Essay
            authenUser = {this.props.authenUser}
            data={this.props.data}
            numberOfQuest={this.props.numberOfEssayQuest}
            onSelect={this.props.onSelect}
            selected={this.props.selected}
            onEdit={this.onEdit}
          ></Essay>
        )}
                    
      </div>
    );
  }
}

export default QuestItem;

import React from "react";

class AnswersEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answers: [],
      displayedAnswers: [],
      answerids: [],
      indexDisplayed: 0,
      helpfulnessClicked: false,
      isReported: false
    }

    this.handleAnswerHelpfulnessClick = this.handleAnswerHelpfulnessClick.bind(this);
    this.handleReportButtonClick = this.handleReportButtonClick.bind(this);
    this.showNext2Answers = this.showNext2Answers.bind(this);
    this.makeAnswersState = this.makeAnswersState.bind(this);

  }
  componentDidMount() {
    this.makeAnswersState();
    this.showNext2Answers();
  }

  makeAnswersState() {
    const answers = this.props.answer;
    for (var key in answers) {
      this.state.answers.push(answers[key]);
    }
  }



  showNext2Answers() {
    let displayedAnswers = this.state.displayedAnswers;
    let indexDisplayed = this.state.indexDisplayed;
    let answers = this.state.answers;
    let answerids = this.state.answerids;
    for (let i = indexDisplayed; i <= indexDisplayed + 1; i++) {
      if (displayedAnswers.length < answers.length) {
        displayedAnswers.push(answers[i]);
      }
    }
    this.setState({
      indexDisplayed: this.state.indexDisplayed + 2,
      displayedAnswers: displayedAnswers
    })
  }

  handleAnswerHelpfulnessClick() {
    // will make call to api to update the answer helpfulness count
    // make sure that the user is only able to click on this once
    console.log('helpfulness button clicked')
  }


  handleReportButtonClick() {
    this.setState(PrevState => ({isReported: true}));
  }


  render() {
    const reportButtonText = this.state.isReported ? "Reported" : "Report"
    return(
      <div>
        {this.state.displayedAnswers.map(answer => {
          return(
            <>
            <h4>A:{answer.body}</h4>
            <h6>by :{answer.answerer_name} date: {answer.date} | Helpful?
            <button onClick={this.handleAnswerHelpfulnessClick}>YES({answer.helpfulness})</button> | <button onClick={this.handleReportButtonClick}>{reportButtonText}</button></h6>
            </>
          )
        })}
        {Object.keys(this.state.answers).length > 2 &&
        <button onClick={this.showNext2Answers}>More Answers</button>}
      </div>
    )
  }
}

export default AnswersEntry;
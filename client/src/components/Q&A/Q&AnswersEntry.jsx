import React from "react";
import axios from 'axios';

class AnswersEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answers: [],
      displayedAnswers: [],
      answerids: [],
      indexDisplayed: 0,
      helpfulnessClicked: false,
      isReported: false,
      showAnswerModal: false
    }
    console.log('answers entry', this.props);
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
    const photos = this.state.photos
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

  handleAnswerHelpfulnessClick(answer_id) {
    axios.put(`/qa/answers/${answer_id}/helpful`)
    .then((res) => {
      const updatedAnswers = this.state.answers.map((answer => {
        if (answer.id === answer_id) {
          answer.helpfulness += 1
        }
        return answer
      }))
      this.setState({
        answers: updatedAnswers
      })
    })
    .catch((err) => {
      console.log(err)
    })
    console.log('helpfulness button clicked')
  }


  handleReportButtonClick(answer_id) {
    this.props.updateAnswerReport(answer_id)
    this.setState(PrevState => ({isReported: true}));
  }


  render() {
    console.log('answers', this.state.answers);
    const reportButtonText = this.state.isReported ? "Reported" : "Report"
    return(
      <div>
        {this.state.displayedAnswers.map(answer => {
          return(
            <>
            <h4>A:{answer.body}</h4>
            {answer.photos.length &&
            answer.photos.map((image => {
              return(
                <>
                <img src={image}/>
                </>
              )
            }))
            }
            <h6>by :{answer.answerer_name} date: {answer.date} | Helpful?
            <button onClick={() => this.handleAnswerHelpfulnessClick(answer.id)}>YES({answer.helpfulness})</button> | <button onClick={() => {this.handleReportButtonClick(answer.id)}}>{reportButtonText}</button></h6>
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
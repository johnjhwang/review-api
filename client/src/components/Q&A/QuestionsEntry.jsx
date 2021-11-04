import React from 'react';

class QuestionEntry extends React.Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = {
      questions: props.questions,
      displayedQuestions: [],
      indexDisplayed: 0,
      helpfulButtonClicked: false,
      addAnswerButtonClicked: false
    }
    // console.log('question state',this.state.questions);
    this.showNext2Questions = this.showNext2Questions.bind(this);
    this.onHelpfulClick = this.onHelpfulClick.bind(this);
  }

  componentDidMount() {
    this.showNext2Questions();
  }
  // function that displays 2 more questions
  showNext2Questions () {
    let displayedQuestions = this.state.displayedQuestions;
    let indexDisplayed = this.state.indexDisplayed;
    let questions = this.state.questions;
    for (let i = indexDisplayed; i <= indexDisplayed + 1; i++) {
      if (displayedQuestions.length < questions.length) {
        displayedQuestions.push(questions[i]);
      }
    }
    this.setState({
      indexDisplayed: this.state.indexDisplayed + 2,
      displayedQuestions: displayedQuestions
    })
  }

  onHelpfulClick() {
    // will make call to update the helpfulness count of the api
    console.log('clicked')
  }

  render() {
    return (
      <div>
        {this.state.displayedQuestions.map(indQuestion => {
          return(
            <>
            <h1> Q: {indQuestion.question_body}</h1>
            <h4> helpful? <button onClick={this.onHelpfulClick}>YES</button>{indQuestion.question_helpfulness}</h4>
            </>
          )
        })}
        {this.state.questions.length > 2 &&
        <button onClick={this.showNext2Questions}>More Answered Questions</button>}
      </div>
    )
  }
}

export default QuestionEntry;
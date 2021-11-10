import React from 'react';
import AnswersEntry from './Q&AnswersEntry.jsx';
import AddQuestion from './AddQuestion.jsx';

class QuestionEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // questions: props.questions,
      displayedQuestions: [],
      indexDisplayed: 0,
      helpfulButtonClicked: false,
      addAnswerButtonClicked: false,
      showQuestionModal: false,
      product_id: this.props.product_id
    }
    this.showNextQuestions = this.showNextQuestions.bind(this);
    this.onHelpfulClick = this.onHelpfulClick.bind(this);
    this.createNewQuestion = this.createNewQuestion.bind(this);
    this.onQuestionModalClose = this.onQuestionModalClose.bind(this);
  }

  componentDidMount() {
    this.showNextQuestions();
  }

  // function that displays 2 more questions
  showNextQuestions () {
    let displayedQuestions = this.state.displayedQuestions;
    let indexDisplayed = this.state.indexDisplayed;
    let questions = [...this.props.questions];
    if (questions.length <= 4) {
      for (let i = indexDisplayed; i <= questions.length; i++) {
        displayedQuestions.push(questions[i]);
      }
    } else {
      for (let i = indexDisplayed; i <= indexDisplayed + 3; i++) {
        if (displayedQuestions.length < questions.length) {
          displayedQuestions.push(questions[i]);
        }
      }
    }
    this.setState({
      indexDisplayed: this.state.indexDisplayed + 4,
      displayedQuestions: displayedQuestions
    })
  }

  onHelpfulClick() {
    // will make call to update the helpfulness count of the api
    console.log('clicked')
  }

  onQuestionModalClose() {

  }

  createNewQuestion() {
    this.setState(PrevState => ({showQuestionModal: true}));
  }

  render() {
    console.log('render', this.state)
    return (
      <div>
        {this.state.displayedQuestions.map(indQuestion => {
          return(
            <>
            <h1> Q: {indQuestion.question_body}</h1>
            <h4> helpful? <button onClick={this.onHelpfulClick}>YES</button>{indQuestion.question_helpfulness}</h4>
            <AnswersEntry answer={indQuestion.answers}/>
            </>
          )
        })}
        {this.props.questions.length > 2 &&
        <>
        <button onClick={this.showNextQuestions}>More Answered Questions</button>
        <button onClick={this.createNewQuestion}>Add Question</button>
        <AddQuestion updateQuestions={this.props.updateQuestions}showNextQuestions={this.showNextQuestions}displayedQuestions={this.state.displayedQuestions} indexDisplayed={this.state.indexDisplayed} getQuestions={this.props.getQuestions}product_id={this.props.product_id} show={this.state.showQuestionModal}/>
        </>}
      </div>
    )
  }
}

export default QuestionEntry;
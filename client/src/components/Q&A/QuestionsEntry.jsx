import React from 'react';
import AnswersEntry from './Q&AnswersEntry.jsx';
import AddQuestion from './AddQuestion.jsx';
import axios from 'axios';

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
      showAddAnswerModal: false,
      product_id: this.props.product_id
    }
    console.log('questions entry props',this.props)
    this.showNextQuestions = this.showNextQuestions.bind(this);
    this.onHelpfulClick = this.onHelpfulClick.bind(this);
    this.showQuestionModal = this.showQuestionModal.bind(this);
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

  onHelpfulClick(question_id) {
    // will make call to update the helpfulness count of the api
    // let product_id = product_id
    // console.log(product_id)
    axios.put(`/qa/questions/${question_id}/helpful`)
    .then((response) => {
      this.props.updateHelpfulness(question_id)
    })
    .catch((err) => {
      console.log(err, "err")
    })
  }

  showQuestionModal() {
    this.setState({showQuestionModal: !this.state.showQuestionModal});
  }

  showAddAnswerModal() {
    this.setState({showAddAnswerModal: !this.state.showAddAnswerModal})
  }

  render() {
    console.log('render', this.props)
    return (
      <div>
        {this.state.displayedQuestions.map(indQuestion => {
          return(
            <>
            <h1> Q: {indQuestion.question_body}</h1>
            <h4> helpful? <button onClick={() => {this.onHelpfulClick(indQuestion.question_id)}}>YES</button>{indQuestion.question_helpfulness}</h4>
            <AnswersEntry answer={indQuestion.answers}/>
            <button onClick={() => {this.showAddAnswerModal()}}>Add Answer</button>
            </>
          )
        })}
        {this.props.questions.length > 2 &&
        <>
        <button onClick={this.showNextQuestions}>More Answered Questions</button>
        <button onClick={this.showQuestionModal}>Add Question</button>
        { this.state.showQuestionModal &&
        <AddQuestion updateQuestions={this.props.updateQuestions}showNextQuestions={this.showNextQuestions}displayedQuestions={this.state.displayedQuestions} getQuestions={this.props.getQuestions}product_id={this.props.product_id} show={this.showQuestionModal}/>}
        </>}
      </div>
    )
  }
}

export default QuestionEntry;
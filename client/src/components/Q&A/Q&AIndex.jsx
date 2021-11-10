// Q&A
import React from 'react';
import axios from 'axios';
import QuestionEntry from './QuestionsEntry.jsx';
import QuestionsSearchForm from './QuestionsSearchForm.jsx';


class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 39337,
      questions: []
    }
    this.getQuestions = this.getQuestions.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
    this.updateHelpfulness = this.updateHelpfulness.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions() {
    const product_id = this.state.product_id;
    const count = 100;
    axios.get('/qa/questions', { params: { product_id, count } })
    .then((questions) => {
      this.setState({questions: questions.data.results})
    })
    .catch((err) => {
      console.log(err);
    })
  }

  updateQuestions() {
    this.getQuestions();
  }

  updateHelpfulness(question_id) {
    const updatedQuestions = this.state.questions.map((question => {
      if (question.question_id === question_id) {
        question.question_helpfulness = question.question_helpfulness + 1
      }
      return question
    }))
    this.setState({
      questions: updatedQuestions
    })
  }



  render() {
    console.log(this.state)
    return (
      <div>
      {this.state.questions.length &&
       <>
      <QuestionsSearchForm questions={this.state.questions}/>
      <QuestionEntry updateQuestions={this.updateQuestions}
      getQuestions={this.getQuestions}
      product_id={this.state.product_id}
      questions={this.state.questions}
      updateHelpfulness={this.updateHelpfulness}
      />
      </>}
    </div>
    )
  }
}

export default QuestionsAndAnswers;
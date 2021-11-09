// Q&A
import React from 'react';
import axios from 'axios';
import QuestionEntry from './QuestionsEntry.jsx';
import QuestionsSearchForm from './QuestionsSearchForm.jsx';


class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 39335,
      questions: []
    }
    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions() {
    const product_id = this.state.product_id;
    axios.get('/qa/questions', { params: { product_id } })
    .then((questions) => {
      this.setState({questions: questions.data.results})
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
      {this.state.questions.length &&
       <>
      <QuestionsSearchForm questions={this.state.questions}/>
      <QuestionEntry product_id={this.state.product_id} questions={this.state.questions}/>
      </>}
    </div>
    )
  }
}

export default QuestionsAndAnswers;
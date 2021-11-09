import React from 'react'

class QuestionsSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      questions: props.questions,
      searchedTerm: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.searchTerm = this.searchTerm.bind(this);
  }
  handleChange (e) {
    this.searchTerm(e);
    this.setState({
      term: e.target.value
    });
  }

  searchTerm(e) {
    if (e.target.value.length >= 3) {
      this.state.questions.filter((question, index) => {
        let event = e.target.value;
        if (question.question_body.includes(event)) {
          console.log(question.question_body)
          this.setState({ searchedTerm: question.question_body })
        }
      })
    }


  }

  render() {
    return (
      <div>
        <h3>Search for a Question</h3>
        <input placeholder="Have a Question? Search for Answers"value={this.state.term} onChange={this.handleChange}/>
      </div>
    )
  }
}

export default QuestionsSearchForm;
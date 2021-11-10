import React from 'react';
import axios from 'axios';

class AddQuestion extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      body: "",
      nickname: "",
      email: "",
      product_id: this.props.product_id
    }
    this.handleChange = this.handleChange.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  updateQuestions(e) {
    e.preventDefault();
    // call the function that will update the api
    axios.post('/qa/questions', {
      body: this.state.body,
      name: this.state.nickname,
      email: this.state.email,
      product_id: this.state.product_id
    })
    .then((addedQuestion) => {
      console.log('success')
    })
    .catch((err) => {
      console.log(err);
    })
  }





  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div>
        <form onSubmit={this.updateQuestions}>
          <input type="text" value={this.state.body} name="body" onChange={this.handleChange} placeholder= "Why did you like the product or not?"></input>
          <input type="text" value={this.state.nickname} placeholder="Example: jacskon11!" name="nickname" onChange={this.handleChange}></input>
          <input type="text" value={this.state.email} name="email"
           placeholder="Example: gman@gmail.com" onChange={this.handleChange}></input>
          <input type="submit" value="submit Question"></input>
        </form>
      </div>
    )
  }
}

export default AddQuestion;
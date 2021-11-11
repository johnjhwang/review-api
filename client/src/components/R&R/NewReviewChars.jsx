import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

class NewReviewChars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    console.log('e.target >>>>', name, value);
    this.setState({ [name]: value }, () => console.log(`${name} in state is now: `, this.state[name]), this.props.processCharSelection(name, value));
  }

  render () {
    let {characteristics} = this.props;

      return (
        <Container onChange={this.handleChange}>
          <LabelLabel>{characteristics}:</LabelLabel>
          <RadioLabel><input type="radio" name={characteristics} value="1" /><span style={{ width: '8px', display: 'inline-block' }} />
          {characteristicLabels[characteristics][1]}
          </RadioLabel>
          <RadioLabel><input type="radio" name={characteristics} value="2" /><span style={{ width: '8px', display: 'inline-block' }} />
          {characteristicLabels[characteristics][2]}
          </RadioLabel>
          <RadioLabel><input type="radio" name={characteristics} value="3" /><span style={{ width: '8px', display: 'inline-block' }} />
          {characteristicLabels[characteristics][3]}
          </RadioLabel>
          <RadioLabel><input type="radio" name={characteristics} value="4" /><span style={{ width: '8px', display: 'inline-block' }} />
          {characteristicLabels[characteristics][4]}
          </RadioLabel>
          <RadioLabel><input type="radio" name={characteristics} value="5" /><span style={{ width: '8px', display: 'inline-block' }} />
          {characteristicLabels[characteristics][5]}
          </RadioLabel>
        </Container>)
  }
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const LabelLabel = styled.div`
  width: 10%;
  text-align: left;
`;

const RadioLabel = styled.label`

`

const characteristicLabels = {
  Size: {
    1: 'A size too small',
    2: '½ a size too small ',
    3: 'Perfect',
    4: '½ a size too big',
    5: 'A size too wide',
  },
  Width: {
    1: 'Too narrow',
    2: 'Slightly narrow',
    3: 'Perfect',
    4: 'Slightly wide',
    5: 'Too wide',
  },
  Comfort: {
    1: 'Uncomfortable',
    2: 'Slightly uncomfortable',
    3: 'Ok',
    4: 'Comfortable',
    5: 'Perfect',
  },
  Quality: {
    1: 'Poor',
    2: 'Below average',
    3: 'What I expected',
    4: 'Pretty great',
    5: 'Perfect',
  },
  Length: {
    1: 'Runs Short',
    2: 'Runs slightly short',
    3: 'Perfect',
    4: 'Runs slightly long',
    5: 'Runs long',
  },
  Fit: {
    1: 'Runs tight',
    2: 'Runs slightly tight',
    3: 'Perfect',
    4: 'Runs slightly long',
    5: 'Runs long',
  },
}

export default NewReviewChars;

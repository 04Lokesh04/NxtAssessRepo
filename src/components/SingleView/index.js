import './index.css'
import {Component} from 'react'

class SingleView extends Component {
  state = {
    selectedOption: '',
  }

  handleSelectChange = event => {
    const {selectedOption} = this.state
    console.log(selectedOption)
    console.log(event.target.value)
    const selectedValue = event.target.value
    this.setState({selectedOption: selectedValue})

    const {markquestionasAnswered, questobj} = this.props
    const {options, id} = questobj
    const selectednewOption = options.find(each => each.id === selectedValue)
    markquestionasAnswered(id, selectednewOption.is_correct, selectedValue)
  }

  gotoNextQuestion = () => {
    const {updatequestioncount} = this.props
    updatequestioncount()
  }

  render() {
    const {questobj, count} = this.props
    const {questionText, options} = questobj
    const {selectedOption} = this.state
    return (
      <div data-testid="questionItem" className="question-card-design">
        <p className="ques-para">
          {count + 1}. {questionText}
        </p>
        <hr className="questionline" />
        <div className="select-container">
          <select
            className="selector-design"
            value={selectedOption}
            onChange={this.handleSelectChange}
          >
            {' '}
            <option value="" disabled className="hidden-option">
              {options[0].text}
            </option>
            {options.map(each => (
              <option className="option-desgin" key={each.id} value={each.id}>
                {each.text}
              </option>
            ))}
          </select>
        </div>
        <img
          className="first-option-default"
          src="https://res.cloudinary.com/dsbsag3sq/image/upload/v1724060232/Alert_gxc8af.png"
          alt="warn"
        />
        {count !== 9 && (
          <button
            className="next-button"
            type="button"
            onClick={this.gotoNextQuestion}
          >
            Next Question
          </button>
        )}
      </div>
    )
  }
}

export default SingleView

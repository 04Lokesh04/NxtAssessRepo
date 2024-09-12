import './index.css'
import {Component} from 'react'

class DefaultView extends Component {
  state = {
    selected: null,
  }

  selectoneanswer = (optionId, optionsObj, id) => {
    const {markquestionasAnswered} = this.props
    optionsObj.map(each => {
      if (each.optionId === optionId) {
        return {...each, isSelected: true}
      }
      return {...each}
    })

    const selectedOption = optionsObj.find(each => each.optionId === optionId)
    console.log(selectedOption)
    this.setState({selected: optionId})
    markquestionasAnswered(id, selectedOption.optionIsCorrect, optionId)
  }

  gotonextquestion = () => {
    const {updatequestioncount} = this.props
    updatequestioncount()
  }

  render() {
    const {selected} = this.state
    const {questobj, count} = this.props
    const {id, questionText, options} = questobj
    const optionsObj = options.map(each => ({
      optionId: each.id,
      optionText: each.text,
      optionIsCorrect: each.is_correct,
      isSelected: each.id === selected,
    }))

    return (
      <div data-testid="questionItem" className="question-card-design">
        <p className="ques-para">
          {count + 1}. {questionText}
        </p>
        <hr className="questionline" />
        <ul className="optionlist">
          {optionsObj.map(each => {
            const buttonclass = each.isSelected
              ? 'button-select'
              : 'button-unselect'
            return (
              <li key={each.optionId} className="list-ops">
                <button
                  type="button"
                  className={buttonclass}
                  onClick={() =>
                    this.selectoneanswer(each.optionId, optionsObj, id)
                  }
                >
                  {each.optionText}
                </button>
              </li>
            )
          })}
        </ul>
        {count !== 9 && (
          <button
            className="next-button"
            type="button"
            onClick={this.gotonextquestion}
          >
            Next Question
          </button>
        )}
      </div>
    )
  }
}

export default DefaultView

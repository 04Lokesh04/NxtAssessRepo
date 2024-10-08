import './index.css'
import {Component} from 'react'

class ImagesView extends Component {
  state = {
    selected: null,
  }

  componentDidMount() {
    const {questobj} = this.props
    const selectedOptionId = questobj.selectedOptionIdIs

    if (selectedOptionId) {
      this.setState({selected: selectedOptionId})
    }
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
      optionImageUrl: each.image_url,
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
              ? 'button-img-select'
              : 'button-img-unselect'
            return (
              <li key={each.optionId} className="list-ops">
                <button
                  type="button"
                  className={buttonclass}
                  onClick={() =>
                    this.selectoneanswer(each.optionId, optionsObj, id)
                  }
                >
                  <img
                    className="options-image"
                    src={each.optionImageUrl}
                    alt={each.optionText}
                  />
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

export default ImagesView

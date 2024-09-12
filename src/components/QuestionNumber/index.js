import './index.css'

const QuestionNumber = props => {
  const {questions, presentQuestioncount, renderQuestion} = props

  const updatepresentquestion = (index, optionsType) => {
    renderQuestion(optionsType, index)
  }

  return (
    <div className="question-nums-card">
      <p className="question-nums-para">Questions ({questions.length})</p>
      <ul className="Ques-nums-list">
        {questions.map((each, index) => {
          const answeredHighlight =
            questions[index].isanswered === true ? 'button-purple' : ''
          const presentSelected =
            presentQuestioncount === index ? 'button-highlight' : ''

          const buttonClass = `question-num-each ${answeredHighlight} ${presentSelected}`
          return (
            <li key={each.id} className="question-number-list">
              <button
                className={buttonClass}
                type="button"
                onClick={() => updatepresentquestion(index, each.optionsType)}
              >
                {index + 1}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default QuestionNumber

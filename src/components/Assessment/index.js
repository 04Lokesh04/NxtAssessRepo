import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import QuestionsContext from '../../context/QuestionsContext'
import QuestionNumber from '../QuestionNumber'
import Navbar from '../Navbar'
import Failure from '../Failure'
import DefaultView from '../DefaultView'
import ImagesView from '../ImagesView'
import SingleView from '../SingleView'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Assessment extends Component {
  state = {
    apistatus: apiConstants.initial,
    questions: [],
    count: 0,
    time: 600,
    timeInterval: null,
    answered: 0,
    unanswered: 10,
    score: 0,
  }

  componentDidMount() {
    this.getquestions()
    this.startTimer()
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  getquestions = async () => {
    this.setState({apistatus: apiConstants.inProgress})
    const url = 'https://apis.ccbp.in/assess/questions'
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(url, options)
      const fetchedData = await response.json()
      if (response.ok) {
        // const noOfquestions = fetchedData.total
        const fetchedQuestions = fetchedData.questions.map(each => ({
          id: each.id,
          optionsType: each.options_type,
          questionText: each.question_text,
          options: each.options,
          isanswered: false,
          choosenCorrect: false,
        }))
        this.setState({
          questions: fetchedQuestions,
          apistatus: apiConstants.success,
        })
      } else {
        this.setState({apistatus: apiConstants.failure})
      }
    } catch (err) {
      console.log('error is:', err)
      this.setState({apistatus: apiConstants.failure})
    }
  }

  startTimer = () => {
    const {answered, unanswered, questions} = this.state
    const {history, onTimerComplete} = this.props
    const timeInterval = setInterval(() => {
      this.setState(prevState => {
        if (prevState.time <= 1) {
          this.clearTimer()
          onTimerComplete(prevState.time, answered, unanswered, questions)
          history.replace('/results')
          return {time: 0}
        }
        return {time: prevState.time - 1}
      })
    }, 1000)

    this.setState({timeInterval})
  }

  clearTimer = () => {
    const {timeInterval} = this.state
    if (timeInterval) {
      clearInterval(timeInterval)
    }
    this.setState({timeInterval: null})
  }

  updatequestioncount = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  updateanswerdandunanswerd = () => {
    const {questions} = this.state
    const answeredCount = questions.filter(each => each.isanswered === true)
      .length
    const unansweredCount = questions.length - answeredCount
    this.setState({
      answered: answeredCount,
      unanswered: unansweredCount,
    })
  }

  markquestionasAnswered = (questionid, answerchoosen, optionId) => {
    this.setState(prevState => {
      console.log(answerchoosen)
      const newquestionslist = prevState.questions.map(each =>
        each.id === questionid
          ? {
              ...each,
              isanswered: true,
              choosenCorrect: answerchoosen,
              selectedOptionIdIs: optionId,
            }
          : {...each},
      )
      return {questions: newquestionslist}
    }, this.updateanswerdandunanswerd)
  }

  rendertimer = () => {
    const {time} = this.state
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60

    const formattedHour = hours < 10 ? `0${hours}` : hours
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

    const showTime = `${formattedHour}:${formattedMinutes}:${formattedSeconds}`

    return (
      <div className="time-card">
        <p className="timeleft-para">TIME LEFT</p>
        <p className="show-time">{showTime}</p>
      </div>
    )
  }

  renderQuestionNumbers = (answered, unanswered) => (
    <div className="answers-count">
      <div className="answers-count-info">
        <p className="count-para1">{answered}</p>
        <p className="answers-count-para">Answered Questions</p>
      </div>
      <div className="answers-count-info">
        <p className="count-para2">{unanswered}</p>
        <p className="answers-count-para">Unanswered Questions</p>
      </div>
    </div>
  )

  renderQuestion = (optionTypeIS, receivedIndex) => {
    const {questions, count} = this.state
    const questionIndex = receivedIndex !== 'noIndex' ? receivedIndex : count
    if (receivedIndex !== 'noIndex') {
      this.setState({count: receivedIndex})
    }
    const {optionsType} = questions[questionIndex]
    const selectedOPtionType =
      optionTypeIS !== 'empty' ? optionTypeIS : optionsType

    switch (selectedOPtionType) {
      case 'DEFAULT':
        return (
          <DefaultView
            questobj={questions[questionIndex]}
            count={questionIndex}
            markquestionasAnswered={this.markquestionasAnswered}
            updatequestioncount={this.updatequestioncount}
          />
        )
      case 'IMAGE':
        return (
          <ImagesView
            questobj={questions[questionIndex]}
            count={questionIndex}
            markquestionasAnswered={this.markquestionasAnswered}
            updatequestioncount={this.updatequestioncount}
          />
        )
      case 'SINGLE_SELECT':
        return (
          <SingleView
            questobj={questions[questionIndex]}
            count={questionIndex}
            markquestionasAnswered={this.markquestionasAnswered}
            updatequestioncount={this.updatequestioncount}
          />
        )
      default:
        return null
    }
  }

  sumbitTest = context => {
    const {history} = this.props
    const {time, answered, unanswered, questions} = this.state
    context.updateTimer(time, answered, unanswered, questions)
    history.replace('/results')
  }

  render() {
    const {apistatus, answered, unanswered, questions, count} = this.state
    switch (apistatus) {
      case apiConstants.success:
        return (
          <QuestionsContext.Consumer>
            {value => (
              <div className="Assessment-container">
                <Navbar />
                <div className="assessment-card">
                  <div className="question-card">
                    {this.renderQuestion('empty', 'noIndex')}
                  </div>
                  <div className="right">
                    <div className="timer-card">{this.rendertimer()}</div>
                    <div className="numbers-card">
                      {this.renderQuestionNumbers(answered, unanswered)}
                      <hr className="right-lane-line" />
                      <QuestionNumber
                        questions={questions}
                        renderQuestion={this.renderQuestion}
                        presentQuestioncount={count}
                      />
                      <button
                        className="submit-assessment-button"
                        type="button"
                        onClick={() => this.sumbitTest(value)}
                      >
                        Submit Assessment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </QuestionsContext.Consumer>
        )

      case apiConstants.failure:
        return <Failure retryfetch={this.getquestions} />

      case apiConstants.inProgress:
        return (
          <div className="loader-container load-middle" data-testid="loader">
            <Loader type="ThreeDots" color="#263868" height={50} width={50} />
          </div>
        )

      default:
        return null
    }
  }
}

export default Assessment

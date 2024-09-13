import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import QuestionsContext from './context/QuestionsContext'
import Home from './components/Home'
import Login from './components/Login'
import Assessment from './components/Assessment'
import Results from './components/Results'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
// write your code here

class App extends Component {
  state = {
    totalquestions: '',
    questionsList: [],
    timer: 0,
    answered: 0,
    unanswered: 10,
    score: 0,
    islastquestion: false,
    isSubmmited: false,
  }

  updateQuestionslist = ques => {
    this.setState({
      questionsList: ques,
    })
  }

  updateScore = () => {
    const {questionsList} = this.state
    console.log(questionsList)
    let result = 0
    questionsList.forEach(each => {
      console.log(each.isanswered)
      console.log(each.choosenCorrect)
      if (each.isanswered === true) {
        if (each.choosenCorrect === 'true') {
          result += 1
        }
      }
    })

    this.setState({score: result})
  }

  updateTimer = (time, answered, unanswered, questions) => {
    this.setState(
      {
        timer: time,
        isSubmmited: true,
        answered,
        unanswered,
        questionsList: questions,
      },
      this.updateScore,
    )
  }

  handleTimerComplete = (time, answered, unanswered, questions) => {
    this.setState(
      {
        timer: time,
        isSubmmited: false,
        answered,
        unanswered,
        questionsList: questions,
      },
      this.updateScore,
    )
  }

  render() {
    const {
      totalquestions,
      questionsList,
      timer,
      answered,
      unanswered,
      score,
      islastquestion,
      isSubmmited,
    } = this.state
    return (
      <QuestionsContext.Provider
        value={{
          totalquestions,
          questionsList,
          timer,
          answered,
          unanswered,
          score,
          islastquestion,
          isSubmmited,
          updateQuestionslist: this.updateQuestionslist,
          updateScore: this.updateScore,
          updateTimer: this.updateTimer,
        }}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/assessment"
            component={props => (
              <Assessment
                {...props}
                onTimerComplete={this.handleTimerComplete}
              />
            )}
          />
          <ProtectedRoute exact path="/results" component={Results} />
          <Route exact path="/bad-path" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </QuestionsContext.Provider>
    )
  }
}

export default App

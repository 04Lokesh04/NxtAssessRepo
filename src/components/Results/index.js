import './index.css'
import QuestionsContext from '../../context/QuestionsContext'
import Navbar from '../Navbar'

const Result = props => {
  const takeback = () => {
    const {history} = props
    history.replace('/assessment')
  }
  return (
    <QuestionsContext.Consumer>
      {value => {
        const {timer, score, isSubmmited} = value
        console.log('result timer:', timer)
        console.log('result score:', score)
        console.log('result issubmmited', isSubmmited)

        const hours = Math.floor(timer / 3600)
        const minutes = Math.floor((timer % 3600) / 60)
        const seconds = timer % 60

        const formattedHour = hours < 10 ? `0${hours}` : hours
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
        const showTime = `${formattedHour}:${formattedMinutes}:${formattedSeconds}`

        return (
          <div className="result-main-container">
            <Navbar />
            <div className="result-container">
              <div className="result-card">
                {isSubmmited ? (
                  <>
                    <img
                      className="result-image"
                      src="https://res.cloudinary.com/dsbsag3sq/image/upload/v1724060232/Asset_2_1_bj3bby.png"
                      alt="submit"
                    />
                    <p className="Result-message">
                      Congrats! You completed the assessment.
                    </p>
                    <p className="time-taken-para">
                      Time Taken: <span className="timer-para">{showTime}</span>
                    </p>
                  </>
                ) : (
                  <>
                    <img
                      className="result-image"
                      src="https://res.cloudinary.com/dsbsag3sq/image/upload/v1724060231/calender_1_1_elrmpw.png"
                      alt="time up"
                    />
                    <p className="Result-message2">Time is up</p>
                    <p className="time-taken-para2">
                      You did not complete the assessment within the time.
                    </p>
                  </>
                )}
                <p className="score-para">
                  Your Score: <span className="score-span">{score}</span>
                </p>
                <button
                  className="result-button"
                  type="button"
                  onClick={takeback}
                >
                  Reattempt
                </button>
              </div>
            </div>
          </div>
        )
      }}
    </QuestionsContext.Consumer>
  )
}

export default Result

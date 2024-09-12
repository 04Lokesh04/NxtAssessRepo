import './index.css'
import Navbar from '../Navbar'

const Failure = props => {
  const {getQuestions} = props
  const retryquestions = () => {
    getQuestions()
  }
  return (
    <div className="Failure-container">
      <Navbar />
      <div className="Failure-card">
        <img
          className="Failure-image"
          src="https://res.cloudinary.com/dsbsag3sq/image/upload/v1724060231/Group_7519_nh4yyi.png"
          alt="failure view"
        />
        <p className="Failure-para1">Oops! Something went wrong</p>
        <p className="Failure-para2">We are having some trouble</p>
        <button
          className="Failure-button"
          type="button"
          onClick={retryquestions}
        >
          Retry
        </button>
      </div>
    </div>
  )
}

export default Failure

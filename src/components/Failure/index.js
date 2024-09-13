import './index.css'
import Navbar from '../Navbar'

const Failure = props => {
  const {retryfetch} = props
  const retryquestions = () => {
    retryfetch()
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
        <h1 className="Failure-para1">Oops! Something Went Wrong</h1>
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

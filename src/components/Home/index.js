import './index.css'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'

const Home = props => (
  <div className="Home-container">
    <Navbar />
    <div className="Home-card">
      <div className="instructions-card">
        <h1 className="home-heading">Instructions</h1>
        <ol>
          <li className="instrut-list">
            <p className="instruct-para">
              <span className="instruct-span">Total Questions:</span> 10
            </p>
          </li>
          <li className="instrut-list">
            <p className="instruct-para">
              <span className="instruct-span">Types of Questions: MCQs</span>
            </p>
          </li>
          <li className="instrut-list">
            <p className="instruct-para">
              <span className="instruct-span">Duration:</span> 10 Mins{' '}
            </p>
          </li>
          <li className="instrut-list">
            <p className="instruct-para">
              <span className="instruct-span">Marking Scheme:</span> Every
              Correct response, get 1 mark
            </p>
          </li>
          <li className="instrut-list">
            <p className="instruct-para">
              All the progress will be lost, if you reload during the assessment
            </p>
          </li>
        </ol>
        <Link to="/assessment">
          <button className="home-button" type="button">
            Start Assessment
          </button>
        </Link>
      </div>
      <img
        className="home-image"
        src="https://res.cloudinary.com/dsbsag3sq/image/upload/v1724060232/Group_erqoms.png"
        alt="assessment"
      />
    </div>
  </div>
)

export default Home

import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    userName: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
    showpassword: false,
  }

  changeUserName = event => {
    this.setState({userName: event.target.value})
  }

  changepassword = event => {
    this.setState({password: event.target.value})
  }

  displaypassword = () => {
    this.setState(prevState => ({showpassword: !prevState.showpassword}))
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()

    try {
      const {userName, password} = this.state
      const userDetails = {username: userName, password}
      const url = 'https://apis.ccbp.in/login'
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }

      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok === true) {
        this.submitSuccess(data.jwt_token)
      } else {
        this.submitFailure(data.error_msg)
      }
    } catch (err) {
      console.log('error is:', err)
    }
  }

  render() {
    const {
      userName,
      password,
      showErrorMsg,
      errorMsg,
      showpassword,
    } = this.state
    return (
      <div className="Login-container">
        <form className="Login-form" onSubmit={this.submitForm}>
          <img
            className="Login-Logo"
            src="https://res.cloudinary.com/dsbsag3sq/image/upload/v1724060234/Group_8005_mkt7rq.png"
            alt="login website logo"
          />
          <div className="input-field">
            <label className="label-element" htmlFor="userInput">
              USERNAME
            </label>
            <input
              placeholder="Enter user name"
              className="input-element"
              type="text"
              id="userInput"
              value={userName}
              onChange={this.changeUserName}
            />
          </div>
          <div className="input-field">
            <label className="label-element" htmlFor="userpassword">
              PASSWORD
            </label>
            <input
              placeholder="Enter user password"
              className="input-element"
              type={showpassword ? 'text' : 'password'}
              id="userpassword"
              value={password}
              onChange={this.changepassword}
            />
          </div>
          <div className="input-field2">
            <input
              id="check"
              className="checkbox-element"
              type="checkbox"
              checked={showpassword}
              onChange={this.displaypassword}
            />
            <label className="show-password-element" htmlFor="check">
              Show Password
            </label>
          </div>

          <button className="login-button" type="submit">
            Login
          </button>
          {showErrorMsg && <p className="error-para">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login

import './index.css'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

const Navbar = props => {
  const {history} = props
  const logoutUser = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <img
          className="nav-img"
          src="https://res.cloudinary.com/dsbsag3sq/image/upload/v1724060233/Group_8004_oimxm2.png"
          alt="website logo"
        />
      </Link>
      <button className="nav-button" type="button" onClick={logoutUser}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Navbar)

import React from 'react'
import './AuthNavLink.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../modules/auth'
import logoutImg from '../../img/logout.png'
const mapDispatchToProps = {
  logout
}

function AuthNavLink(props) {
  return (
    <nav className="nav">
      <Link className="navLink" to="#">
        Dashboard
      </Link>
      <Link className="navLink" to="#">
        Account Password
      </Link>
      <img
        className="navLink"
        alt="Logout"
        src={logoutImg}
        onClick={props.logout}
        title="Logout"
      />
    </nav>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(AuthNavLink)

import React from 'react'
import './Header.css'
import AuthNavLink from './AuthNavLink'
import logo from '../../img/logo.png'
function Header(props) {
  return (
    <header>
      <div className="brand">
        <img src={logo} alt="logo" className="logo" />{' '}
        <label className="pageTitle">{props.title}</label>
      </div>
      {props.auth && <AuthNavLink />}
    </header>
  )
}

export default Header

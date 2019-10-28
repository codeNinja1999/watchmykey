import React from 'react'
import './PasswordCard.css'
import usernameImg from '../../img/username.png'
export default function PasswordCard(props) {
  return (
    <div className="card">
      <div className="cardWrapper">
        <div className="rightCard">
          <div className="icon">
            {props.password.options.favicon ? (
              <img
                className="iconImg"
                alt={props.password.url}
                src={props.password.options.favicon}
              />
            ) : (
              <div className="iconImg filled" />
            )}
          </div>
          <div className="passInfo">
            <div className="top">
              {props.password.options.title ? (
                <React.Fragment>
                  <h3>{props.password.options.title}</h3>{' '}
                  <span>{props.password.url}</span>
                </React.Fragment>
              ) : (
                <h3>{props.password.url || '-'}</h3>
              )}
            </div>
            <div className="bottom">
              <img src={usernameImg} alt="image" />{' '}
              <p>{props.password.username || '-'}</p>
            </div>
          </div>
        </div>
        <div className="leftCard">
          <img
            className="cardOptionIcon"
            src={require('../../img/copy.png')}
            alt="copy"
            title="copy"
          />
          <img
            onClick={props.delete}
            className="cardOptionIcon"
            title="delete"
            src={require('../../img/delete.png')}
            alt="copy"
          />
        </div>
      </div>
    </div>
  )
}

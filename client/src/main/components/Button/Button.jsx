import React from 'react'
import './Button.css'
export default function Button(props) {
  return (
    <div className={`formFieldWrapper ${props.fullWidth && 'fullWidth'}`}>
      {props.disable ? (
        <button disabled className="btn" onClick={props.onPress}>
          {props.title}
        </button>
      ) : (
        <button className="btn" onClick={props.onPress}>
          {props.title}
        </button>
      )}
    </div>
  )
}

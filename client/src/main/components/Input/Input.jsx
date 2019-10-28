import React from 'react'
import './Input.css'
export default function Input(props) {
  return (
    <div className={`formFieldWrapper ${props.fullWidth && 'fullWidth'}`}>
      <input
        value={props.value}
        name={props.name}
        className="input"
        type={props.type}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  )
}

import React from 'react'
import './HelperText.css'
export default function HelperText(props) {
  return (
    <div className={`formFieldWrapper ${props.fullWidth && 'fullWidth'}`}>
      <div className={`helperWrap ${props.type || 'info'}`}>
        {props.children}
      </div>
    </div>
  )
}

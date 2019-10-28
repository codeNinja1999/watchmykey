import React from 'react'
import './Modal.css'
export default function Modal(props) {
  return (
    <React.Fragment>
      <div className="modal_background">
        {props.closeModal && (
          <div className="closeBtn" onClick={props.closeModal}>
            X
          </div>
        )}
        <div className="modal">{props.children}</div>
      </div>
    </React.Fragment>
  )
}

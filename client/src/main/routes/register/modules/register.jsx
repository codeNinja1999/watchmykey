import constant from './actionConstants'
import networking from '../../../utils/networking'
import update from 'react-addons-update'
const {
  REGISTER_PROCESS,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER_RESET
} = constant
// action
const processing = bool => {
  return {
    type: REGISTER_PROCESS,
    payload: bool
  }
}

export const register = (data = {}) => dispatch => {
  dispatch(processing(true))
  networking('user/register', data)
    .then(response => {
      dispatch({
        type: REGISTER_SUCCESS
      })
    })
    .catch(err => {
      dispatch({
        type: REGISTER_ERROR,
        payload: err.statusText
      })
    })
}

export const setError = error => dispatch => {
  dispatch({
    type: REGISTER_ERROR,
    payload: error
  })
}

export const reset = () => dispatch => {
  dispatch({
    type: REGISTER_RESET
  })
}

// handler
function handleProcessing(state, action) {
  return update(state, {
    processing: {
      $set: action.payload
    }
  })
}

function handleRegisterSuccess(state, action) {
  return update(state, {
    processing: {
      $set: false
    },
    success: {
      $set: true
    },
    error: {
      $set: false
    },
    errorMsg: {
      $set: null
    }
  })
}

function handleRegisterError(state, action) {
  return update(state, {
    processing: {
      $set: false
    },
    success: {
      $set: false
    },
    error: {
      $set: true
    },
    errorMsg: {
      $set: action.payload
    }
  })
}

function handleRegisterReset(state, action) {
  return update(state, {
    processing: { $set: false },
    success: { $set: false },
    error: { $set: false },
    errorMsg: { $set: null }
  })
}

const INITIAL_STATE = {
  processing: false,
  success: false,
  error: false,
  errorMsg: null
}

const ACTION_HANDLER = {
  REGISTER_PROCESS: handleProcessing,
  REGISTER_SUCCESS: handleRegisterSuccess,
  REGISTER_ERROR: handleRegisterError,
  REGISTER_RESET: handleRegisterReset
}

export const RegisterReducer = (state = INITIAL_STATE, action) => {
  const handle = ACTION_HANDLER[action.type]

  return handle ? handle(state, action) : state
}

import constant from './actionConstants'
import networking from '../../../utils/networking'
import update from 'react-addons-update'
const { LOGIN_PROCESS, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_RESET } = constant

// action
const processing = bool => {
  return {
    type: LOGIN_PROCESS,
    payload: bool
  }
}

export const login = (username, password) => dispatch => {
  dispatch(processing(true))
  networking('user/login', { username, password })
    .then(response => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response
      })
    })
    .catch(err =>
      dispatch({
        type: LOGIN_ERROR,
        payload: err.statusText
      })
    )
}

export const setError = error => dispatch => {
  dispatch({
    type: LOGIN_ERROR,
    payload: error
  })
}

export const reset = () => dispatch => {
  dispatch({
    type: LOGIN_RESET
  })
}

// handler
function handleProcessing(state, action) {
  return update(state, {
    processing: {
      $set: true
    }
  })
}

function handleLoginSuccess(state, action) {
  localStorage.setItem('token', action.payload.token)

  return update(state, {
    processing: { $set: false },
    success: { $set: true },
    error: { $set: false },
    errorMsg: { $set: null }
  })
}

function handleLoginError(state, action) {
  return update(state, {
    processing: { $set: false },
    success: { $set: false },
    error: { $set: true },
    errorMsg: { $set: action.payload }
  })
}

function handleReset(state, action) {
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
  LOGIN_PROCESS: handleProcessing,
  LOGIN_SUCCESS: handleLoginSuccess,
  LOGIN_ERROR: handleLoginError,
  LOGIN_RESET: handleReset
}

export const LoginReducer = (state = INITIAL_STATE, action) => {
  const handler = ACTION_HANDLER[action.type]

  return handler ? handler(state, action) : state
}

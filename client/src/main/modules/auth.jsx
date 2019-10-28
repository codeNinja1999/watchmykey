import update from 'react-addons-update'
import constant from './actionConstants'

const { GET_TOKEN, LOGOUT } = constant

// action
export const getToken = () => dispatch => {
  const token = localStorage.getItem('token')
  dispatch({
    type: GET_TOKEN,
    payload: token
  })
}

export const logout = () => dispatch => {
  localStorage.removeItem('token')
  dispatch({
    type: LOGOUT
  })
}

// handler
function handleGetToken(state, action) {
  return update(state, {
    token: {
      $set: action.payload
    }
  })
}

function handleLogout(state, action) {
  return update(state, {
    token: {
      $set: null
    }
  })
}

const INITIAL_STATE = {
  token: null
}

const ACTION_HANDLER = {
  GET_TOKEN: handleGetToken,
  LOGOUT: handleLogout
}

export const AuthReducer = (state = INITIAL_STATE, action) => {
  const handle = ACTION_HANDLER[action.type]

  return handle ? handle(state, action) : state
}

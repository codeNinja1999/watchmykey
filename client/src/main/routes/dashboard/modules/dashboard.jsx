import update from 'react-addons-update'
import constant from './actionConstants'
import networking from '../../../utils/networking'

const {
  LIST_PASSWORD_PROCESSING,
  LIST_PASSWORD_SUCCESS,
  LIST_PASSWORD_ERROR,
  CREATE_PASSWORD_PROCESSING,
  CREATE_PASSWORD_SUCCESS,
  CREATE_PASSWORD_ERROR,
  CREATE_PASSWORD_RESET,
  DELETE_PASSWORD_SUCCESS
} = constant

// action
const listPasswordProcessing = bool => {
  return {
    type: LIST_PASSWORD_PROCESSING,
    payload: bool
  }
}

const createPasswordProcessing = bool => {
  return {
    type: CREATE_PASSWORD_PROCESSING,
    payload: bool
  }
}

export const listPassword = () => (dispatch, getState) => {
  dispatch(listPasswordProcessing(true))
  networking('pm/list', {}, 'GET', getState().auth.token)
    .then(response =>
      dispatch({
        type: LIST_PASSWORD_SUCCESS,
        payload: response
      })
    )
    .catch(err =>
      dispatch({
        type: LIST_PASSWORD_ERROR,
        payload: err
      })
    )
}

export const create = data => (dispatch, getState) => {
  dispatch(createPasswordProcessing(true))
  networking('pm/create', data, 'POST', getState().auth.token)
    .then(response => {
      dispatch({
        type: CREATE_PASSWORD_SUCCESS,
        payload: response
      })
    })
    .catch(err =>
      dispatch({
        type: CREATE_PASSWORD_ERROR,
        payload: err.statusText
      })
    )
}

export const deletePass = data => (dispatch, getState) => {
  networking(`pm/delete/${data}`, {}, 'DELETE', getState().auth.token).then(
    res => {
      dispatch({
        type: DELETE_PASSWORD_SUCCESS,
        payload: data
      })
    }
  )
}

export const setCreatePasswordError = error => dispatch => {
  dispatch({
    type: CREATE_PASSWORD_ERROR,
    payload: error
  })
}

export const resetCreatePassword = () => dispatch => {
  dispatch({
    type: CREATE_PASSWORD_RESET
  })
}

//handler
function handleListPasswordProcessing(state, action) {
  return update(state, {
    listPasswordProcessing: {
      $set: action.payload
    }
  })
}

function handleListPasswordSuccess(state, action) {
  return update(state, {
    listPasswordProcessing: {
      $set: false
    },
    passwords: {
      $set: action.payload.data
    }
  })
}

function handleListPasswordError(state, action) {
  return update(state, {
    listPasswordProcessing: { $set: false },
    error: { $set: true },
    errorMsg: { $set: action.payload }
  })
}

function handleCreatePasswordProcessing(state, action) {
  return update(state, {
    createPasswordProcessing: {
      $set: true
    }
  })
}

function handleCreatePasswordReset(state, action) {
  return update(state, {
    createPasswordProcessing: {
      $set: false
    },
    createPasswordError: {
      $set: false
    },
    createPasswordSuccess: {
      $set: false
    },
    createPasswordErrorMsg: {
      $set: null
    }
  })
}

function handleCreatePasswordSuccess(state, action) {
  return update(state, {
    passwords: {
      $push: [action.payload]
    },
    createPasswordProcessing: {
      $set: false
    },
    createPasswordError: {
      $set: false
    },
    createPasswordSuccess: {
      $set: true
    },
    createPasswordErrorMsg: {
      $set: null
    }
  })
}

function handleCreatePasswordError(state, action) {
  return update(state, {
    createPasswordProcessing: {
      $set: false
    },
    createPasswordError: {
      $set: true
    },
    createPasswordSuccess: {
      $set: false
    },
    createPasswordErrorMsg: {
      $set: action.payload
    }
  })
}

function handleDeletePassword(state, action) {
  const newPasswords = state.passwords.filter(
    password => password._id !== action.payload
  )
  return update(state, {
    passwords: {
      $set: newPasswords
    }
  })
}

const INITIAL_STATE = {
  listPasswordProcessing: true,
  passwords: [],
  error: false,
  errorMsg: null,
  createPasswordProcessing: false,
  createPasswordSuccess: false,
  createPasswordError: false,
  createPasswordErrorMsg: null
}

const ACTION_HANDLER = {
  LIST_PASSWORD_PROCESSING: handleListPasswordProcessing,
  LIST_PASSWORD_SUCCESS: handleListPasswordSuccess,
  LIST_PASSWORD_ERROR: handleListPasswordError,
  CREATE_PASSWORD_PROCESSING: handleCreatePasswordProcessing,
  CREATE_PASSWORD_SUCCESS: handleCreatePasswordSuccess,
  CREATE_PASSWORD_ERROR: handleCreatePasswordError,
  CREATE_PASSWORD_RESET: handleCreatePasswordReset,
  DELETE_PASSWORD_SUCCESS: handleDeletePassword
}

export const DashboardReducer = (state = INITIAL_STATE, action) => {
  const handle = ACTION_HANDLER[action.type]

  return handle ? handle(state, action) : state
}

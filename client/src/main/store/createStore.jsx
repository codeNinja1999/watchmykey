import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import makeReducer from './makeReducer'
import logger from 'redux-logger'

export default (INITIAL_STATE = {}) => {
  const mw = [thunk]

  if (process.env.NODE_ENV === 'development') {
    mw.push(logger)
  }

  const enhancer = []

  const store = createStore(
    makeReducer(),
    INITIAL_STATE,
    compose(
      applyMiddleware(...mw),
      ...enhancer
    )
  )

  return store
}

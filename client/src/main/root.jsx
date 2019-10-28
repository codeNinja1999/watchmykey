import React from 'react'
import AppContainer from './AppContainer'
import routes from './routes/route'
import { Provider } from 'react-redux'
import createStore from './store/createStore'

function Root() {
  return (
    <Provider store={createStore({})}>
      <AppContainer routes={routes} />
    </Provider>
  )
}

export default Root

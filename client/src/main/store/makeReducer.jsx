import { combineReducers } from 'redux'
import { AuthReducer } from '../modules/auth'
import { LoginReducer } from '../routes/login/modules/login'
import { RegisterReducer } from '../routes/register/modules/register'
import { DashboardReducer } from '../routes/dashboard/modules/dashboard'

const makeReducer = () =>
  combineReducers({
    auth: AuthReducer,
    login: LoginReducer,
    register: RegisterReducer,
    dashboard: DashboardReducer
  })

export default makeReducer

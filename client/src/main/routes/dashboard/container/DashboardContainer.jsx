import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard'
import {
  listPassword,
  create,
  setCreatePasswordError,
  resetCreatePassword,
  deletePass
} from '../modules/dashboard'
const mapStateToProps = state => ({
  authToken: state.auth.token,
  listPasswordProcessing: state.dashboard.listPasswordProcessing,
  error: state.dashboard.error,
  errorMsg: state.dashboard.errorMsg,
  passwords: state.dashboard.passwords,
  createPasswordProcessing: state.dashboard.createPasswordProcessing,
  createPasswordError: state.dashboard.createPasswordError,
  createPasswordErrorMsg: state.dashboard.createPasswordErrorMsg,
  createPasswordSuccess: state.dashboard.createPasswordSuccess
})

const mapDispatchToProps = {
  listPassword,
  create,
  setCreatePasswordError,
  resetCreatePassword,
  deletePass
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

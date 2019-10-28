import { connect } from 'react-redux'
import Login from '../components/Login'
import { login, setError, reset } from '../modules/login'
import { getToken } from '../../../modules/auth'
const mapStateToProps = state => ({
  authToken: state.auth.token,
  processing: state.login.processing,
  success: state.login.success,
  error: state.login.error,
  errorMsg: state.login.errorMsg
})

const mapDispatchToProps = {
  getToken,
  login,
  setError,
  reset
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

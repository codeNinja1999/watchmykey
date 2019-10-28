import { connect } from 'react-redux'
import Register from '../components/Register'
import { register, setError, reset } from '../modules/register'
const mapStateToProps = state => ({
  authToken: state.auth.token,
  processing: state.register.processing,
  error: state.register.error,
  errorMsg: state.register.errorMsg,
  success: state.register.success
})

const mapDispatchToProps = {
  register,
  setError,
  reset
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)

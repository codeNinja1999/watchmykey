import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import { getToken } from '../modules/auth'

const mapStateToProps = state => ({
  token: state.auth.token
})

const mapDispatchToProps = {
  getToken
}

class AppContainer extends Component {
  componentWillMount() {
    this.props.getToken()
  }

  renderApplication() {
    return (
      <React.Fragment>
        <Router>{this.props.routes}</Router>
      </React.Fragment>
    )
  }

  render() {
    return this.renderApplication()
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)

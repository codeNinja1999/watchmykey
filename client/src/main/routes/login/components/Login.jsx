import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Form from '../../../components/Form/Form'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import HelperText from '../../../components/HelperText/HelperText'
import { Redirect } from 'react-router-dom'
import { GuestWrapper } from '../../../components/Wrapper/Wrapper'

export default class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  componentDidMount() {
    this.props.reset()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      this.props.getToken()
    }
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onLoginClick = () => {
    const { username, password } = this.state
    if (!username || !password) {
      this.props.setError('All fields are required.')
    } else {
      this.props.login(username, password)
    }
  }

  render() {
    return (
      <GuestWrapper title="Login">
        {this.props.authToken && <Redirect to="/dashboard" />}
        <Form>
          {this.props.error && (
            <HelperText type="error">{this.props.errorMsg}</HelperText>
          )}
          <Input
            value={this.state.username.toLowerCase()}
            name="username"
            type="text"
            placeholder="username"
            onChange={this.onChangeHandler}
          />
          <Input
            value={this.state.password}
            name="password"
            type="password"
            placeholder="password"
            onChange={this.onChangeHandler}
          />
          <Button
            disable={this.props.processing}
            title={this.props.processing ? 'Processing...' : 'Login'}
            onPress={this.onLoginClick}
          />
          <div className="formOptionLink">
            <Link to="/register">Create new account</Link>
          </div>
        </Form>
      </GuestWrapper>
    )
  }
}

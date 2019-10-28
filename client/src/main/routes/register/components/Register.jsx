import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Form from '../../../components/Form/Form'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import HelperText from '../../../components/HelperText/HelperText'
import validEmail from '../../../utils/validEmail'
import { Redirect } from 'react-router-dom'
import { GuestWrapper } from '../../../components/Wrapper/Wrapper'

export default class Register extends Component {
  state = {
    username: '',
    password: '',
    email: ''
  }

  componentWillMount() {
    this.props.reset()
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onRegisterClick = () => {
    const { username, password, email } = this.state
    if (!username || !password || !email) {
      this.props.setError('All fields are required.')
    } else if (username.length < 5 || username.length > 13) {
      this.props.setError('Username must be 5 to 13 character long.')
    } else if (!username.match(/^[0-9a-z]+$/)) {
      this.props.setError(
        'Only alphabets and numbers are accepted for username.'
      )
    } else if (password.length < 6) {
      this.props.setError('Password must be minimum 6 characters long.')
    } else if (!validEmail(email)) {
      this.props.setError('Invalid email syntax.')
    } else {
      this.props.register(this.state)
    }
  }

  render() {
    const success = this.props.success && <Redirect to="/" />
    return (
      <GuestWrapper title="Register">
        {this.props.authToken && <Redirect to="/dashboard" />}

        {success}
        <Form>
          {this.props.error && (
            <HelperText type="error">{this.props.errorMsg}</HelperText>
          )}
          <Input
            disable={this.props.processing}
            value={this.state.username.toLowerCase()}
            name="username"
            type="text"
            placeholder="username"
            onChange={this.onChangeHandler}
          />
          <Input
            disable={this.props.processing}
            value={this.state.email.toLowerCase()}
            name="email"
            type="text"
            placeholder="email"
            onChange={this.onChangeHandler}
          />
          <Input
            disable={this.props.processing}
            value={this.state.password}
            name="password"
            type="password"
            placeholder="password"
            onChange={this.onChangeHandler}
          />
          <Button
            disable={this.props.processing}
            title={this.props.processing ? 'Processing...' : 'Register'}
            onPress={this.onRegisterClick}
          />
          <div className="formOptionLink">
            <Link to="/">Login instead</Link>
          </div>
        </Form>
      </GuestWrapper>
    )
  }
}

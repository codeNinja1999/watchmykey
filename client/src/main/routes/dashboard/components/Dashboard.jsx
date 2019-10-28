import React, { Component } from 'react'
import { AuthWrapper } from '../../../components/Wrapper/Wrapper'
import { Redirect } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import PasswordCard from '../../../components/PasswordCard/PasswordCard'
import Modal from '../../../components/Modal/Modal'
import SaveNewPassword from './SaveNewPassword'
export default class Dashboard extends Component {
  state = {
    saveNewPasswordModal: false,
    url: '',
    username: '',
    password: ''
  }

  componentDidMount() {
    this.props.listPassword(this.props.authToken)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createPasswordSuccess) {
      this.toggleSaveNewPasswordModal()
    }
  }

  toggleSaveNewPasswordModal = () => {
    this.props.resetCreatePassword()
    this.setState({
      saveNewPasswordModal: !this.state.saveNewPasswordModal,
      url: '',
      username: '',
      password: ''
    })
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onCreate = () => {
    const { url, username, password } = this.state
    if (!url || !username || !password) {
      this.props.setCreatePasswordError('All fields are required.')
    } else {
      let secretKey = prompt('Enter account password: ', '')
      if (!secretKey) {
        this.props.setCreatePasswordError('Account password can not be empty.')
      } else {
        this.props.create({
          secretKey,
          entry: {
            url,
            username,
            password
          }
        })
      }
    }
  }

  onDelete = id => {
    this.props.deletePass(id)
  }

  render() {
    return (
      <React.Fragment>
        {this.state.saveNewPasswordModal && (
          <Modal closeModal={this.toggleSaveNewPasswordModal}>
            <SaveNewPassword
              error={this.props.createPasswordError}
              errorMsg={this.props.createPasswordErrorMsg}
              changeHandler={this.onChangeHandler}
              create={this.onCreate}
              processing={this.props.createPasswordProcessing}
            />
          </Modal>
        )}

        <AuthWrapper title="Dashboard">
          {!this.props.authToken && <Redirect to="/" />}
          <Button
            fullWidth
            title="Save new password"
            onPress={this.toggleSaveNewPasswordModal}
          />
          <section>
            {this.props.listPasswordProcessing && 'Loading password..'}
            {!this.props.listPasswordProcessing &&
              this.props.passwords.length === 0 &&
              'No any saved password found.'}
            {this.props.passwords.map(password => (
              <PasswordCard
                delete={this.onDelete.bind(this, password._id)}
                password={password}
                key={password._id}
              />
            ))}
          </section>
        </AuthWrapper>
      </React.Fragment>
    )
  }
}

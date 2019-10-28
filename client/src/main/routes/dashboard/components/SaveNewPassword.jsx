import React from 'react'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Form from '../../../components/Form/Form'
import HelperText from '../../../components/HelperText/HelperText'
export default function SaveNewPassword(props) {
  return (
    <Form>
      <HelperText fullWidth type={props.error ? 'error' : 'info'}>
        {props.error
          ? props.errorMsg
          : 'Fill up the following form to save your password credential.'}
      </HelperText>
      <Input
        onChange={props.changeHandler}
        name="url"
        type="url"
        placeholder="URL (example: https://www.facebook.com)"
        fullWidth
      />
      <Input
        onChange={props.changeHandler}
        name="username"
        type="text"
        placeholder="Username/Email"
        fullWidth
      />
      <Input
        onChange={props.changeHandler}
        name="password"
        type="password"
        placeholder="Password"
        fullWidth
      />
      <Button
        onPress={props.create}
        title={props.processing ? 'saving...' : 'save password'}
        disable={props.processing}
        fullWidth
      />
    </Form>
  )
}

import React, { useState } from 'react'
import { Form, Button, Section, Heading } from 'react-bulma-components'
import userService from '../services/users'
import { useHistory } from 'react-router-dom'

const { Input, Field, Control, Label } = Form

const RegisterForm = () => {

  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
  }

  const validator = () => {
    if (username.length > 1 && password.length > 5 && password === confirmPassword) {
      return true
    }
    return false
  }

  const addUser = (event) => {
    event.preventDefault()
    if (validator()) {
      userService
        .create({ username, password })
        .then(history.push('/'))
        .catch(error => {
          console.log(error)
        })
    }
  }

  return(
    <Section>
      <Heading title='size:3'>Register as a new user</Heading>
      <form onSubmit={addUser}>
        <Field>
          <Label>Username:</Label>
          <Control>
            <Input id="username" value={username}
              onChange={(event) => handleUsernameChange(event)} />
          </Control>
        </Field>
        <Field>
          <Label>Password:</Label>
          <Control>
            <Input type='password' id="password" value={password}
              onChange={(event) => handlePasswordChange(event)} />
          </Control>
        </Field>
        <Field>
          <Label>Confirm Password:</Label>
          <Control>
            <Input type='password' id="password-confirm" value={confirmPassword}
              onChange={(event) => handleConfirmPasswordChange(event)} />
          </Control>
        </Field>
        <Control>
          <Button id="signup-button" type="submit" color="primary">Sign up</Button>
        </Control>
      </form>
    </Section>
  )
}
export default RegisterForm
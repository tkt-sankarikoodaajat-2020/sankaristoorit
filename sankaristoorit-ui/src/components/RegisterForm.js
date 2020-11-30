import React, { useState } from 'react'
import { Form, Button, Section, Heading } from 'react-bulma-components'
import userService from '../services/users'
import { useHistory } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'

const { Input, Field, Control, Label, Help } = Form

const RegisterForm = ({
  login,
  setLoginUsername,
  setLoginPassword
}) => {

  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validators, setValidators] = useState({
    usernameAvailable: true,
    usernameLength: false,
    passwordLength: false,
    passwordsMatch: false
  })

  const debouncedUserCheck = useDebouncedCallback(
    (name) => {
      userService.checkIfUserExists(name)
        .then((response) => {
          if (response.data.usernameAvailable) {
            setValidators({ ...validators, usernameAvailable: true })
          } else {
            setValidators({ ...validators, usernameAvailable: false })
          }
        })
    },
    1000
  )

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
    setLoginUsername(event.target.value)
    if (event.target.value.length > 1) {
      setValidators({ ...validators, usernameLength: true })
      debouncedUserCheck.callback(event.target.value)
    }
    else {
      setValidators({ ...validators, usernameLength: false })
    }
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    setLoginPassword(event.target.value)
    if (event.target.value.length > 5) {
      setValidators({ ...validators, passwordLength: true })
    } else {
      setValidators({ ...validators, passwordLength: false })
    }
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
    if (event.target.value.length > 1 && password===event.target.value) {
      setValidators({ ...validators, passwordsMatch: true })
    } else {
      setValidators({ ...validators, passwordsMatch: false })
    }
  }

  const addUser = (event) => {
    event.preventDefault()
    if (Object.values(validators).every(Boolean)) {
      userService
        .create({ username, password })
        .then(() => {
          login(event)
          history.push('/')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  return(
    <Section>
      <Heading title='size:3'>Register as a new user</Heading>
      <form autoComplete="off" onSubmit={addUser}>
        <Field>
          <Label>Username:</Label>
          <Control>
            <Input color={!validators.usernameAvailable ? 'danger' : username.length > 1 ? 'success' : null } id="username" value={username}
              onChange={(event) => handleUsernameChange(event)} />
          </Control>
          { !validators.usernameLength && username.length > 0 &&
            <Help color="danger">Please enter a username with at least 2 characters</Help>
          }
          { !validators.usernameAvailable &&
            <Help color="danger">This username is not available!</Help>
          }
        </Field>
        <Field>
          <Label>Password:</Label>
          <Control>
            <Input color={validators.passwordLength ? 'success' : password.length > 0 ? 'danger' : null } type='password' id="password" value={password}
              onChange={(event) => handlePasswordChange(event)} />
          </Control>
          { !validators.passwordLength && password.length > 0 &&
            <Help color="danger">Please enter a password with at least 6 characters</Help>
          }
        </Field>
        <Field>
          <Label>Confirm Password:</Label>
          <Control>
            <Input color={validators.passwordsMatch ? 'success' : confirmPassword.length > 0 ? 'danger' : null} type='password' id="password-confirm" value={confirmPassword}
              onChange={(event) => handleConfirmPasswordChange(event)} />
          </Control>
          { !validators.passwordsMatch && confirmPassword.length > 0 &&
            <Help color="danger">Please enter matching passwords</Help>
          }
        </Field>
        <Control>
          { Object.values(validators).every(Boolean) ?
            <Button id="signup-button" type="submit" color="primary">Sign up</Button>
            :
            <Button id="signup-button" type="submit" disabled color="light">Sign up</Button>
          }
        </Control>
      </form>
    </Section>
  )
}
export default RegisterForm
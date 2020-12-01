import React from 'react'
import { Form, Button, Section, Heading } from 'react-bulma-components'

const { Input, Field, Control, Label } = Form

const LoginForm = ({
  login,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange
}) => {
  return (
    <Section>
      <Heading title='size:3'>
        Login
      </Heading>
      <form onSubmit={login} autoComplete="off">
        <Field>
          <Label>Username:</Label>
          <Control>
            <Input type="text" id="username" value={username}
              onChange={(event) => handleUsernameChange(event)} required />
          </Control>
        </Field>
        <Field>
          <Label>Password:</Label>
          <Control>
            <Input type="password" id="password" value={password}
              onChange={(event) => handlePasswordChange(event)} required />
          </Control>
        </Field>
        <Control>
          <Button id="login-button" type="submit" color="primary">Login</Button>
        </Control>
      </form>
    </Section>
  )
}

export default LoginForm
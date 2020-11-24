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
      <Heading subtitle size={3}>
        Login
      </Heading>
      <form onSubmit={login} autoComplete="off">
        <Field>
          <Label>Username:</Label>
          <Control>
            <Input type="text" id="username" value={username}
              onChange={handleUsernameChange} required />
          </Control>
        </Field>
        <Field>
          <Label>Password:</Label>
          <Control>
            <Input type="password" id="password" value={password}
              onChange={handlePasswordChange} required />
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
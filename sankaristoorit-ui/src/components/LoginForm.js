import React from 'react'
import { Form, Button, Section, Heading } from 'react-bulma-components'

const { Input, Field, Control, Label } = Form

const LoginForm = (props) =>
  <Section>
    <Heading subtitle size={3}>
        Login
    </Heading>
    <form onSubmit={props.login}></form>
    <Field>
      <Label>Username:</Label>
      <Control>
        <Input type="text" id="username" value={props.username}
          onChange={props.handleUsernameChange} required />
      </Control>
    </Field>
    <Field>
      <Label>Password:</Label>
      <Control>
        <Input type="password" id="password" value={props.password}
          onChange={props.handlePasswordChange} required />
      </Control>
    </Field>
    <Control>
      <Button id="login-button" type="submit" color="primary">Login</Button>
    </Control>
  </Section>

export default LoginForm
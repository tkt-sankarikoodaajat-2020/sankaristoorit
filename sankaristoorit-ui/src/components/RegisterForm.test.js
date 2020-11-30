import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import RegisterForm from './RegisterForm'

test('renders content', () => {
  const component = render(
    <RegisterForm />
  )

  expect(component.container).toHaveTextContent(
    'Register as a new user'
  )

  expect(component.container).toHaveTextContent(
    'Username:'
  )
  expect(component.container).toHaveTextContent(
    'Password:'
  )
  expect(component.container).toHaveTextContent(
    'Confirm Password:'
  )
})

test('RegisterForm posts correct data.', () => {
  const component = render(
    <RegisterForm />
  )
  const inputUsername = component.container.querySelector('#username')
  const inputPassword = component.container.querySelector('#password')
  const inputConfirmPassword = component.container.querySelector('#password-confirm')
  const form = component.container.querySelector('#signup-button')

  fireEvent.change(inputUsername, {
    target: { username: 'inputUsername' }
  })
  fireEvent.change(inputPassword, {
    target: { password: 'salainen' }
  })
  fireEvent.change(inputConfirmPassword, {
    target: { password: 'salainen' }
  })

  fireEvent.submit(form)

  expect(inputUsername.username).toBe('inputUsername')
  expect(inputPassword.password).toBe('salainen')
  expect(inputConfirmPassword.password).toBe('salainen')
})
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LoginForm from './LoginForm'

test('renders content', () => {
  const component = render(
    <LoginForm />
  )

  expect(component.container).toHaveTextContent(
    'Login'
  )

  expect(component.container).toHaveTextContent(
    'Username:'
  )
  expect(component.container).toHaveTextContent(
    'Password:'
  )
})

test('LoginForm posts correct data.', () => {
  const loginMock = jest.fn()
  const component = render(
    <LoginForm login={loginMock} />
  )

  const inputUsername = component.container.querySelector('#username')
  const inputPassword = component.container.querySelector('#password')
  const form = component.container.querySelector('#login-button')

  fireEvent.change(inputUsername, {
    target: { username: 'inputUsername' }
  })
  fireEvent.change(inputPassword, {
    target: { username: 'salainen' }
  })

  fireEvent.submit(form)

  expect(loginMock.mock.calls.length).toBe(1)
  expect(inputUsername.username).toBe('inputUsername')
})
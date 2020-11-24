import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LoginForm from './LoginForm'

test('renders content', () => {
  const component = render(
    <LoginForm />
  )
  expect(component.container).toHaveTextContent(
    'Login',
    'Username:',
    'Password:'
  )
})

test('clicking the login works correclty', async () => {
  const username = 'username'
  const password = 'password'

  const mockHandler = jest.fn()

  const component = render(
    <LoginForm login={mockHandler} username={username} password={password} />
  )
  const button = component.container.querySelector('#login-button')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

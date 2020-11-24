import React from 'react'
import { render } from '@testing-library/react'
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
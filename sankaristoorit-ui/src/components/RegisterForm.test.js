import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import RegisterForm from './RegisterForm'
import { act } from 'react-dom/test-utils'

test('renders content', () => {
  const login = jest.fn()
  const user = jest.fn()
  const pass = jest.fn()
  const component = render(
    <RegisterForm login={login}
      setLoginUsername={user}
      setLoginPassword={pass} />
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

test('RegisterForm displays validation errors.', () => {
  const login = jest.fn()
  const user = jest.fn()
  const pass = jest.fn()
  const component = render(
    <RegisterForm login={login}
      setLoginUsername={user}
      setLoginPassword={pass} />
  )

  const inputUsername = component.container.querySelector('#username')
  const inputPassword = component.container.querySelector('#password')
  const inputConfirmPassword = component.container.querySelector('#password-confirm')
  const form = component.container.querySelector('#signup-button')

  fireEvent.change(inputUsername, {
    target: { value: 'i' }
  })
  fireEvent.change(inputPassword, {
    target: { value: 'salai' }
  })
  fireEvent.change(inputConfirmPassword, {
    target: { value: 'salain' }
  })

  const validations = component.container.querySelectorAll('.help.is-danger')
  expect(validations.length).toEqual(3)

  expect(form).toHaveClass('is-light')
})

test('RegisterForm validates username through API.', async () => {
  const login = jest.fn()
  const user = jest.fn()
  const pass = jest.fn()
  const component = render(
    <RegisterForm login={login}
      setLoginUsername={user}
      setLoginPassword={pass} />
  )

  const inputUsername = component.container.querySelector('#username')
  await act( async () => {
    await fireEvent.change(inputUsername, {
      target: { value: 'testuser' }
    })
    await new Promise((r) => setTimeout(r, 1000))
  })
  // console.log(prettyDOM(component.container.querySelector('form')))
  expect(inputUsername).toHaveClass('is-success')

})

test('Login callback is called upon successful registratrion', async () => {
  const login = jest.fn()
  const user = jest.fn()
  const pass = jest.fn()
  const component = render(
    <RegisterForm login={login}
      setLoginUsername={user}
      setLoginPassword={pass} />
  )

  const inputUsername = component.container.querySelector('#username')
  const inputPassword = component.container.querySelector('#password')
  const inputConfirmPassword = component.container.querySelector('#password-confirm')
  const form = component.container.querySelector('#signup-button')
  await act(async () => {
    await fireEvent.change(inputUsername, {
      target: { value: 'testuser' + Math.floor(Math.random() * 1000) }
    })
    await fireEvent.change(inputPassword, {
      target: { value: 'salainen' }
    })
    await fireEvent.change(inputConfirmPassword, {
      target: { value: 'salainen' }
    })
    await fireEvent.submit(form)
    await await new Promise((r) => setTimeout(r, 1000))
  })

  expect(login).toHaveBeenCalled()

})
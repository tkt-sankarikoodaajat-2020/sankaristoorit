import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Tip from './Tip'

const user = {
  username: 'testman',
  id: 10
}

const tip = {
  id: 1,
  title: 'Header',
  user: 10
}

test('renders content', () => {
  const component = render(
    <Tip tip={tip} user={user} />
  )

  expect(component.container).toHaveTextContent(
    'Header'
  )
})

test('clicking the delete-button calls event handler once', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <Tip tip={tip} deleteTip={mockHandler} user={user} />
  )

  const button = component.getByText('Delete')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
test('does not render delete-button if not owner', async () => {
  const wrongUser = {
    username: 'Leipuri',
    id: 100
  }
  const mockHandler = jest.fn()

  const component = render(
    <Tip tip={tip} deleteTip={mockHandler} user={wrongUser} />
  )
  expect(component.container).not.toHaveTextContent('Delete')
})

test('clicking the edit-button does not call updateTip()', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <Tip tip={tip} updateTip={mockHandler} user={user} />
  )

  const button = component.getByText('Edit tip')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(0)
})

test('does not render edit-button if not owner', async () => {
  const wrongUser = {
    username: 'Hupiukko',
    id: 26
  }
  const mockHandler = jest.fn()

  const component = render(
    <Tip tip={tip} upddateTip={mockHandler} user={wrongUser} />
  )
  expect(component.container).not.toHaveTextContent('Edit Tip')
})
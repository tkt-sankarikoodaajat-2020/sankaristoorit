import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Error from './Error'

const error = {
  error: 'something went awry',
  id: 'test'
}

test('renders content', () => {
  const component = render(
    <Error error={error} />
  )

  expect(component.container).toHaveTextContent(
    'something went awry'
  )
})

test('clicking the delete-button calls event handler once', async () => {
  const mockHandler = jest.fn()

  const component = render (
    <Error error={error} dismissError={mockHandler} />
  )

  const button = component.getByText('Delete')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

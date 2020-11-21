import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Tip from './Tip'

const tip = {
  id: 1,
  title: 'Header'
}

test('renders content', () => {
  const component = render(
    <Tip tip={tip} />
  )

  expect(component.container).toHaveTextContent(
    'Header'
  )
})

test('clicking the delete-button calls event handler once', async () => {
  const mockHandler = jest.fn()

  const component = render (
    <Tip tip={tip} deleteTip={mockHandler} />
  )

  const button = component.getByText('Delete')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
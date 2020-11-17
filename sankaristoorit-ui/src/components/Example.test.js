import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Example from './Example'

test('renders content', () => {
  const component = render(
    <Example />
  )

  expect(component.container).toHaveTextContent(
    'Hello world!'
  )
})
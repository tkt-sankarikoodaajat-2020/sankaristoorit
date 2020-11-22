import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import ErrorBox from './ErrorBox'

const errors = [
  {
    id: 'test',
    error: 'err one'
  },
  {
    id: 'test2',
    error: 'err two'
  }
]

test('renders content', () => {
  const component = render(
    <ErrorBox errors={errors} />
  )

  expect(component.container).toHaveTextContent(
    'err one'
  )
  expect(component.container).toHaveTextContent(
    'err two'
  )
})

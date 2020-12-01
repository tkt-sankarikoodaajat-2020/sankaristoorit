import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import TipList from './TipList'

const tips = [
  {
    id: 1,
    title: 'Header 1'
  },
  {
    id: 2,
    title: 'Header 2'
  }
]
const user = {
  username: 'testman',
  id: 10
}

test('renders content', () => {
  const component = render(
    <TipList tips={tips} user={user} />
  )

  expect(component.container).toHaveTextContent(
    'Header 1'
  )
  expect(component.container).toHaveTextContent(
    'Header 2'
  )
})
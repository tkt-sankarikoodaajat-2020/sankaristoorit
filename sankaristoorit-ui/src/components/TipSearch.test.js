import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import TipSearch from './TipSearch'

test('Search bar renders correctly', () => {
  const handler = jest.fn()

  const component = render(
    <TipSearch handler={handler}/>
  )

  const inputFilter = component.container.querySelector('#filterInput')

  fireEvent.change(inputFilter, {
    target: { value: 'myfilter' }
  })

  expect(inputFilter.value).toBe(
    'myfilter'
  )
})
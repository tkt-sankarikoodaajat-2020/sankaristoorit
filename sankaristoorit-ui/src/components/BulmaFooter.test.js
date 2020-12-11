import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import BulmaFooter from './BulmaFooter'

test('renders content', () => {
  const component = render(
    <BulmaFooter />
  )
  expect(component.container).toHaveTextContent(
    'Ohjelmistotuotanto 2020, Helsingin Yliopisto. The source code is licensed MIT.'
  )
})
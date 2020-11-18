import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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
/*
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TipForm from './TipForm'

test('TipForm sends correct data.', () => {
    const createTip = jest.fn()
    const component = render(
        <TipForm addTip={createTip} />
    )

    const input = component.container.querySelector('#title')
    const form = component.container.querySelector('#form')

    fireEvent.change(input, {
        target: { value: 'Heroes' }
    })

    fireEvent.submit(form)

    expect(tip.mock.calls.length).toBe(1)
    expect(createNote.mock.calls[0][0].content).toBe('Heroes')
})
*/

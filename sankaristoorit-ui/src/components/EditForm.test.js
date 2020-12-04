import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import EditForm from './EditForm'

test('renders content', () => {
  const component = render(
      <EditForm />
  )
  expect(component.container).toHaveTextContent('New Title:')
  expect(component.container).toHaveTextContent('New Url:')
  expect(component.container).toHaveTextContent('Update')
})

test('EditForm posts correct data', () => {
  const updateMock = jest.fn()
  const title = 'original title'
  const url = 'original url'
  const titleHandlerMock = jest.fn()
  const urlHandlerMock = jest.fn()
  const component = render(
    <EditForm 
      updateTip={updateMock}
      title={title}
      url={url}
      handleTitleEdit={titleHandlerMock}
      handleUrlEdit={urlHandlerMock} />
  )

  const input = component.container.getElementsByClassName('titleInput')[0]
  const urlInput = component.container.getElementsByClassName('urlInput')[0]
  const submit = component.container.getElementsByClassName('updateButton')[0]
  
  fireEvent.change(input, {
      target: { title: 'EditedTitle' }
  })

  fireEvent.change(urlInput, {
      target: { url: 'https://alwaysjudgeabookbyitscover.com/'}
  })

  fireEvent.submit(submit)
  expect(updateMock.mock.calls.length).toBe(1)
  expect(input.title).toBe('EditedTitle')
  expect(urlInput.url).toBe('https://alwaysjudgeabookbyitscover.com/')
})
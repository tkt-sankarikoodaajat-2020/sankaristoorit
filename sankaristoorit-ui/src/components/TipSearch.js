import React, { useState } from 'react'
import { Form, Icon } from 'react-bulma-components'
import { useDebouncedCallback } from 'use-debounce'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const { Field, Control, Input } = Form

const TipSearch = ({ handler }) => {

  const [filterString, setFilterString] = useState('')

  const debouncedHandler = useDebouncedCallback(
    (filterString) => {
      handler(filterString)
    },
    200
  )

  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
    debouncedHandler.callback(event.target.value)
  }

  return (
    <Field className='is-horizontal'>
      <Control iconLeft iconRight>
        <Input type="text" placeholder="Filter tips" onChange={handleFilterChange} value={filterString}/>
        <Icon align="left"><FontAwesomeIcon icon={ faSearch } /></Icon>
      </Control>
    </Field>
  )
}

export default TipSearch

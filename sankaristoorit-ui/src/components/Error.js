import React from 'react'
import { Button, Notification } from 'react-bulma-components'

const Error = ({ error, dismissError }) => {
  return (
    <Notification className='is-danger'>
      <div>{error.error}</div>
      <Button className='delete' onClick={() => dismissError(error.id)}>Delete</Button>
    </Notification>
  )
}

export default Error
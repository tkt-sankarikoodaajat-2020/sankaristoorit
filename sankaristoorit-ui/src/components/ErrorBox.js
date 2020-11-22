import React from 'react'
import Error from './Error'
import { Section } from 'react-bulma-components'

const ErrorBox = ({ errors, dismissError }) => {
  console.log(errors)

  if (errors.length === 0) {
    return (<></>)
  }

  const list = errors.map(e => {
    return (<Error key={e.id} error={e} dismissError={dismissError} />)
  })

  console.log(list)

  return (
    <Section>
      {list}
    </Section>
  )
}

export default ErrorBox
import React from 'react'
import { Section, Button } from 'react-bulma-components'

const UrlOrNot = ( { url } ) => {
  if (url !== null) {
    return <p className='message-body'>{url}</p>
  }
  return <p className='message-body'></p>
}

const Tip = ({ tip, deleteTip }) => {

  return (
    <Section>
      <li className='message is-primary'>
        <h2 className='message-header'>{tip.title}<Button className='delete' onClick={() => deleteTip(tip.id)}>Delete</Button></h2>
        <UrlOrNot url={tip.url} />
      </li>
    </Section>
  )
}

export default Tip
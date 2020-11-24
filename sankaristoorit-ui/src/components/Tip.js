import React from 'react'
import { Section, Button } from 'react-bulma-components'

const Tip = ({ tip, deleteTip }) => {

  return (
    <Section>
      <li className='message is-primary'>
        <h2 className='message-header'>{tip.title}<Button id="delete-button" className='delete' onClick={() => deleteTip(tip.id)}>Delete</Button></h2>
        <p className='message-body'>message placeholder</p>
      </li>
    </Section>
  )
}

export default Tip
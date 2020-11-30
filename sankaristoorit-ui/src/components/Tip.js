import React from 'react'
import { Section, Button } from 'react-bulma-components'


const UrlOrNot = ( { url } ) => {
  if (url !== null && url !== '') {
    return <p className='message-body'>{url}</p>
  }
  return <p className='message-body'></p>
}

const LinkOrHeader = ( { url, title, id, deleteTip } ) => {
  if (url !== null && url !== '') {
    return <h2 className='message-header'><a href={url}>{title}</a><Button className='delete' onClick={() => deleteTip(id)}>Delete</Button></h2>
  }
  return <h2 className='message-header'>{title}<Button className='delete' onClick={() => deleteTip(id)}>Delete</Button></h2>
}

const Tip = ({ tip, deleteTip }) => {


  return (
    <Section>
      <li className='message is-primary'>
        <LinkOrHeader url={tip.url} title={tip.title} id={tip.id} deleteTip={deleteTip} />
        <UrlOrNot url={tip.url} />
      </li>
    </Section>
  )
}

export default Tip
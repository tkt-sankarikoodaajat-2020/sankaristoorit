import React from 'react'
import { Section, Button } from 'react-bulma-components'


const UrlOrNot = ({ url }) => {
  if (url !== null && url !== '') {
    return <p className='message-body'>{url}</p>
  }
  return <p className='message-body'></p>
}
const RenderDelete = ({ tip, deleteTip, user }) => {
  if (user !== null) {
    if (tip.user === user.id) {
      return <Button className='Delete' onClick={() => deleteTip(tip.id)}>Delete</Button>
    }
    return <span></span>
  }
  return <span></span>
}

const LinkOrHeader = ({ tip, deleteTip, user }) => {
  if (tip.url !== null && tip.url !== '') {
    return <h2 className='message-header'><a href={tip.url}>{tip.title}</a><RenderDelete tip={tip} user={user} deleteTip={deleteTip} /></h2>
  }
  return <h2 className='message-header'>{tip.title}<RenderDelete tip={tip} user={user} deleteTip={deleteTip} /></h2>
}
const Tip = ({ tip, deleteTip, user }) => {

  return (
    <Section>
      <li className='message is-primary'>
        <LinkOrHeader tip={tip} deleteTip={deleteTip} user={user} />
        <UrlOrNot url={tip.url} />
      </li>
    </Section>
  )
}

export default Tip
import React, { useState } from 'react'
import { Section, Button } from 'react-bulma-components'
import EditForm from './EditForm'


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
  }
  return <span></span>
}

const RenderEdit = ({ tip, openEditForm, user }) => {
  if (user !== null) {
    if (tip.user === user.id) {
      return <Button onClick={() => openEditForm()}>Edit tip</Button>
    }
  }
  return <span></span>
}

const LinkOrHeader = ({ tip, deleteTip, user, openEditForm }) => {
  if (tip.url !== null && tip.url !== '') {
    return <h2 className='message-header'>
      <a href={tip.url} rel='noreferrer' target='_blank'>{tip.title}</a>
      <div className='buttons'>
        <RenderEdit tip={tip}
          user={user}
          openEditForm={openEditForm} />
        <RenderDelete tip={tip}
          user={user}
          deleteTip={deleteTip} />
      </div>
    </h2>
  }
  return <h2 className='message-header'>{tip.title}
    <div className='buttons'>
      <RenderEdit tip={tip}
        user={user}
        openEditForm={openEditForm} />
      <RenderDelete tip={tip}
        user={user}
        deleteTip={deleteTip} />
    </div>
  </h2>
}
const Tip = ({ tip, deleteTip, user, updateTip }) => {

  const [title, setTitle] = useState(tip.title)
  const [url, setUrl] = useState(tip.url)
  const [showEdit, setShowEdit] = useState(false)

  const handleTitleEdit = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlEdit = (event) => {
    setUrl(event.target.value)
  }

  const openEditForm = () => {
    setShowEdit(true)
  }

  const update = (event) => {
    event.preventDefault()
    updateTip(tip.id, title, url)
    setShowEdit(false)
  }

  if(showEdit) {
    return (
      <Section>
        <li className='message is-primary'>
          <LinkOrHeader tip={tip} deleteTip={deleteTip} user={user} openEditForm={openEditForm} />
          <UrlOrNot url={tip.url} />
        </li>
        <li>
          <EditForm updateTip={update}
            title={title}
            url={url}
            handleTitleEdit={handleTitleEdit}
            handleUrlEdit={handleUrlEdit}/>
        </li>
      </Section>
    )
  } else {
    return (
      <Section>
        <li className='message is-primary'>
          <LinkOrHeader tip={tip} deleteTip={deleteTip} user={user} openEditForm={openEditForm} />
          <UrlOrNot url={tip.url} />
        </li>
      </Section>
    )
  }
}

export default Tip
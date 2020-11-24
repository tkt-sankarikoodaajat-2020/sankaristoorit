import React, { useState, useEffect } from 'react'
import TipList from './components/TipList'
import tipService from './services/tips'
import TipForm from './components/TipForm'
import LoginForm from './components/LoginForm'
import ErrorBox from './components/ErrorBox'

import { Hero, Heading, Section, Container } from 'react-bulma-components'

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [tips, setTips] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [errorMsgs, setErrorMsgs] = useState([])

  useEffect(() => {
    tipService
      .getAll()
      .then(initialTips => {
        setTips(initialTips)
      })
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const login = (event) => {
    event.preventDefault()
    console.log('login pressed')
    const userObject = {
      username: username,
      password: password
    }
    console.log(userObject)
  }

  const addTip = (event) => {
    event.preventDefault()
    const tipObject = {
      title: newTitle,
    }

    tipService
      .create(tipObject)
      .then(res => {
        setTips(tips.concat(res))
        setNewTitle('')
      })
      .catch(error => addError('add', error))
  }

  const deleteTip = (id) => {
    tipService
      .remove(id)
      .catch(error => addError('delete', error))
    setTips(tips.filter(t => t.id !== id))
  }

  const addError = (id, error) => {
    setErrorMsgs(
      errorMsgs.filter(e => e.id !== id)
        .concat({ error: error.response.data.error || 'unknown error', id: id })
    )
  }

  const dismissError = (id) => {
    setErrorMsgs(errorMsgs.filter(e => e.id !== id))
  }



  return (
    <Container>
      <Section>
        <Hero color="primary" >
          <Hero.Body>
            <Container>
              <Heading>
                Sankaristoorit
              </Heading>
              <Heading subtitle size={3}>
                Ohjelmistotuotanto, syksy 2020
              </Heading>
            </Container>
          </Hero.Body>
        </Hero>
      </Section>
      <Section>
        <ErrorBox errors={errorMsgs} dismissError={dismissError} />
        <LoginForm login={login} username={username} password={password} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange}></LoginForm>
        <TipForm addTip={addTip} newTitle={newTitle}
          handleTitleChange={handleTitleChange} />
        <TipList tips={tips} deleteTip={deleteTip} />
      </Section>
    </Container >
  )
}

export default App

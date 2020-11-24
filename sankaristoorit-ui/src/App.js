import React, { useState, useEffect } from 'react'
import TipList from './components/TipList'
import tipService from './services/tips'
import TipForm from './components/TipForm'
import LoginForm from './components/LoginForm'
import ErrorBox from './components/ErrorBox'

import { Hero, Heading, Section, Container, Button } from 'react-bulma-components'

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const userJSON = JSON.parse(loggedUser)
      setUser(userJSON)
    }
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

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    setUser(username)
    window.localStorage.setItem('user', JSON.stringify(username))
  }
  const handleLogout = (event) => {
    event.preventDefault()
    console.log('clear local storage')
    window.localStorage.clear()
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

  const renderLogin = () => (
    <LoginForm login={handleLogin}
      username={username}
      password={password}
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange} />

  )

  const renderTip = () => (
    <TipForm addTip={addTip} newTitle={newTitle}
      handleTitleChange={handleTitleChange} />
  )
  const renderLogout = () => (
    <form onSubmit={handleLogout}>
      <p>Logged in as {user}</p>
      <Button id="logout-button" type="submit" color="secondary">Logout</Button>
    </form>
  )


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
              {user !== null && renderLogout()}
            </Container>
          </Hero.Body>
        </Hero>
      </Section>
      <Section>
        <ErrorBox errors={errorMsgs} dismissError={dismissError} />
        {user === null ? renderLogin() : renderTip()}

        <TipList tips={tips} deleteTip={deleteTip} />
      </Section>
    </Container >
  )
}

export default App

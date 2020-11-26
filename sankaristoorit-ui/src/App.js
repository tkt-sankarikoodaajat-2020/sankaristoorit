import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import TipList from './components/TipList'
import tipService from './services/tips'
import loginService from './services/login'
import TipForm from './components/TipForm'
import LoginForm from './components/LoginForm'
import ErrorBox from './components/ErrorBox'
import RegisterForm from './components/RegisterForm'

import { Hero, Heading, Section, Container, Button } from 'react-bulma-components'

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [tips, setTips] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMsgs, setErrorMsgs] = useState([])

  useEffect(() => {
    tipService
      .getAll()
      .then(initialTips => {
        setTips(initialTips)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
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

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userObject = await loginService.login({
        username, password,
      })
      localStorage.setItem('token', userObject.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(userObject))
      console.log('logged in as', username)
      setUser(userObject)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('exception loging in', exception)
      setUsername('')
      setPassword('')
    }
  }
  const handleLogout = () => {
    console.log('logout')
    window.localStorage.clear()
    setUser(null)
  }

  const addTip = (event) => {
    event.preventDefault()
    const tipObject = {
      title: newTitle,
      url: newUrl,
    }

    if (tipObject.url === '') {
      tipObject.url = null
    }

    tipService
      .create(tipObject)
      .then(res => {
        setTips(tips.concat(res))
        setNewTitle('')
        setNewUrl('')
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
    <Router>
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
          <Link to="/"><Button color="link">Home</Button></Link>
          <Link to="/register"><Button color="link">Register</Button></Link>
          {user !== null &&
            <Button onClick={handleLogout}>Logout</Button>}
        </Section>
        <Switch>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <Route path="/">
            <Section>
              <ErrorBox errors={errorMsgs} dismissError={dismissError} />
              {user === null &&
                <LoginForm login={handleLogin}
                  username={username}
                  password={password}
                  handleUsernameChange={handleUsernameChange}
                  handlePasswordChange={handlePasswordChange} />}
              <TipForm addTip={addTip} newTitle={newTitle}
                handleTitleChange={handleTitleChange} newUrl={newUrl}
                handleUrlChange={handleUrlChange} />
              <TipList tips={tips} deleteTip={deleteTip} />
            </Section>
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}

export default App

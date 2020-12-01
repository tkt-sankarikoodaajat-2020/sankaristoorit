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

import { Hero, Heading, Section, Container, Button, Navbar } from 'react-bulma-components'

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
      <Navbar role="navigation" fixed="top" color="dark">
        <Container>
          <div className="navbar-item"><img src={process.env.PUBLIC_URL + '/logo192.png'} /></div>
          <Link className="navbar-item" to="/"><Button size="small" color="link">Home</Button></Link>
          <Link className="navbar-item" to="/login"><Button size="small" color="link">Login</Button></Link>
          {user === null ?
            <Link className="navbar-item" to="/register"><Button size="small" color="link">Register</Button></Link>
            :
            <div className="navbar-item"><Button size="small" color="danger" onClick={handleLogout}>Logout</Button></div>
          }
        </Container>
      </Navbar>
      <Container>
        <Hero color="primary">
          <br></br>
          <Hero.Body>
            <Heading subtitle size={1}>
              Sankaristoorit
            </Heading>
            <Heading subtitle size={2}>
              Ohjelmistotuotanto, syksy 2020
            </Heading>
          </Hero.Body>
          <br></br>
        </Hero>
        <Switch>
          <Route path="/register">
            {user === null &&
              <RegisterForm login={handleLogin}
                setLoginUsername={setUsername}
                setLoginPassword={setPassword} />}
          </Route>
          <Route path="/login">
            {user === null ?
              <LoginForm login={handleLogin}
                username={username}
                password={password}
                handleUsernameChange={handleUsernameChange}
                handlePasswordChange={handlePasswordChange} />
              :
              <Section>
                <Heading>You are logged in as: {user.username}</Heading>
                <Button size="small" color="danger" onClick={handleLogout}>Logout</Button>
              </Section>
            }
          </Route>
          <Route path="/">
            <ErrorBox errors={errorMsgs} dismissError={dismissError} />
            <TipForm addTip={addTip} newTitle={newTitle}
              handleTitleChange={handleTitleChange} newUrl={newUrl}
              handleUrlChange={handleUrlChange}
              disabled={user === null} />
            <TipList tips={tips} deleteTip={deleteTip} />
          </Route>
        </Switch>
      </Container >
    </Router >
  )
}

export default App

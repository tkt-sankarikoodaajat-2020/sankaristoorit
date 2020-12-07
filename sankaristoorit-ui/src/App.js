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

  const handleUrlChange = async (event) => {
    setNewUrl(event.target.value)
    if ((!newTitle || newTitle.length < 1) && event.target.value) {
      const searchTitle = await tipService.get_title(event.target.value)
      setNewTitle(searchTitle)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userObject = await loginService.login({
        username, password,
      })
      localStorage.setItem('token', userObject.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(userObject))
      console.log('logged in as', userObject.username)
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

  const updateTip = (id, editedTitle, editedUrl) => {
    const tipObject = tips.find(t => t.id === id)
    const updatedTip = { ...tipObject, title: editedTitle, url: editedUrl }

    tipService
      .update(id, updatedTip)
      .then(res => {
        setTips(tips.map(tip => tip.id !== id ? tip : res.data))
      })
      .catch(error => addError('update', error))
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

  const LoggedOut = () => (
    <Container>
      <div className="navbar-item"><img src={process.env.PUBLIC_URL + '/logo192.png'} /></div>
      <Link className="navbar-item" to="/"><Button id="home-button" size="small" color="link">Home</Button></Link>
      <Link className="navbar-item" to="/login"><Button size="small" color="link">Login</Button></Link>
      <Link className="navbar-item" to="/register"><Button size="small" color="link">Register</Button></Link>
    </Container>
  )

  const LoggedIn = () => (
    <Container>
      <div className="navbar-item"><img src={process.env.PUBLIC_URL + '/logo192.png'} /></div>
      <Link className="navbar-item" to="/"><Button id="home-button" size="small" color="link">Home</Button></Link>
      <div className="navbar-item navbar-end"><Button size="small" color="danger" onClick={handleLogout}>Logout</Button></div>
    </Container>
  )

  return (
    <Router>
      <Navbar role="navigation" fixed="top" color="dark">
        {user ? LoggedIn() : LoggedOut()}
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
            {!user &&
              <RegisterForm login={handleLogin}
                setLoginUsername={setUsername}
                setLoginPassword={setPassword} />}
          </Route>
          <Route path="/login">
            {!user ?
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
              disabled={!user} />
            <TipList tips={tips} deleteTip={deleteTip} updateTip={updateTip} user={user} />
          </Route>
        </Switch>
      </Container >
    </Router >
  )
}

export default App

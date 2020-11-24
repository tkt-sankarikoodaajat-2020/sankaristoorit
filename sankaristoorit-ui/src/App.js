import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import TipList from './components/TipList'
import tipService from './services/tips'
import TipForm from './components/TipForm'
import ErrorBox from './components/ErrorBox'
import RegisterForm from './components/RegisterForm'

import { Hero, Heading, Section, Container, Button } from 'react-bulma-components'

const App = () => {

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

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
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
        </Section>
        <Switch>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <Route path="/">
            <Section>
              <ErrorBox errors={errorMsgs} dismissError={dismissError} />
              <Heading subtitle size={3}>
          Create a new tip
              </Heading>
              <TipForm addTip={addTip} newTitle={newTitle}
                handleTitleChange={handleTitleChange} />
              <Heading subtitle size={3}>
          Tips
              </Heading>
              <TipList tips={tips} deleteTip={deleteTip} />
            </Section>
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}

export default App

import React, { useState, useEffect } from 'react'
import TipList from './components/TipList'
import tipService from './services/tips'
import TipForm from './components/TipForm'

import { Hero, Heading, Section, Container } from 'react-bulma-components'

const App = () => {

  const [tips, setTips] = useState([])
  const [newTitle, setNewTitle] = useState('')

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
  }

  const deleteTip = (id) => {
    tipService
      .remove(id)
    setTips(tips.filter(t => t.id !== id))
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
    </Container>
  )
}

export default App

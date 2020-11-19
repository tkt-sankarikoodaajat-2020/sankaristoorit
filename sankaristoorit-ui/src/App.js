import React, { useState, useEffect } from 'react'
import TipList from './components/TipList'
import tipService from './services/tips'
import TipForm from './components/TipForm'

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

 
  return (
    <div> 
      <h2>Create a new tip</h2>
      <TipForm addTip={addTip} newTitle={newTitle}
      handleTitleChange={handleTitleChange} />
      <h1>Tips</h1>
      <TipList tips={tips} />
    </div>
  )
}

export default App;

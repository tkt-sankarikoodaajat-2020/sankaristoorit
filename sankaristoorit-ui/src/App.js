import React, { useState, useEffect } from 'react'
import TipList from './components/TipList'
import tipService from './services/tips'

const App = () => {

  const [tips, setTips] = useState([])

  useEffect(() => {
    tipService
      .getAll()
      .then(initialTips => {
        setTips(initialTips)
      })
  }, [])

  return (
    <div>
      <h1>Tips</h1>
      <TipList tips={tips} />
    </div>
  )
}

export default App;

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TipList from './components/TipList'

const App = () => {

  const [tips, setTips] = useState([])
  const url = 'http://localhost:3001/tips'

  const testList = [
    {
      title: 'test',
      id: 1
    },
    {
      title: 'test 2',
      id: 2
    }
  ]

  useEffect(() => {
    axios
      .get(url)
      .then(res => {
        console.log(res)
        setTips(testList)
      })
      .catch(err => {
        // handle error in the far future
        setTips(testList)
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

import React, { useState } from 'react'
import Tip from './Tip'

import { Section, Heading, Level } from 'react-bulma-components'
import TipSearch from './TipSearch'
import { Form } from 'react-bulma-components'

const { Label, Checkbox } = Form

const TipList = ({ tips, deleteTip, user }) => {
  const [filterString, setFilterString] = useState('')
  const [showOwn, setShowOwn] = useState(false)

  const searchHandler = (filterString) => {
    setFilterString(filterString.toLowerCase())
  }

  const checkboxHandler = (event) => {
    setShowOwn(event.target.checked)
  }

  const tipsFilter = (item) => {
    if (filterString !== '') {
      if (item.title.toLowerCase().includes(filterString)) {
        return true
      }
      return false
    } else {
      return true
    }
  }

  const userFilter = (item) => {
    if (showOwn) {
      if (user.id === item.user) {
        return true
      }
      return false
    } else {
      return true
    }
  }

  return (
    <Section>
      <Level>
        <Heading subtitle size={3}>
          Tips
        </Heading>
        <Label><Checkbox id="checkbox" checked={showOwn} onChange={checkboxHandler} />Show only my own tips</Label>
        <TipSearch handler={searchHandler} />
      </Level>
      <ul>
        {tips.filter(item => userFilter(item)).filter(item => tipsFilter(item)).map((tip) =>
          <Tip tip={tip} key={tip.id} deleteTip={deleteTip} user={user} />
        )}
      </ul>

    </Section>
  )
}

export default TipList
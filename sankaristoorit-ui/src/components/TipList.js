import React from 'react'
import Tip from './Tip'

import { Section, Heading } from 'react-bulma-components'

const TipList = ({ tips, deleteTip }) => {

  const list = tips.map((tip) =>
    <Tip tip={tip} key={tip.id} deleteTip={deleteTip} />
  )

  return (
    <Section>
      <Heading subtitle size={3}>
        Tips
      </Heading>
      <ul>
        {list}
      </ul>

    </Section>
  )
}

export default TipList
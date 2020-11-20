import React from 'react'
import Tip from './Tip'
import { Section } from 'react-bulma-components';

const TipList = ({ tips }) => {
    console.log('Tips list ' + tips)

    const list = tips.map((tip) =>
        <Tip tip={tip} key={tip.id} />
    )

    return (
        <div>
            <ul>
                {list}
            </ul>
        </div>
    )
}

export default TipList
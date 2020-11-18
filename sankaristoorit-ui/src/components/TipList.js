import React from 'react'
import Tip from './Tip'

const TipList = ({tips}) => {
    console.log(tips)

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
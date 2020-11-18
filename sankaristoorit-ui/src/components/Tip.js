import React from 'react'

const Tip = ({tip}) => {

    return (
        <li className='tip'>
            <h3>{tip.title}</h3>
        </li>
    )
}

export default Tip
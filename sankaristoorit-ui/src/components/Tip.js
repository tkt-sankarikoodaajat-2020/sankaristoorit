import React from 'react'
import { Section, Button } from 'react-bulma-components';

const Tip = ({ tip }) => {

    return (
        <Section>
            <li class='message is-primary'>
                <h2 class='message-header'>{tip.title}<Button class='delete'>Delete</Button></h2>
                <p clas='message-body'>message placeholder</p>
            </li>
        </Section>
    )
}

export default Tip
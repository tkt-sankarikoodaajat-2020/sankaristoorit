import React from 'react'
import { Form, Button, Section, Heading, Progress } from 'react-bulma-components'

const { Input, Field, Control, Label } = Form

const TipForm = (props) =>
  <Section>
    <Heading title='size:3'>
      Create a new tip
    </Heading>
    <form onSubmit={props.addTip}>
      <Field>
        <Label>Url:</Label>
        <Control>
          <Input id="url" value={props.newUrl}
            onChange={(event) => props.handleUrlChange(event)} placeholder={'e.g. https://github.com/tkt-sankarikoodaajat-2020/sankaristoorit'}
            disabled={props.disabled} />
        </Control>
        <Label>Title:</Label>
        <Control>
          <Input id="title" value={props.newTitle}
            onChange={(event) => props.handleTitleChange(event)}
            disabled={props.disabled} />
        </Control>
      </Field>
      {!props.disabled && props.fetchingUrl &&
        <Progress className='is-small'></Progress>
      }
      <Control>
        <Button id="create-button" type="submit" color="primary" disabled={props.disabled}>Create</Button>
      </Control>
    </form>
  </Section>

export default TipForm
import React from 'react'
import { Form, Button, Section, Heading } from 'react-bulma-components'

const { Input, Field, Control, Label } = Form

const TipForm = (props) =>
  <Section>
    <Heading subtitle size={3}>
          Create a new tip
    </Heading>
    <form onSubmit={props.addTip}>
      <Field>
        <Label>Title:</Label>
        <Control>
          <Input id="title" value={props.newTitle}
            onChange={props.handleTitleChange} />
        </Control>
      </Field>
      <Control>
        <Button id="create-button" type="submit" color="primary">Create</Button>
      </Control>
    </form>
  </Section>

export default TipForm
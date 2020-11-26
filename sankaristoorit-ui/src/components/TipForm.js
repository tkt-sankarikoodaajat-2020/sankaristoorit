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
        <Label>Url:</Label>
        <Control>
          <Input id="url" value={props.newUrl}
            onChange={props.handleUrlChange} placeholder={'e.g. https://github.com/tkt-sankarikoodaajat-2020/sankaristoorit'} />
        </Control>
      </Field>
      <Control>
        <Button id="create-button" type="submit" color="primary">Create</Button>
      </Control>
    </form>
  </Section>

export default TipForm
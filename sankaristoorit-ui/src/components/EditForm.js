import React from 'react'
import { Form, Button, Section } from 'react-bulma-components'

const { Input, Field, Control, Label } = Form

const EditForm = (props) =>
  <Section>
    <form onSubmit={props.updateTip}>
      <Field>
        <Label>New Title:</Label>
        <Control>
          <Input data-cy='editTitleInput' className='titleInput' value={props.title}
            onChange={(event) => props.handleTitleEdit(event)} />
        </Control>
        <Label>New Url:</Label>
        <Control>
          <Input data-cy='editUrlInput' className='urlInput' value={props.url}
            onChange={(event) => props.handleUrlEdit(event)} />
        </Control>
      </Field>
      <Control>
        <Button type="submit" data-cy='updateButton' className='updateButton' color="primary">Update</Button>
      </Control>
    </form>
  </Section>

export default EditForm
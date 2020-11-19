import React from 'react'

const TipForm = (props) =>
    <form onSubmit={props.addTip}>
        <div>
            title: <input id='title' value={props.newTitle}
            onChange={props.handleTitleChange} />
        </div>
        <div></div>
        <button id='create-button' type="submit">create</button>
    </form>


export default TipForm 
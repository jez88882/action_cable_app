// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import MessagesChannel from 'channels/messages_channel'
import Message from '../components/Message'

const MessagesBoard = () => {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    MessagesChannel.received = (data) => setMessages(data.messages)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Add the X-CSRF-TOKEN token so rails accepts the request
    await fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content,
      },
      body: JSON.stringify({ message }),
    })
    setMessage('')
  }

  return (
    <div>
      <input type="text" value={message} onChange={({ target: { value } }) => setMessage(value)} />
      <button onClick={handleSubmit}>Send message</button>

      <ul>
        {messages.map((message) => <Message content={message.content} key={message.id}/>)}
      </ul>
    </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<MessagesBoard />, document.body.appendChild(document.createElement('div')))
})

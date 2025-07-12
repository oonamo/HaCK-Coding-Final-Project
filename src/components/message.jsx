import EventHandler from '../events'
import { useState, useEffect } from 'react';

const EXPIRE_TIME = 1000;

export default function Message({ track, className }) {
  const [lastMessage, setLastMessage] = useState({ raw: "", count: 0 })
  const [message, setMessage] = useState({ raw: "", count: 0 })

  function addMessage(messageData) {
    const expiresAt = Date.now() + EXPIRE_TIME;
    let updatedMessage = false

    console.log("last", lastMessage)
    console.log("data:", messageData)

    messageData.expiresAt = expiresAt

    if (lastMessage &&
      (lastMessage.raw == messageData.message
        || lastMessage.message == messageData.message)
    ) {
      updatedMessage = true
      messageData.raw = messageData.message
      messageData.count = lastMessage.count ? lastMessage.count + 1 : 2
      messageData.message = `${messageData.message} x${messageData.count}`
      messageData.expiresAt += EXPIRE_TIME
    }


    console.log("new message:", messageData)

    setLastMessage(messageData)
    setMessage(messageData)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      console.log("now", now)
      console.log("expires", message.expiresAt)
      if (now > message.expiresAt) {
        console.log("clearing!!!")
        setMessage({ raw: "", count: 0 })
        setLastMessage({ raw: "", count: 0 })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [message])

  useEffect(() => {
    EventHandler.subscribe("message", track, (event, emitter, messageData) => {
      if (emitter === track) {
        addMessage(messageData)
      }
    })
  }, [message])

  return (
    <div className={className}>
      {message.message ?
        <span className={message.color}>
          {message.message}
        </span>
        : ""}
    </div>
  )
}

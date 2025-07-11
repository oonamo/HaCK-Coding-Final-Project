import EventHandler from '../events'
import { useState, useEffect } from 'react';

const EXPIRE_TIME = 1000;

export default function Message({ track, className }) {
  const [messages, setMessages] = useState([])
  const [messageID, setMessageID] =  useState(0)

  function addMessage(messageData) {
    const expiresAt = Date.now() + EXPIRE_TIME;
    const lastMessage = messages[messages.length - 1]
    console.log("last", lastMessage)
    console.log("now", messageData)

    let updatedMessage = false

    if (lastMessage &&
      (lastMessage.messageData.raw_message == messageData.message
        || lastMessage.messageData.message == messageData.message)
    ) {
      console.log("updating...")
      updatedMessage = true
      messageData.raw_message = messageData.message
      messageData.count = lastMessage.messageData.count ? lastMessage.messageData.count + 1 : 2
      messageData.message = `${messageData.message} x${messageData.count}`
    }
    setMessageID(messageID + 1)
    const id = messageID
    setMessages(prev => {
      let messageList = prev
      if (updatedMessage) {
        if (messageList.length == 1) {
          messageList = []
        } else {
          messageList = messageList.filter(msg => {
            return msg.id == lastMessage.id
          }
          )
        }
      }

      const list = [...messageList, { messageData, expiresAt, id }]
      console.log(list)
      return list
    })
  }

  const interval = setInterval(() => {
    const now = Date.now()
    setMessages(messages => messages.filter(message => message.expiresAt > now))
  }, 1000)

  useEffect(() => {
    console.log("rendering!",  "tracking:", track)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    EventHandler.subscribe("message", track, (event, emitter, messageData) => {
      console.log("emitter", emitter)
      console.log("track", track)
      if (emitter === track) {
        addMessage(messageData)
      }
    })
  }, [messages])

  return (
    <div className={className}>
      {
        messages.length !== 0
          ? messages.reverse().map(({ messageData }, index) => {
            return (
              <li key={index} className={`message ${messageData.color} `}>
                {messageData.message}
              </li>
            )
          })
          : ""
      }
    </div>
  )
}

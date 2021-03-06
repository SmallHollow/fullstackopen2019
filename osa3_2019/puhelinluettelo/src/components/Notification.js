import React from 'react'

const Notification = ({ message, errorState }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={errorState ? "error" : "notification"}>
      {message}
    </div>
  )
}

export default Notification

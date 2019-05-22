import React from 'react'

const Filter = ({text, eventHandler}) => {
  return (
      <div>Rajaa näytettäviä: <input value={text} onChange={eventHandler} /></div>
  )
}

export default Filter

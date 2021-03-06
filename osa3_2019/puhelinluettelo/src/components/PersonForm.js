import React from 'react'

const PersonForm = ({name, number, nameHandler, numberHandler, submitHandler}) => {
  return (
    <form onSubmit={submitHandler}>
      <div>nimi: <input value={name} onChange={nameHandler} /></div>
      <div>numero: <input value={number} onChange={numberHandler} /></div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

export default PersonForm

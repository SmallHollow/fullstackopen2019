import React, { useState } from 'react'

const Name = ({name, number}) => {
  return (
    <li>{name} {number}</li>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    let exists = false
    persons.forEach(person => {
      if (newName === person.name) {
        exists = true
      }
    })
    if (exists) {
      alert(`${newName} on jo luettelossa!`)
    } else {
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const listNames = () => persons.map(person => <Name key={person.name} name={person.name} number={person.number} />)

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addName}>
        <div>nimi: <input value={newName} onChange={handleNameChange} /></div>
        <div>numero: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <ul>
      {listNames()}
      </ul>
    </div>
  )

}

export default App

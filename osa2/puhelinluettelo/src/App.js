import React, { useState } from 'react'

const Name = ({name, number}) => {
  return (
    <li>{name} {number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  const nameExists = (name) => {
    let exists = false
    persons.forEach(person => {
      let lowercaseName = person.name.toLowerCase()
      if (name.toLowerCase() === lowercaseName) {
        exists = true
      }
    })
    return exists
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (nameExists(newName)) {
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

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const listNames = () => {
    const lcNameFilter = nameFilter.toLowerCase()
    const filtered = persons.filter(person => person.name.toLowerCase().includes(lcNameFilter))
    return filtered.map(person => {
      return <Name key={person.name} name={person.name} number={person.number} />
    })
  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <div>Rajaa näytettäviä: <input value={nameFilter} onChange={handleFilterChange} /></div>
      <h2>Lisää uusi</h2>
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

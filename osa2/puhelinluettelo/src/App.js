import React, { useState } from 'react'
import PersonForm from './components/PersonForm.js'
import Filter from './components/Filter.js'
import Persons from './components/Persons.js'

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
      <h2>Puhelinluettelo</h2>
      <Filter text={nameFilter} eventHandler={handleFilterChange} />
      <h3>Lisää uusi</h3>
      <PersonForm name={newName} number={newNumber} nameHandler={handleNameChange}
        numberHandler={handleNumberChange} submitHandler={addName} />
      <h3>Numerot</h3>
      <Persons list={listNames()} />
    </div>
  )

}

export default App

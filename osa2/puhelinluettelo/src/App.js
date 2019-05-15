import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm.js'
import Filter from './components/Filter.js'
import Persons from './components/Persons.js'
import personService from './services/persons.js'

const Name = ({id, name, number, deleteHandler}) => {
  return (
    <li>{name} {number} <button onClick={deleteHandler} value={id}>poista</button></li>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(initPersons => {
        setPersons(initPersons)
      })
    }
  console.log('render', persons.length, 'persons')

  useEffect(hook, [])

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
      const result = window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)
      if (result) {
        const person = persons.filter(p => p.name === newName)[0]
        personService
          .update(person.id, nameObject)
          .then(updatedNumber => {
            setPersons(persons.map(p => (p.id === person.id ? updatedNumber : p)))
          })
      }
    } else {
      personService
        .create(nameObject)
        .then(returnedName => {
          setPersons(persons.concat(returnedName))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deleteName = (event) => {
    const delid = Number(event.target.value)
    const person = persons.filter(p => p.id === delid)[0]
    const result = window.confirm(`Poistetaanko ${person.name}?`)
    if (result) {
      personService
        .del(delid)
        .then(deletedName => {
          setPersons(persons.filter(p => p.id !== delid))
        })
    }
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
      return <Name key={person.name} id={person.id} name={person.name} number={person.number} deleteHandler={deleteName} />
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

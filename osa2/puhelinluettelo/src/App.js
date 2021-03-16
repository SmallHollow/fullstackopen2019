import React, { useState, useEffect } from 'react';
import { getAll, create, remove, update } from './services/persons.js';

const Filter = ({ nameFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with{' '}
      <input value={nameFilter} onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = ({
  addName,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, nameFilter, handleDelete }) => {
  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toUpperCase().includes(nameFilter.toUpperCase())
        )
        .map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </li>
        ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    getAll().then((all) => {
      setPersons(all);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();

    const personObject = persons.find((person) => newName === person.name);
    if (personObject) {
      const confirmResult = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmResult) {
        const updatedItem = {
          ...personObject,
          number: newNumber,
        };
        update(updatedItem.id, updatedItem).then((uItem) => {
          setPersons(persons.map((p) => (p.id !== uItem.id ? p : uItem)));
        });
      }
    } else {
      const newItem = {
        name: newName,
        number: newNumber,
      };
      create(newItem).then((addedItem) => {
        setPersons(persons.concat(addedItem));
      });
    }
  };

  const handleDelete = (id) => {
    const name = persons.find((person) => person.id === id).name;
    const confirmResult = window.confirm(`Delete ${name}?`);
    if (confirmResult) {
      remove(id).then(() => {
        setPersons(persons.filter((person) => id !== person.id));
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        nameFilter={nameFilter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;

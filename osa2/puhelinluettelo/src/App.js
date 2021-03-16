import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const Persons = ({ persons, nameFilter }) => {
  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toUpperCase().includes(nameFilter.toUpperCase())
        )
        .map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
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
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    if (persons.find((person) => newName === person.name)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newItem = {
        name: newName,
        number: newNumber,
      };
      axios.post('http://localhost:3001/persons', newItem).then((response) => {
        setPersons(persons.concat(response.data));
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
      <Persons persons={persons} nameFilter={nameFilter} />
    </div>
  );
};

export default App;

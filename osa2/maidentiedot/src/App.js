import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Input = ({ country, handler }) => {
  return (
    <div>
      find countries: <input value={country} onChange={handler} />
    </div>
  );
};

const Countries = ({ countries, countryFilter }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.toUpperCase().includes(countryFilter.toUpperCase())
  );
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  return filteredCountries.length === 1 ? (
    <div>
      <h1>{filteredCountries[0].name}</h1>
      <div>capital {filteredCountries[0].capital}</div>
      <div>population {filteredCountries[0].population}</div>
      <h2>Languages</h2>
      <ul>
        {filteredCountries[0].languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={filteredCountries[0].flag} alt="Flag" width="200px" />
    </div>
  ) : (
    <ul>
      {filteredCountries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
};

const App = () => {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilter = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      <Input value={country} handler={handleFilter} />
      <Countries countries={countries} countryFilter={country} />
    </div>
  );
};

export default App;

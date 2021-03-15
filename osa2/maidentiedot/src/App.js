import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OpenWeatherMapAPIKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const Input = ({ country, handler }) => {
  return (
    <div>
      find countries: <input value={country} onChange={handler} />
    </div>
  );
};

const Weather = ({ weather, capital }) => {
  return (
    weather && (
      <div>
        <h2>Weather in {capital}</h2>
        <div>
          <b>temperature: </b>
          {weather.main?.temp} Celsius
        </div>
        <div>
          <b>wind: </b>
          {weather.wind?.speed} km/h
        </div>
      </div>
    )
  );
};

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (country.capital !== '') {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${OpenWeatherMapAPIKey}&units=metric`
        )
        .then((weatherData) => {
          setWeather(weatherData.data);
        });
    }
  }, [country.capital]);

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="Flag" width="200px" />
      <Weather weather={weather} capital={country.capital} />
    </div>
  );
};

const Countries = ({ countries, countryFilter, handleShow }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.toUpperCase().includes(countryFilter.toUpperCase())
  );
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  return filteredCountries.length === 1 ? (
    <Country country={filteredCountries[0]} />
  ) : (
    <div>
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.name}>
            {country.name}{' '}
            <button value={country.name} onClick={handleShow}>
              show
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilter = (event) => {
    setCountry(event.target.value);
    setSelected('');
  };

  const handleShow = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div>
      <Input value={country} handler={handleFilter} />
      {country !== '' && (
        <Countries
          countries={countries}
          countryFilter={country}
          handleShow={handleShow}
        />
      )}
      {selected !== '' && (
        <Country country={countries.find((c) => c.name === selected)} />
      )}
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryForm = ({country, countryHandler}) => {
  return (
    <div>
      find countries
    <form>
      <input value={country} onChange={countryHandler} />
    </form>
    </div>
  )
}

const Languages = ({languages}) => {
  return languages.map(lang =>
    <li key={lang.name}>{lang.name}</li>
  )
}

const CountryInfo = ({info}) => {
  return (
    <div>
      <h1>{info.name}</h1>
      <ul>
        <li>Capital: {info.capital}</li>
        <li>Population: {info.population}</li>
      </ul>
      <h2>Languages</h2>
      <ul>
        <Languages languages={info.languages} />
      </ul>
      <div>
      <img src={info.flag} alt="Flag" style={{width: 300 }} />
      </div>
  </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ country, setCountry ] = useState('')
  const MAXCOUNTRIES = 10

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
    }

  const listCountries = () => {
    const filtered = countries.filter(c => c.name.toLowerCase().includes(country.toLowerCase()))
    if (filtered.length === 1) {
      return <CountryInfo info={filtered[0]} />
    }
    if (filtered.length > 0 && filtered.length <= MAXCOUNTRIES) {
      return filtered.map(c => {
        return <div key={c.name}>{c.name}</div>
      })
    }
    if (filtered.length > MAXCOUNTRIES && country !== "") {
      return <p>Too many matches, specify another filter.</p>
    }
  }

  useEffect(hook, [])

  return (
    <div>
    <CountryForm country={country} countryHandler={handleCountryChange} />
    {listCountries()}
    </div>
  )

}

export default App

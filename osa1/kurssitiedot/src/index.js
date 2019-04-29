import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.kurssinimi}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <p>
      {props.osa} {props.harjoitukset}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>yhteensä {props.yht} tehtävää</p>
  )
}

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14

  return (
    <div>
      <Header kurssinimi={course} />
      <Content osa={part1} harjoitukset={exercises1} />
      <Content osa={part2} harjoitukset={exercises2} />
      <Content osa={part3} harjoitukset={exercises3} />
      <Total yht={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

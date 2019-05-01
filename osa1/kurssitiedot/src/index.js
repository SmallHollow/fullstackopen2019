import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.kurssinimi}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.nimi} {props.maara}</p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
    <Part nimi={props.parts[0].name} maara={props.parts[0].exercises} />
    <Part nimi={props.parts[1].name} maara={props.parts[1].exercises} />
    <Part nimi={props.parts[2].name} maara={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  const yht = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  return (
    <p>yhteensä {yht} tehtävää</p>
  )
}

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const parts = [
    {
      name: 'Reactin perusteet',
      exercises: 10
    },
    {
      name: 'Tiedonvälitys propseilla',
      exercises: 7
    },
    {
      name: 'Komponenttien tila',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header kurssinimi={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

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
  return (
    <div>
      <Part nimi={props.nimi1} maara={props.maara1}/>
      <Part nimi={props.nimi2} maara={props.maara2}/>
      <Part nimi={props.nimi3} maara={props.maara3}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>yhteensä {props.yht} tehtävää</p>
  )
}

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const part1 = {
    name: 'Reactin perusteet',
    exercises: 10
  }
  const part2 = {
    name: 'Tiedonvälitys propseilla',
    exercises: 7
  }
  const part3 = {
    name: 'Komponenttien tila',
    exercises: 14
  }

  return (
    <div>
      <Header kurssinimi={course} />
      <Content nimi1={part1.name} maara1={part1.exercises} nimi2={part2.name} maara2={part2.exercises} nimi3={part3.name} maara3={part3.exercises} />
      <Total yht={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

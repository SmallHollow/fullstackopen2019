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
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14

  return (
    <div>
      <Header kurssinimi={course} />
      <Content nimi1={part1} maara1={exercises1} nimi2={part2} maara2={exercises2} nimi3={part3} maara3={exercises3} />
      <Total yht={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

import React from 'react'
import ReactDOM from 'react-dom'

const Part = ({specs}) => {
  return (
    <li>{specs.name} {specs.exercises}</li>
  )
}

const Content = ({parts}) => {
  const rows = () => parts.map(part => <Part specs={part} key={part.id} />)

  return (
    <ul>
      {rows()}
    </ul>
  )
}

const Total = ({parts}) => {
  let yht = 0
  parts.forEach(part => {
    yht += part.exercises
  })
  return (
    <p>yhteensä {yht} tehtävää</p>
  )
}

const Header = ({text}) => {
  return <h1>{text}</h1>
}

const Course = ({course}) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10,
        id: 1
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7,
        id: 2
      },
      {
        name: 'Komponenttien tila',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 7,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

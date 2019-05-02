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
  let initValue = 0
  const total = parts.reduce( (s, p) => s + p.exercises, initValue)

  return (
      <p>yhteensä {total} tehtävää</p>
  )
}

const CourseHeader = ({text}) => {
  return <h2>{text}</h2>
}

const Course = ({course}) => {
  return (
    <div>
      <CourseHeader text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

const Courses = ({courses}) => {
  const courselist = () => courses.map(course => <Course course={course} key={course.id} />)
  return (
    <div>{courselist()}</div>
  )
}

const App = () => {
  const courses = [
      {
        name: 'Half Stack -sovelluskehitys',
        id: 1,
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
          }
        ]
      },
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewaret',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]

  return (
    <div>
      <h1>Opetusohjelma</h1>
      <Courses courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

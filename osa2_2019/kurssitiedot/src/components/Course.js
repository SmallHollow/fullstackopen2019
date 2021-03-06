import React from 'react'

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

export default Course

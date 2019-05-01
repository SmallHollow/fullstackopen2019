import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.clickfunc}>
      {props.name}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incGood = () => {
    setGood(good+1)
  }

  const incNeutral = () => {
    setNeutral(neutral+1)
  }

  const incBad= () => {
    setBad(bad+1)
  }

  return (

    <div>
      <h1>anna palautetta</h1>
      <Button name="hyvä" clickfunc={incGood} />
      <Button name="neutraali" clickfunc={incNeutral} />
      <Button name="huono" clickfunc={incBad}/>
      <h1>statistiikka</h1>
      <p>hyvä {good}</p>
      <p>neutraali {neutral}</p>
      <p>huono {bad}</p>
    </div>

  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

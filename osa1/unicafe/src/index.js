import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.clickfunc}>
      {props.name}
    </button>
  )
}

const Statistic = (props) => {
  return (
    <tr>
    <td>{props.text}</td>
    <td>{props.value} {props.suffix}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <div>
        <h1>statistiikka</h1>
        <p>Ei yhtään palautetta annettu</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistiikka</h1>
        <table>
        <tbody>
        <Statistic text="hyvä" value={good} />
        <Statistic text="neutraali" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="yhteensä" value={total} />
        <Statistic text="keskiarvo" value={(good-bad)/total} />
        <Statistic text="positiivisia" value={good/total*100} suffix=" %" />
        </tbody>
        </table>
      </div>
    )
  }
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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>

  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

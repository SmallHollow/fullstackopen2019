import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const RandomButton = (props) => {
  return (
    <button onClick={props.clickfunc}>
      next anecdote
    </button>
  )
}

const VoteButton = (props) => {
  return (
    <button onClick={props.clickfunc}>
      vote
    </button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([])

  if (points.length !== props.anecdotes.length) {
    setPoints(new Array(props.anecdotes.length).fill(0))
  }

  const setRandomAnecdote = () => {
    let rand = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(rand)
  }

  const handlePoints = () => {
    const copypoints = [...points]
    copypoints[selected] += 1
    setPoints(copypoints)
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <br />
      has {points[selected]} votes
      <br />
      <VoteButton clickfunc={handlePoints}/>
      <RandomButton clickfunc={setRandomAnecdote} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

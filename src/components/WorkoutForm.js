import React, { useState } from 'react'

const WorkoutForm = () => {

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async(e) => {
        e.preventDefault()

        const workout = { title, load, reps }

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('new workout added', json)
        }
    }

  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add a new Workout</h3>

        <label htmlFor="exercise">Exercise Title:</label>
        <input type="text" id='exercise' value={title}  onChange={e => setTitle(e.target.value)}/>

        <label htmlFor="load">Load (in kg):</label>
        <input type="number" id='load' value={load}  onChange={e => setLoad(e.target.value)}/>

        <label htmlFor="reps">Reps:</label>
        <input type="number" id='reps' value={reps}  onChange={e => setReps(e.target.value)}/>

        <button>Add Workout</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm
import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { ToastContainer, toast } from 'react-toastify';

const WorkoutForm = () => {

    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

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
            setEmptyFields(json.emptyFields)

            toast.error(json.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        if(response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            dispatch({type: 'CREATE_WORKOUT', payload: json})
            setEmptyFields(null)

            toast.success('Success :)', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add a new Workout</h3>

        <label htmlFor="exercise">Exercise Title:</label>
        <input type="text" id='exercise' value={title}  onChange={e => setTitle(e.target.value)} className={emptyFields?.includes('title') ? 'error' : ''} />

        <label htmlFor="load">Load (in kg):</label>
        <input type="number" id='load' value={load}  onChange={e => setLoad(e.target.value)} className={emptyFields?.includes('load') ? 'error' : ''} />

        <label htmlFor="reps">Reps:</label>
        <input type="number" id='reps' value={reps}  onChange={e => setReps(e.target.value)} className={emptyFields?.includes('reps') ? 'error' : ''} />

        <button>Add Workout</button>
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </form>
  )
}

export default WorkoutForm
import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { ToastContainer, toast } from 'react-toastify';

const WorkoutDetails = ({ workout }) => {

  const {dispatch} = useWorkoutsContext()

  const handleClick = async() => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if(response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
      toast.success('Deleted', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
    }
  }
  
  return (
    <div className='workout-details'>
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Reps: </strong>{workout.reps}</p>
        <p>{workout.createdAt}</p>
        <span onClick={handleClick}>delete</span>
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
    </div>
  )
}

export default WorkoutDetails
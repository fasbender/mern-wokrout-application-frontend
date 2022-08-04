import React, { useEffect, useState } from 'react'

//Components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {

    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async() => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if(response.ok) {
                setWorkouts(json)
            }
        }

        fetchWorkouts()
    }, [])

  return (
    <div>{workouts && workouts.map(workout => {
        return(
            <WorkoutDetails key={workout._id} workout={workout}/>
        )
        })}
        <WorkoutForm/>
    </div>
  )
}

export default Home
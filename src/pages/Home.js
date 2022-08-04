import React, { useEffect, useState } from 'react'
import axios from 'axios'

//Components
import WorkoutDetails from '../components/WorkoutDetails'

const Home = () => {

    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async() => {
            try {
                const response = await axios.get('/api/workouts')
                setWorkouts(response.data)
            } catch (error) {
                console.log('unable to fetch')
            }
        }

        fetchWorkouts()
    }, [])

  return (
    <div>{workouts && workouts.map(workout => {
        return(
            <WorkoutDetails key={workout._id} workout={workout}/>
        )
    })}</div>
  )
}

export default Home
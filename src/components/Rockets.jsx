import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRockets } from '../features/rocketSlice'

const Rockets = () => {

    const {rockets} = useSelector(state => state.rocket);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRockets())
    },[])

    return (
        <>
            {rockets.map(rocket =>(
                <h1>{rocket.rocket.rocket_name}</h1>
            ))}
        </>
    )
}

export default Rockets
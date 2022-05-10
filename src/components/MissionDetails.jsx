import React, { useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets } from '../features/rocketSlice';

const MissionDetails = () => {

    const dispatch = useDispatch();

    const {rockets} = useSelector(state => state.rocket);

    const {mission_name} = useParams();

    const {launch_date_local, launch_year, launch_success, links:{mission_patch}, links:{article_link}, rocket, upcoming, details } = rockets.find(rocket => rocket.mission_name == mission_name);

    useEffect(()=>{
        dispatch(fetchRockets())
    },[])

    return (
        <>  
            <div className="container">
                <div className="spx-mission-details">
                    <div className="card">
                        <div className="card-header text-center p-5">
                            <img src={mission_patch} alt={mission_name} className='img-fluidi mg-thumbnail'/>
                        </div>
                        <div className="card-body">
                            <div className="text-center">
                                <h5 className="card-title text-primary">{mission_name}</h5>
                                <p><b>Launch: </b>{launch_year}</p>
                            </div>
                            <div className="rocket-details">
                                <h5>Rocket:</h5>
                                <div className='d-flex'>
                                    <p className='me-4'><b >Name:</b> {rocket.rocket_name}</p>
                                    <p><b>Type:</b> {rocket.rocket_type}</p>
                                </div>
                                <h5>Status:</h5>
                                <p className='mb-1'>{launch_success ? <h6 className='text-success'>Succeeded</h6> : <h6 className='text-danger'>Failed</h6>}</p>
                                <p>{launch_success ? '' : details}</p>
                            </div>
                        </div>
                        <div className="card-footer text-muted">
                            <a href={article_link}>Read More..</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MissionDetails
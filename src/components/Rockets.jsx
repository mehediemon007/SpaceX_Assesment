import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRockets } from '../features/rocketSlice';
import {Link} from 'react-router-dom'

const Rockets = () => {

    const {rockets} = useSelector(state => state.rocket);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRockets())
    })

    return (
        <>
            <div className="spx-rockets-wpr">
                <div className="sec-heading bg-primary py-5">
                    <h2 className='text-center text-white'>SpaceX Rockets</h2>
                </div>
                <div className="spx-rockets my-5">
                    <div className="container">
                        <div className="filter-bar mb-2">
                            <div className="row">
                                <div className="col-4">
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Search Rocket" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                        <button className="btn btn-primary" type="button" id="button-addon2">Search</button>
                                    </div>
                                </div>
                                <div className="offset-5 col-3">
                                    <select className="form-select" aria-label="Default select example">
                                        <option defaultValue='all'>All</option>
                                        <option value="weak">Last Week</option>
                                        <option value="month">Last Month</option>
                                        <option value="year">Last Year</option>
                                        <option value="success">Status (Success)</option>
                                        <option value="fail">Status (Failer)</option>
                                        <option value="upcoming">Upcoming</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {
                                rockets.length ? (rockets.map((rocket,index)=>{
                                    const {rocket:{rocket_name}, mission_name, details} = rocket;
                                    return(
                                        <div className="col-4 mb-4" key={index}>
                                            <div className="card rocket-card">
                                                <img src={rocket.links.mission_patch_small} className="card-img-top p-3" alt={rocket_name}/>
                                                <div className="card-body">
                                                    <h5 className="card-title">{mission_name}</h5>
                                                    <p className="card-text">{details}</p>
                                                    <Link to={`/mission-details/${mission_name}`} className="btn btn-primary">Mission Details</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })) : <h3>Data Loading...</h3>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rockets
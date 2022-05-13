import React, { Component, createRef } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { fetchRockets } from '../features/rocketSlice';

class RocketsCls extends Component {

    searchInput = createRef()

    state = {
        searchTerm:""
    }

    handleSearch = (e)=>{
        this.setState({searchTerm : e.target.value})
    }

    componentDidMount = ()=>{
        this.props.fetchingRockets();
    }

    render() {

        const {rockets:{rockets}} = this.props;

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
                                            <input type="text" className="form-control" placeholder="Search Rocket" aria-label="Recipient's username" aria-describedby="button-addon2" ref={this.searchInput} onChange={(e)=>this.handleSearch(e)}/>
                                            <button className="btn btn-primary" type="button" id="button-addon2" onClick={()=> this.setState({searchTErm:this.searchInput.current.value})}>Search</button>
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
                                    rockets.length ? (rockets.filter( rocket => {
                                        const {rocket:{rocket_name}} = rocket;
                                        if(this.state.searchTerm === ''){
                                            return rocket
                                        }else if(rocket_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())){
                                            return rocket
                                        }
                                    }).map((rocket,index)=>{
                                        const {rocket:{rocket_name}, mission_name, details} = rocket;
                                        return(
                                            <div className="col-4 mb-4" key={index}>
                                                <div className="card rocket-card">
                                                    <img src={rocket.links.mission_patch_small} className="card-img-top p-3" alt={rocket_name}/>
                                                    <div className="card-body">
                                                        <div>
                                                            <h5 className="card-title">Mission: <b className='text-primary d-inline'>{mission_name}</b></h5>
                                                            <h5 className="card-title">Rocket: <b className='text-success d-inline'>{rocket_name}</b></h5>
                                                        </div>
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
        );
    }
}

const mapStateToProps = ( state ) =>{
    return{
        rockets: state.rocket
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        fetchingRockets : () => { dispatch(fetchRockets())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RocketsCls);

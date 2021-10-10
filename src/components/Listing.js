import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons"

export default class Listing extends React.Component {
    state = {
        freelancer: [

        ],
        loading:false
    }

    async componentDidMount() {
        this.setState({
            loading: true
        })
        await this.fetchData();
        this.setState({
            loading: false
        })
    }

    fetchData = async () => {
        let  response = await axios.get("data/freelancer.json");
        this.setState({
            freelancer: response.data
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.freelancer.map( eachFreelancer => 
                    <div className="col freelancer-card" key={eachFreelancer._id}>
                        <div className="card" style={{width: "20rem"}}>
                            <img src={require("../images/portfolio/museum.jpg").default} id="portfolio-1" alt="wedding"/>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <h5 className="card-title">{eachFreelancer.rate}</h5>
                                    </div>
                                    <div className="col">
                                        <p className="rating">
                                            <FontAwesomeIcon icon={faStar}/> 3.0 
                                            <span className="comment"><FontAwesomeIcon icon={faCommentDots}/> 18</span>
                                        </p>
                                    </div> 
                                </div>
                                <p className="card-text">
                                    {eachFreelancer.specialized.map( speciality => 
                                        <span className="text-wrapper me-2" key={speciality}>{speciality}</span>
                                    )}
                                </p>
                                <hr className="hr-line"></hr>
                                <div className="row">
                                    <div className="col mt-1">
                                        <img src={require("../images/profile/profile-image.jpg").default} id="profile-img" alt="profile"/>
                                    </div> 
                                    <div className="col mt-1 profile-info">
                                        {eachFreelancer.name}
                                        <div>
                                            <span className="facebook-icon"><FontAwesomeIcon icon={faFacebookF}/></span>
                                            <span className="instagram-icon"><FontAwesomeIcon icon={faInstagram}/></span>
                                            <span className="tiktok-icon"><FontAwesomeIcon icon={faTiktok}/></span> 
                                            <div className="text-wrapper type mt-2">{eachFreelancer.type}</div>
                                        </div>
                                    </div> 
                                </div> 
                                <hr className="hr-line"></hr>
                                <button href="#" className="btn btn-outline-secondary ms-4">View Profile</button>
                                <button href="#" className="btn btn-outline-secondary ms-2">Give Review</button>  
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }



}
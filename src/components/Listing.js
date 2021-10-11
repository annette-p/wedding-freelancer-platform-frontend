import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons"
import Modal from "./Modal"

export default class Listing extends React.Component {
    state = {
        freelancer: [],
        loading:false,
        review: [],
        activeFreelancer: {},
        displayModalBox: false
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
        let  responseFreelancer = await axios.get("data/freelancer.json");
        let  responseReview = await axios.get("data/review.json");
        this.setState({
            freelancer: responseFreelancer.data,
            review: responseReview.data
        })
    }

    // related functions to handle Model function 
    displayModal = (selectedFreelancer) => {
        this.setState({
            activeFreelancer: selectedFreelancer,
            displayModalBox: true
        });
    };
    
    hideModal = () => {
        this.setState({
            displayModalBox: false
        });
    };

    displayModalBox(eachFreelancer) {
        if (this.state.displayModalBox) {
            // filter the review for respective freelancer
            let filteredReview = this.state.review.filter( eachReview => eachReview.for._id === eachFreelancer._id)
            // return each freelancer profile, return filtered review match each freelancer
            return <Modal freelancer={eachFreelancer} reviews={filteredReview} hideModal={this.hideModal}/>
        } else {
            return null
        }
    }
    // end of related functions to handle Model function 

    render() {
        return (
            <React.Fragment>
                {this.state.freelancer.map( eachFreelancer => 
                    <div className="col freelancer-card" key={eachFreelancer._id}>
                        <div className="card card-listing" style={{width: "20rem"}}>
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
                                    <div className="col-5 mt-1">
                                        <img src={eachFreelancer.profileImage} id="profile-img" alt="profile"/>
                                    </div> 
                                    <div className="col-7 mt-1 profile-info">
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
                                <button href="#" className="btn btn-outline-secondary ms-4" onClick={() => {
                                    this.displayModal(eachFreelancer)
                                }}>View Profile</button> {this.displayModalBox(this.state.activeFreelancer)}
                                <button href="#" className="btn btn-outline-secondary ms-2">Give Review</button>  
                            </div>
                        </div>
                    </div>
                )}  
            </React.Fragment>
        )
    }



}
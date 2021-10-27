import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons"
import ViewProfileModal from "./ViewProfileModal"
import GiveReviewModal from "./GiveReviewModal"

export default class Listing extends React.Component {
    apiUrl = process.env.REACT_APP_BACKEND_API
    state = {
        freelancer: [],
        loading:false,
        review: [],
        activeFreelancer: {},
        displayModalBox: false,
        activeModalBox: ""      // which modal box to display when 'displayModalBox' is true
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

    // to run when there's change in state or props (with specfic condition state to perform update)
    // ref: https://reactjs.org/docs/react-component.html#componentdidupdate
    async componentDidUpdate(prevProps, prevState) {
        // state the condition to activate the update of componentDidUpdate
        if (prevState.activeFreelancer._id !== this.state.activeFreelancer._id) {
            await this.fetchData();
        }
    }

    fetchData = async () => {
        let responseFreelancer = await axios.get(this.apiUrl + "/freelancers");
        let freelancers = responseFreelancer.data;
        let reviews = []

        // Promise.all wait for mapping function to be done 
        // ref: https://stackoverflow.com/questions/40140149/use-async-await-with-array-map/40140562#40140562
        await Promise.all(freelancers.map( async (freelancer) => {
            let responseReview = await axios.get(`${this.apiUrl}/freelancer/${freelancer._id}/reviews`)
            let reviewData = responseReview.data
            reviews = reviews.concat(reviewData)
        }))
        
        this.setState({
            freelancer: freelancers,
            review: reviews
        })
    }

    getReviewsForFreelancer = (freelancerId) => {
        return this.state.review.filter( eachReview => eachReview.for === freelancerId)
    }

    calculateRating = (reviews) => {
        let total = 0;
        if (reviews.length > 0) {
            reviews.map( eachReview => total = total + eachReview.rating)
            return (total / reviews.length).toFixed(1);
        } else {
            return total.toFixed(1);
        }
    }

    /*............. to handle Model function .............*/ 
    displayModal = (selectedFreelancer, modalBoxName) => {
        this.setState({
            activeFreelancer: selectedFreelancer,
            displayModalBox: true,
            activeModalBox: modalBoxName
        });
    };
    
    hideModal = () => {
        this.setState({
            displayModalBox: false,
            activeFreelancer: {}
        });
    };

    renderModalBox(eachFreelancer) {
        if (this.state.displayModalBox) {
            if (this.state.activeModalBox === "view_profile") {
                // filter the review for respective freelancer
                let filteredReview = this.state.review.filter( eachReview => eachReview.for === eachFreelancer._id)
                // return each freelancer profile, return filtered review match each freelancer
                return <ViewProfileModal freelancer={eachFreelancer} reviews={filteredReview} hideModal={this.hideModal}/>
            } else if (this.state.activeModalBox === "give_review") {
                return <GiveReviewModal 
                    freelancer={eachFreelancer} 
                    hideModal={this.hideModal} 
                />
            }
            else {
                return null
            }
        } else {
            return null
        }
    }
    /*............. end of to handle Model function .............*/ 

    render() {
        return (
            <React.Fragment>
                <div className="row mb-5-lg mt-3-lg">
                    <div className="col mt-2">
                        {/* <p>Displaying 21 results</p> */}
                    </div>
                    <div className="col position-right">
                        <label className="form-label bold filter-tab">Filter by: </label>
                        <select className="" name="" value="" onChange="">
                            <option value=""> ----- Specialization ----- </option>
                            <option value="pre-wedding">Pre-wedding</option>
                            <option value="ROM">Wedding day / ROM</option>
                            <option value="bridal-makeup">Bridal makeup</option>
                            <option value="glow-makeup">Natural glow makeup</option>
                            <option value="maternity">Maternity shoot</option>
                            <option value="newborn">Newborn shoot</option>
                        </select>
                    </div>
                    <div className="col position-right">
                        <label className="form-label bold filter-tab">Filter by: </label>
                        <select className="" name="" value="" onChange="">
                            <option value=""> ----- Service type ----- </option>
                            <option value="photographer">Photographer</option>
                            <option value="videographer">Videographer</option>
                            <option value="makeup-artist">Makeup-artist</option>
                        </select>
                    </div>
                    <div className="col position-right filter-col">
                        <label className="form-label bold filter-tab">Filter by: </label>
                        <select className="" name="" value="" onChange="">
                            <option value="high-rated">Most rated (high rating)</option>
                            <option value="review">Most reviewed</option>
                            <option value="recent">Most recent</option>
                            <option value="recommended">Most recommended</option>
                            <option value="hourly-rate">Rate range (by hour)</option>
                            <option value="project-rate">Rate range (by project)</option>
                        </select>
                    </div>
                </div>
                {this.state.freelancer.map( eachFreelancer => 
                    <div className="col freelancer-card" key={eachFreelancer._id}>
                        <div className="card card-listing" style={{width: "20rem"}}>
                            <img src={eachFreelancer.showCase} id="portfolio-1" alt="wedding"/>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <h5 className="card-title">S${eachFreelancer.rate} /{eachFreelancer.rateUnit}</h5>
                                    </div>
                                    <div className="col">
                                        <p className="rating">
                                            <FontAwesomeIcon icon={faStar}/> {this.calculateRating(this.getReviewsForFreelancer(eachFreelancer._id))}
                                            <span className="comment"><FontAwesomeIcon icon={faCommentDots}/> {this.getReviewsForFreelancer(eachFreelancer._id).length}</span>
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
                                    this.displayModal(eachFreelancer, "view_profile")
                                }}>View Profile</button> 
                                <button href="#" className="btn btn-outline-secondary ms-2" onClick={() => {
                                    this.displayModal(eachFreelancer, "give_review")
                                }}>Give Review</button>
                            </div>
                        </div>
                    </div>
                )}
                {this.renderModalBox(this.state.activeFreelancer)}
                
            </React.Fragment>
        )
    }

}
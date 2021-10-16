import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons"
import ViewProfileModal from "./ViewProfileModal"
import GiveReviewModal from "./GiveReviewModal"

export default class Listing extends React.Component {
    state = {
        freelancer: [],
        loading:false,
        review: [],
        newReviewerName: "",
        newReviewerEmail: "",
        newComment: "",
        newRating: "0",
        newRecommend: true,
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

    fetchData = async () => {
        let  responseFreelancer = await axios.get("data/freelancer.json");
        let  responseReview = await axios.get("data/review.json");
        this.setState({
            freelancer: responseFreelancer.data,
            review: responseReview.data
        })
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
                    newReviewerName={this.state.newReviewerName} 
                    newReviewerEmail={this.state.newReviewerEmail}
                    newComment={this.state.newComment}
                    newRating={this.state.newRating}
                    newRecommend={this.state.newRecommend}
                    hideModal={this.hideModal} 
                    updateField={this.updateReviewForm}  
                    addReview={this.processAddReview}
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



    /*............. to handle Review Submission .............*/ 
    updateReviewForm = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    // to remove this block of code and use the code below >> to post to API
    processAddReview = () => {
        // clone the original review array / make changes to the clone / replace the original with clone
        this.setState({
            'review': [...this.state.review, {
                '_id': Math.floor(Math.random() * 1000 + 9999),  // to remove wen use Mongo
                reviewer: {
                    name: this.state.newReviewerName,
                    email: this.state.newReviewerEmail
                },
                description: this.state.newComment,
                rating: parseInt(this.state.newRating),
                recommend: this.state.newRecommend,
                for: this.state.activeFreelancer._id
            }],
            displayModalBox: false,
            activeFreelancer: {}
        })
        
    }

    // to add this block of code instead >> to post to API  
    /*
    processAddReview = async () => {
        await axios.post(`${this.url}/freelancer/${this.state.activeFreelancer._id}/review`, {
            "data": {
                reviewer: {
                    name: this.state.newReviewerName,
                    email: this.state.newReviewerEmail
                },
                description: this.state.newComment,
                rating: parseInt(this.state.newRating),
                recommend: this.state.newRecommend,
                for: this.state.activeFreelancer._id  // may have to remove this line
            }
        }).then( (res) => {
            this.setState({
                displayModalBox: false,
                activeFreelancer: {}
            })
        })
    } 
    */

    /*............. end of to handle Review Submission  .............*/ 

    render() {
        return (
            <React.Fragment>
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
                                    this.displayModal(eachFreelancer, "view_profile")
                                }}>View Profile</button> 
                                <button href="#" className="btn btn-outline-secondary ms-2" onClick={() => {
                                    this.displayModal(eachFreelancer, "give_review")
                                }}>Give Review</button>
                                {this.renderModalBox(this.state.activeFreelancer)}
                            </div>
                        </div>
                    </div>
                )}  
            </React.Fragment>
        )
    }



}
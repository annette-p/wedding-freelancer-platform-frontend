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

    getReviewsForFreelancer = (freelancerId) => {
        return this.state.review.filter( eachReview => eachReview.for === freelancerId)
    }

    calculateRating = (reviews) => {
        let total = 0;
        reviews.map( eachReview => total = total + eachReview.rating)
        return (total / reviews.length).toFixed(1);
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
                                {this.renderModalBox(this.state.activeFreelancer)}
                            </div>
                        </div>
                    </div>
                )} 

                <div>
                    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src={require('../images/portfolio/lake_gardens.jpg').default} class="d-block w-100" alt="lake"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>First slide label</h5>
                                    <p>Some representative placeholder content for the first slide.</p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src={require('../images/portfolio/museum.jpg').default} class="d-block w-100" alt="museum"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Second slide label</h5>
                                    <p>Some representative placeholder content for the second slide.</p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src={require('../images/portfolio/raffles_hotel.jpg').default} class="d-block w-100" alt="hotel"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Third slide label</h5>
                                    <p>Some representative placeholder content for the third slide.</p>
                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div> 
                
            </React.Fragment>
        )
    }



}
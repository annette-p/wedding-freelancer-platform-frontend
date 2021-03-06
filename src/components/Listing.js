import React from 'react'
import axios from 'axios'
import Collapse from 'react-bootstrap/Collapse'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCommentDots, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'
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
        showFilterOptions: true,
        displayModalBox: false,
        activeModalBox: "",     // which modal box to display when 'displayModalBox' is true

        filterBySpecialization: "",
        filterByType: "",
        filterByRate: "",
        sorted: "high-rated"
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

        // when there are changes in the search, fetch new data from api/backend
        if (prevProps.searchText !== this.props.searchText || 
            prevState.filterByType !== this.state.filterByType || 
            prevState.filterBySpecialization !== this.state.filterBySpecialization || 
            prevState.filterByRate !== this.state.filterByRate) {
            await this.fetchData();
        }
    }

    fetchData = async () => {

        // handle search text provided by user
        let params = {
            params: {}
        }

        if (this.props.searchText) {
            params.params.searchText = this.props.searchText
        }

        if (this.state.filterByType) {
            params.params.type = this.state.filterByType
        }

        if (this.state.filterBySpecialization) {
            params.params.specialized = this.state.filterBySpecialization
        }

        if (this.state.filterByRate) {
            if (this.state.filterByRate === "hourly-rate-lt") {
                params.params.maxHourlyRate = "49"
            }
            if (this.state.filterByRate === "hourly-rate-gt") {
                params.params.minHourlyRate = "50"
                params.params.maxHourlyRate = "100"
            }
            if (this.state.filterByRate === "hourly-rate-gt-100") {
                params.params.minHourlyRate = "101"
            }
            if (this.state.filterByRate === "session-rate-lt") {
                params.params.maxSessionRate = "49"
            }
            if (this.state.filterByRate === "session-rate-gt") {
                params.params.minSessionRate = "50"
                params.params.maxSessionRate = "100"
            }
            if (this.state.filterByRate === "session-rate-gt-100") {
                params.params.minSessionRate = "101"
            }
        }

        let responseFreelancer = await axios.get(this.apiUrl + "/freelancers", params);
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

    /*............. to handle display collapse of filtering options .............*/ 

    // set Collapse
    setOpen(showFilterOptions) {
        this.setState({
            'open': !this.state.open,
            'showFilterOptions': showFilterOptions
        })
    }

    displayFilterOptions() {
        return (
            <div className="row filter-row filter-row-spacing">
                <div className="d-none d-lg-block col-lg-1 position-right mt-2"></div>
                <div className="col col-md-12 col-lg-4 position-right filter-col">
                    <label className="form-label bold filter-tab">Filter by: </label>
                    <select className="" name="filterBySpecialization" value={this.state.filterBySpecialization} onChange={this.updateFormField}>
                        <option value=""> ----- Specialization ----- </option>
                        <option value="pre-wedding">Pre-wedding</option>
                        <option value="wedding-day-rom">Wedding day / ROM</option>
                        <option value="bridal-makeup">Bridal makeup</option>
                        <option value="natural-glow-makeup">Natural glow makeup</option>
                        <option value="maternity">Maternity shoot</option>
                        <option value="newborn">Newborn shoot</option>
                    </select>
                </div>
                <div className="col col-md-12 col-lg-3 position-right filter-col">
                    <label className="form-label bold filter-tab">Filter by: </label>
                    <select className="" name="filterByType" value={this.state.filterByType} onChange={this.updateFormField}>
                        <option value=""> ----- Service type ----- </option>
                        <option value="photographer">Photographer</option>
                        <option value="videographer">Videographer</option>
                        <option value="makeup-artist">Makeup-artist</option>
                    </select>
                </div>
                <div className="col col-md-12 col-lg-4 position-right filter-col">
                    <label className="form-label bold filter-tab">Filter by: </label>
                    <select className="" name="filterByRate" value={this.state.filterByRate} onChange={this.updateFormField}>
                        <option value=""> -- Hourly rate / Session rate -- </option>
                        <option value="hourly-rate-lt">Hourly: &lt; $50</option>
                        <option value="hourly-rate-gt">Hourly: $50 to $100</option>
                        <option value="hourly-rate-gt-100">Hourly: &gt; $100</option>
                        <option value="session-rate-lt">Session: &lt; $50</option>
                        <option value="session-rate-gt">Session: $50 to $100</option>
                        <option value="session-rate-gt-100">Session: &gt; $100</option>
                    </select>
                </div>
                {/* KIV - sorted */}
                <div>
                    {/* <div className="col col-md-12 col-lg-3 position-right filter-col">
                        <label className="form-label bold filter-tab">Sorted by: </label>
                        <select className="" name="sorted" value={this.state.sorted} onChange={this.updateFormField}>
                            <option value="high-rated">Most rated (high rating)</option>
                            <option value="review">Most reviewed</option>
                            <option value="recent">Most recent</option>
                            <option value="recommended">Most recommended</option>
                            <option value="hourly-rate">Rate range (by hour)</option>
                            <option value="session-rate">Rate range (by session)</option>
                        </select>
                    </div> */}
                </div> 
            </div>
        ) 
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
                return <ViewProfileModal 
                    freelancer={eachFreelancer} reviews={filteredReview} 
                    hideModal={this.hideModal} displayModal={this.displayModal} />
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
    

    // condtional rendering social media
    renderSocialMedia(socialMedia) {
        // https://atomizedobjects.com/blog/react/how-to-render-an-array-of-components-in-react/
        let socialMediaDisplay = Object.keys(socialMedia).map( sm => {
            if (sm === "facebook") {
                return <a href={socialMedia[sm]} target="_blank" rel="noreferrer noopener"><span className="facebook-icon"><FontAwesomeIcon icon={faFacebookF}/></span></a>
            } else if (sm === "instagram") {
                return <a href={socialMedia[sm]} target="_blank" rel="noreferrer noopener"><span className="instagram-icon"><FontAwesomeIcon icon={faInstagram}/></span></a>
            } else if (sm === "tiktok") {
                return <a href={socialMedia[sm]} target="_blank" rel="noreferrer noopener"><span className="tiktok-icon"><FontAwesomeIcon icon={faTiktok}/></span></a>
            } else {
                return null
            }
        } )
        return (
            <div>{socialMediaDisplay}</div>
        )
    }

    /*............. form processing related function .............*/ 

    updateFormField = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    /*............. End of form processing related function .............*/ 


    render() {
        return (
            <React.Fragment>
                {/* filter section */}
                <div className="d-block d-lg-none">
                    {/* collapse section */}
                    <div className="col-lg-1 position-right mt-2">
                        <p 
                            className="d-block d-lg-none col-lg-1 mt-2 bold"
                            type="button"
                            onClick={() => this.setOpen(true)}
                            aria-controls="example-collapse-text"
                            aria-expanded={this.state.open}>
                                Show Filtering <span className="ms-3 arrow-down"><FontAwesomeIcon icon={faAngleDoubleDown}/></span>
                        </p>
                    </div>
                    <Collapse in={this.state.open}>
                        <div id="example-collapse-text">
                            {this.displayFilterOptions()}
                        </div>
                    </Collapse>
                </div>
                {/* Filtering display for laptop size screen*/}
                <div className="d-none d-lg-block">
                    {this.displayFilterOptions()}
                </div>              
                {/* card listing - each freelancer */}
                {this.state.freelancer.map( eachFreelancer => 
                    <div className="col col-lg-4 freelancer-card" key={eachFreelancer._id}>
                        <div className="card card-listing">
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
                                            {this.renderSocialMedia(eachFreelancer.socialMedia)} 
                                            <div className="text-wrapper type mt-2">{eachFreelancer.type}</div>
                                        </div>
                                    </div> 
                                </div> 
                                <hr className="hr-line"></hr>
                                <button href="#" className="btn btn-outline-secondary listing-btn" onClick={() => {
                                    this.displayModal(eachFreelancer, "view_profile")
                                }}>View Profile</button> 
                                <button href="#" className="btn btn-outline-secondary listing-btn ms-2" onClick={() => {
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
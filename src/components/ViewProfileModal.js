import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Carousel from 'react-bootstrap/Carousel'

export default function ViewProfileModal(props) {
  return (
    <React.Fragment>
        <div className="modal show fade" tabIndex="-1" style={{display: "block",backgroundColor: "rgba(0.5, 0.5, 0.5, 0.5)"}}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="col"><h5 className="modal-title">{props.freelancer.name}</h5></div>
                        <div className="col">Total Reviews: {props.reviews.length}</div>
                        <div className="col me-4">Total Recommend to a friend: {(props.reviews.filter( eachReview => eachReview.recommend === true)).length}</div>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={props.hideModal}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {/* Social Media & Contact */}
                        {/* ref: https://stackoverflow.com/questions/39965579/how-to-loop-an-object-in-react */}
                        <div className="row">
                            <div className="col">
                                <h5>Social media</h5>
                                {Object.keys(props.freelancer.socialMedia).map( eachSocialMedia  => 
                                    <div key={eachSocialMedia}>{eachSocialMedia}: {props.freelancer.socialMedia[eachSocialMedia]}</div>
                                )}
                            </div>
                            <div className="col">
                                <h5 className="mt-2">Contact</h5>
                                {Object.keys(props.freelancer.contact).map( eachContact  => 
                                    <div key={eachContact}>{eachContact}: {props.freelancer.contact[eachContact]}</div>
                                )}
                            </div>
                        </div>
                        <hr></hr>
                        {/* Overview */}
                        <div className="row">
                            <h5>Overview</h5>
                            {props.freelancer.bio}
                        </div>
                        <hr></hr>
                        {/* Carousel */}
                        <div className="row">
                            <h5>Portfolio</h5>

                            {/* to remove */}
                            <div>
                            {/* <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
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
                            </div> */}
                            </div>
                            {/* end of to remove */}
                            
                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={require('../images/portfolio/museum.jpg').default}
                                        // src="holder.js/800x400?text=First slide&bg=373940"
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>First slide label</h3>
                                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={require('../images/portfolio/lake_gardens.jpg').default}
                                        // src="holder.js/800x400?text=Second slide&bg=282c34"
                                        alt="Second slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>Second slide label</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={require('../images/portfolio/raffles_hotel.jpg').default}
                                        // src="holder.js/800x400?text=Third slide&bg=20232a"
                                        alt="Third slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>Third slide label</h3>
                                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                            

                        </div>
                        <hr></hr>
                        {/* Review session */}
                        <div className="row">
                            {props.reviews.map( eachReview =>
                                <div key={eachReview._id}>
                                    <div className="rating">
                                    <FontAwesomeIcon icon={faStar}/> {eachReview.rating} &nbsp; &nbsp; &nbsp;
                                    <span className="reviewer-name">From: {eachReview.reviewer.name}</span>
                                    </div>
                                    <div>Date: {eachReview.date}</div>
                                    <div>Detail: {eachReview.description}</div>
                                </div>
                            )}     
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={props.hideModal}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
  );
}

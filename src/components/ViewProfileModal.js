import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faGlobe, faEnvelope, faMobileAlt } from '@fortawesome/free-solid-svg-icons'
import Carousel from 'react-bootstrap/Carousel'

export default function ViewProfileModal(props) {
  return (
    <React.Fragment>
        <div className="modal show fade" tabIndex="-1" style={{display: "block",backgroundColor: "rgba(0.5, 0.5, 0.5, 0.5)"}}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    {/* title / total review / total recommend */}
                    {/* display for iPad & Laptop only */}
                    <div className="modal-header header-model-md">
                        <div className="col ms-3"><h5 className="modal-title">{props.freelancer.name}</h5></div>
                        <div className="col me-md-4 me-lg-0">Total Reviews: {props.reviews.length}</div>
                        <div className="col me-lg-4">Total Recommend to a friend: {(props.reviews.filter( eachReview => eachReview.recommend === true)).length}</div>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={props.hideModal}
                        ></button>  
                    </div>
                    {/* display for iPhone only */}
                    <div className="modal-header row header-model-sm">
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={props.hideModal}
                        ></button>  
                        <div className="col-sm-12 mb-2"><h5 className="modal-title">{props.freelancer.name}</h5></div>
                        <div className="col-sm-12">Total Reviews: {props.reviews.length}</div>
                        <div className="col-sm-12">Total Recommend to a friend: {(props.reviews.filter( eachReview => eachReview.recommend === true)).length}</div>
                    </div>
                    <div className="modal-body">
                        {/* Contact */}
                        {/* ref: https://stackoverflow.com/questions/39965579/how-to-loop-an-object-in-react */}
                        <div className="row">
                            <h5 className="mt-2">Contact</h5>
                            {Object.keys(props.freelancer.contact).map( eachContact  => 
                                <div className="col-sm-12 col-md-6 col-lg-4" key={eachContact}>
                                    {eachContact === "mobile" ? <FontAwesomeIcon icon={faMobileAlt}/> : ""}
                                    {eachContact === "email" ? <FontAwesomeIcon icon={faEnvelope}/> : ""}
                                    {eachContact === "website" ? <FontAwesomeIcon icon={faGlobe}/> : ""}
                                    &nbsp;{props.freelancer.contact[eachContact]}
                                </div>
                            )}  
                        </div>
                        <hr></hr>
                        {/* Overview */}
                        <div className="row profile-overview">
                            <h5>Overview</h5>
                            <div className="col">{props.freelancer.bio}</div>
                        </div>
                        <hr></hr>
                        {/* Carousel */}
                        <div className="row">
                            <h5>Portfolio</h5>
                            <Carousel>
                                {props.freelancer.portfolios.map( eachPortfolio  => 
                                    <Carousel.Item key={eachPortfolio.url}>
                                        <img
                                            className="d-block w-100 carousel-img"
                                            src={eachPortfolio.url}
                                            alt={eachPortfolio.title}
                                        />
                                        <Carousel.Caption>
                                            <h3>{eachPortfolio.title}</h3>
                                            <p>{eachPortfolio.description}</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                )}
                            </Carousel>
                        </div>
                        <hr></hr>
                        {/* Review session */}
                        <div className="row">
                            <h5 className="mb-4 mt-1">Customer Reviews</h5>
                            {props.reviews.map( eachReview =>
                                <div key={eachReview._id} className="mb-3">
                                    <div className="rating">
                                        <FontAwesomeIcon icon={faStar}/> {eachReview.rating} &nbsp; &nbsp; &nbsp;
                                        <span className="reviewer-name">From: {eachReview.reviewer.name}</span>
                                    </div>
                                    {/* format the date & time */}
                                    {/* ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString */}
                                    {/* ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat */}
                                    <div className="grey"><span className="me-3">Date:</span> {(new Date(eachReview.date)).toLocaleDateString('en-SG', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</div>
                                    <div><span className="me-1">Detail:</span> {eachReview.description}</div>
                                </div>
                            )}     
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary large-btn account-btn" onClick={props.hideModal}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
  );
}

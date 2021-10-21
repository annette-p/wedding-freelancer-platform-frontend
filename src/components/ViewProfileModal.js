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
                                <div key={eachReview._id}>
                                    <div className="rating">
                                    <FontAwesomeIcon icon={faStar}/> {eachReview.rating} &nbsp; &nbsp; &nbsp;
                                    <span className="reviewer-name">From: {eachReview.reviewer.name}</span>
                                    </div>
                                    {/* format the date & time */}
                                    {/* ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString */}
                                    {/* ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat */}
                                    <div>Date: {(new Date(eachReview.date)).toLocaleDateString('en-SG', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</div>
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

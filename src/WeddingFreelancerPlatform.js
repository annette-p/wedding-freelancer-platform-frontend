import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from 'react-bootstrap/Nav'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStar, faCommentDots } from '@fortawesome/free-solid-svg-icons'
// import { faFacebookF, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons"
import Listing from './components/Listing'

export default class WeddingFreelancerPlatform extends React.Component {
    state = {
        freelancer: []
    }

    render() {
        return (
            <React.Fragment>
                <div className="row my-2">
                    <div className="navAuthenFrame position-relative">
                        <div className="navAuthen me-3 position-absolute top-0 end-0">
                            Become a Freelancer | 
                            <span className="login ms-2">Login</span> 
                            </div>
                        <div className="navAuthen"></div>
                        <div className="logout">Logout</div>
                    </div>
                </div> 
                {/* Navbar */}
                <div className="row">
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand className="ms-2" href="#">
                            <img src={require('./images/logo/logo.png').default} className="logo" alt="logo"/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                            className="mr-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                            >
                            <Nav.Link href="#action1">View Freelancers</Nav.Link>
                            <Nav.Link href="#action2">Manage Profile</Nav.Link>
                            <Nav.Link href="#">About Us</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                        <div className="d-flex me-3">
                            <input
                                type="text"
                                placeholder="Search"
                                className="mr-2 form-control"
                                aria-label="Search"
                            />
                            <button className="btn-success">Search</button>
                        </div>
                    </Navbar>
                </div> 
                
                {/* display Freelancer list*/}    
                <div className="row mt-3">
                    <Listing/>
                    {/* <div className="col freelancer-card">
                        <div className="card" style={{width: "20rem"}}>
                            <img src={require("./images/portfolio/museum.jpg").default} id="portfolio-1" alt="wedding"/>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <h5 className="card-title">$25 /hour</h5>
                                    </div>
                                    <div className="col">
                                        <p className="rating">
                                            <FontAwesomeIcon icon={faStar}/> 3.0 
                                            <span className="comment"><FontAwesomeIcon icon={faCommentDots}/> 18</span>
                                        </p>
                                    </div> 
                                </div>
                                <p className="card-text">
                                    <span className="text-wrapper">photographer</span>
                                    <span className="text-wrapper ms-2">videographer</span>
                                </p>
                                <hr className="hr-line"></hr>
                                <div className="row">
                                    <div className="col mt-1">
                                        <img src={require("./images/profile/profile-image.jpg").default} id="profile-img" alt="profile"/>
                                    </div> 
                                    <div className="col mt-1 profile-info">
                                        Walle S
                                        <div>
                                            <span className="facebook-icon"><FontAwesomeIcon icon={faFacebookF}/></span>
                                            <span className="instagram-icon"><FontAwesomeIcon icon={faInstagram}/></span>
                                            <span className="tiktok-icon"><FontAwesomeIcon icon={faTiktok}/></span> 
                                        </div>
                                    </div> 
                                </div> 
                                <hr className="hr-line"></hr>
                                <button href="#" className="btn btn-outline-secondary ms-4">View Profile</button>
                                <button href="#" className="btn btn-outline-secondary ms-2">Give Review</button>  
                            </div>
                        </div>
                    </div>  */}
                    <div className="col freelancer-card">colum 2</div> 
                    <div className="col freelancer-card">colum 3</div> 
                </div> 
                {/* End of display Freelancer list*/}         
            </React.Fragment>
        )
    }


}
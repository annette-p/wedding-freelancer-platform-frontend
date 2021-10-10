import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from 'react-bootstrap/Nav'
import Listing from "./components/Listing"

export default class WeddingFreelancerPlatform extends React.Component {
    state = {
        active: "listing"
    }

    setActive(nextPage) {
        this.setState({
            'active': nextPage
        })
    }

    renderContent() {
        if (this.state.active === "listing") {
            return <Listing/>
        } 
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
                {/* End of Navbar */}  
                <div className="row mt-3">
                    {/* display Freelancer list*/}  
                    {this.renderContent()}
                </div> 
                       
            </React.Fragment>
        )
    }


}
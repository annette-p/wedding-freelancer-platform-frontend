import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar"
import Nav from 'react-bootstrap/Nav'

export default class WeddingFreelancerPlatform extends React.Component {
    state = {
        freelancer: []
    }

    render() {
        return (
            <React.Fragment>
                {/* beginning of Navbar */}
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
                        <Nav.Link href="#action1">Create Profile</Nav.Link>
                        <Nav.Link href="#action2">View Freelancers</Nav.Link>
                        <Nav.Link href="#">About Us</Nav.Link>
                        </Nav>
                        <div className="d-flex">
                        <input
                            type="text"
                            placeholder="Search"
                            className="mr-2 form-control"
                            aria-label="Search"
                        />
                        <button className="btn-success">Search</button>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
                {/* end of Navbar */}
            </React.Fragment>
        )
    }


    
}
import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from 'react-bootstrap/Nav'
import Listing from "./components/Listing"
import RegisterForm from "./components/RegisterForm"
import Login from "./components/Login"

export default class WeddingFreelancerPlatform extends React.Component {
    state = {
        active: "listing"
    }

    setActive(nextPage) {
        this.setState({
            'active': nextPage
        })
    }

    // set condtional rending of the page as per the current active page
    renderContent() {
        if (this.state.active === "listing") {
            return <Listing/>
        } else if (this.state.active === "register") {
            return <RegisterForm/>
        } else if (this.state.active === "authentication") {
            return <Login/>
        }
    }
    

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    {/* Registration & Login button */}
                    <div className="row mb-2">
                        <div className="col-11 mt-2">
                            <div className="navAuthenFrame" 
                                onClick={()=>{this.setActive("register")}}>
                                Become a Freelancer &nbsp; |
                            </div>
                        </div>
                        <div className="col-1 mt-2">
                            <div className="navAuthen" 
                                onClick={()=>{this.setActive("authentication")}}>Login</div>
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
                                <Nav.Link onClick={()=>{this.setActive("listing")}}>View Freelancers</Nav.Link>
                                <Nav.Link onClick={()=>{this.setActive("profile")}}>Manage Profile</Nav.Link>
                                <Nav.Link onClick={()=>{this.setActive("about-us")}}>About Us</Nav.Link>
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
                </div>
            </React.Fragment>
        )
    }
}
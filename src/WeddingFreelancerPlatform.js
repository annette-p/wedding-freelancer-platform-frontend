import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from 'react-bootstrap/Nav'
import Listing from "./components/Listing"
import RegisterForm from "./components/RegisterForm"
import Login from "./components/Login"
import EditProfileForm from "./components/EditProfileForm"

export default class WeddingFreelancerPlatform extends React.Component {
    state = {
        active: "listing",
        showLoginModal: false,
        searchText: ""
    }

    updateFormField = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    setActive(nextPage) {
        this.setState({
            'active': nextPage
        })
    }

    /*............. to handle Login authentication .............*/ 

    hideLogin = () => {
        this.setState({
            showLoginModal: false
        })
    }

    showLogin = () => {
        this.setState({
            showLoginModal: true
        })
    }

    performLogout = () => {
        // remove the entry from session
        // ref: https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem
        sessionStorage.removeItem("authenticatedUser")
        // set "active" as "listing" to render the freelancers listing page
        this.setActive("listing")
    }

    renderLoginModal() {
        if (this.state.showLoginModal) {
            return <Login hideLogin={this.hideLogin}/>
        } else {
            return null;
        }
    }

    renderLoginLogoutLinks() {
        // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
        if (JSON.parse(sessionStorage.getItem("authenticatedUser")) === null) {
            return (
                <div className="navAuthen" 
                    onClick={this.showLogin}>Login
                </div>
            )
        } else {
            return (
                <div className="navAuthen" 
                    onClick={this.performLogout}>Logout
                </div>
            )
        }
    }

    renderRegistrationLink() {
        let freelancer = JSON.parse(sessionStorage.getItem("authenticatedUser"))
        if (freelancer === null) {
            return (
                <div className="navAuthenFrame" 
                    onClick={()=>{this.setActive("register")}}>
                    Become a Freelancer &nbsp; |
                </div>
            )
        } else {
            return (
                <div className="navAuthenFrame">
                    {freelancer.name} &nbsp; |
                </div>
            )
        }
    }

    renderManageProfileLink() {
        if (JSON.parse(sessionStorage.getItem("authenticatedUser")) !== null) {
            return (
                <Nav.Link onClick={()=>{this.setActive("manage-profile")}}>Manage Profile</Nav.Link>
            )
        } else {
            return null
        }
    }

    /*............. to handle new Freelancer Submission .............*/ 

    afterAddNewFreelancer = () => {
        this.setState({
            active: "listing"
        })
    } 

    /*............. to handle Edit/Update Freelancer Submission .............*/ 

    hideEditProfileForm = () => {
        this.setState({
            active: "listing"
        })
    }

    afterUpdateFreelancerProfile = () => {
        this.setState({
            active: "listing"
        })
    }
    
    /*............. end of to handle Edit/Update Freelancer Submission .............*/


    
    // set condtional rending of the page as per the current active page
    renderContent() {
        if (this.state.active === "listing") {
            return <Listing searchText={this.state.searchText} />
        } else if (this.state.active === "register") {
            return <RegisterForm afterAddNewFreelancer={this.afterAddNewFreelancer}/>
        } else if (this.state.active === "manage-profile") {
            return <EditProfileForm afterUpdateFreelancerProfile={this.afterUpdateFreelancerProfile} hideForm={this.hideEditProfileForm} />
        }
            
    }
    

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    {/* Registration & Login button */}
                    <div className="row mb-2">
                        <div className="col-9 col-md-11 mt-2">
                            {this.renderRegistrationLink()}
                        </div>
                        <div className="col col-md-1 mt-2">
                            {this.renderLoginLogoutLinks()}
                            {this.renderLoginModal()}
                        </div>  
                    </div> 
                    {/* Navbar */}
                    <div className="row nav-text">
                        <Navbar bg="light" expand="lg">
                            <Navbar.Brand className="ms-2-lg" href="#">
                                <img src={require('./images/logo/logo.png').default} className="logo" alt="logo"/>
                            </Navbar.Brand>
                            <div className="search-box-sm">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="mr-2 form-control search-input-box"
                                    aria-label="Search"
                                    name="searchText"
                                    value={this.state.searchText}
                                    onChange={this.updateFormField}
                                />
                                {/* <button className="btn-success"></button> */}
                            </div>

                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav
                                className="mr-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                                >
                                <Nav.Link onClick={()=>{this.setActive("listing")}}>View Freelancers</Nav.Link>
                                {this.renderManageProfileLink()}
                                <Nav.Link onClick={()=>{this.setActive("about-us")}}>About Us</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                            <div className="search-box me-3">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="mr-2 form-control search-input-box"
                                    aria-label="Search"
                                    name="searchText"
                                    value={this.state.searchText}
                                    onChange={this.updateFormField}
                                />
                                <button className="btn-success" onChange={this.updateFormField}>Search</button>
                            </div>
                        </Navbar>
                    </div> 
                    {/* End of Navbar */}  
                    <div className="row mt-3">
                        {/* conditional rendering of display list*/}  
                        {this.renderContent()}
                    </div> 
                </div>
            </React.Fragment>
        )
    }
    
}
import React from "react"
// import Navbar from "react-bootstrap/Navbar"

export default class WeddingFreelancerPlatform extends React.Component {
    state = {
        freelancer: []
    }

    render() {
        return (
            <React.Fragment>
                <nav class="navbar navbar-light bg-light">
                    <div class="container-fluid">
                        <button class="navbar-brand">Navbar</button>
                        <div class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-outline-success" type="submit">Search</button>
                        </div>
                    </div>
                </nav>



                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <button className="navbar-brand">Navbar</button>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <a className="nav-link active" aria-current="page" >Home</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item">Action</a></li>
                                <li><a className="dropdown-item">Another action</a></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item">Something else here</a></li>
                            </ul>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link disabled">Disabled</a>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </div>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        )
    }


    
}
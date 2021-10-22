import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faTimes } from '@fortawesome/free-solid-svg-icons'
// import axios from 'axios'

export default class Login extends React.Component {
    state = {
        username: "",
        password: "",
        display: false
    }

    displayModal = () => {
        this.setState({
          display: true
        });
    };
    
    hideModal = () => {
        this.setState({
            display: false
        });
    };

    // loginUser = () => {
    //     username: this.state.username,
    //     password: this.state.password
    // }

    updateFormField = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        return (
            <React.Fragment>
            <div
                className="modal show fade"
                tabIndex="-1"
                style={{
                display: "block",
                backgroundColor: "rgba(0.5, 0.5, 0.5, 0.5)"
                }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content login-background">
                        <div className="modal-header">
                            <h4 className="login-titile">Login to your account</h4>
                            <div
                                type="button"
                                className="cross-btn"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={this.hideModal}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </div>
                            {/* <button
                                // style={{color: "white"}}
                                type="button"
                                
                                // className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={this.hideModal}>
                            </button> */}
                        </div>
                        <div className="modal-body login-content">
                            <div className="row mt-4">
                                <img src={require('../images/logo/logo.png').default} className="logo-login" alt="logo"/>
                            </div>
                            <div className="row mb-4 mt-3">
                                <div className="col-1 user-icon"><FontAwesomeIcon icon={faUser}/></div>
                                <div className="col-11 mt-1">
                                    <input type="text" name="username" value={this.state.username} onChange={this.updateFormField} placeholder="Username" className="form-control"/>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-1 user-icon"><FontAwesomeIcon icon={faLock}/></div>
                                <div className="col-11 mt-1">
                                    <input type="text" name="password" value={this.state.password} onChange={this.updateFormField} placeholder="Password" className="form-control"/>
                                </div>
                            </div>
                            <div className="row login-btn">
                                <button type="button" className="btn btn-secondary btn-lg account-btn" onClick={this.loginUser}>LOGIN
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>



            
        )
    }
}


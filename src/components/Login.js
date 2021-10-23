import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faTimes } from '@fortawesome/free-solid-svg-icons'

export default class Login extends React.Component {
    apiUrl = process.env.REACT_APP_BACKEND_API
    state = {
        username: "",
        password: "",
        loginFailed: false
    }

    loginUser = async () => {

        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        }

        await axios.post(this.apiUrl + '/login', loginInfo)
        .then( (result) => {
            // login success

            // update session storage with details of logged-in freelancer
            // ref: https://typeofnan.dev/using-session-storage-in-react-with-hooks/
            /*
                A success login response data from Express will be:
                {
                    "success": true,
                    "freelancer": {freelancer-details}
                }
            */
            // The JSON.stringify() method converts a JavaScript object to a JSON string,
            sessionStorage.setItem("authenticatedUser", JSON.stringify(result.data.freelancer))

            // hide login form
            this.props.hideLogin();

        })
        .catch( (error) => {

            this.setState({
                loginFailed: true
            })

            // to improve error handling
            if (error.response){

                //do something
                console.error('error.response: ', error.response)
            
            } else if (error.request){
            
                //do something else
                console.error('error.request: ', error.request)
            
            } else if (error.message){
            
                //do something other than the other two
                console.error('error.message: ', error.message)
            
            }
        })
        
    }

    renderLoginFailMessage() {
        if (this.state.loginFailed) {
            return (
                <div className="row mt-4 login-fail">
                    <p>Login Failed</p>
                </div>
            )
        }
    }

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
                                aria-label="Close">
                                <FontAwesomeIcon icon={faTimes} onClick={this.props.hideLogin}/>
                            </div>
                        </div>
                        <div className="modal-body login-content">
                            <div className="row mt-4">
                                <img src={require('../images/logo/logo.png').default} className="logo-login" alt="logo"/>
                            </div>
                            {/* display login error */}
                            {this.renderLoginFailMessage()}
                            {/* user name */}
                            <div className="row mb-4 mt-3">
                                <div className="col-1 user-icon"><FontAwesomeIcon icon={faUser}/></div>
                                <div className="col-11 mt-1">
                                    <input type="text" name="username" value={this.state.username} onChange={this.updateFormField} placeholder="Username" className="form-control"/>
                                </div>
                            </div>
                            {/* password */}
                            <div className="row mb-4">
                                <div className="col-1 user-icon"><FontAwesomeIcon icon={faLock}/></div>
                                <div className="col-11 mt-1">
                                    {/* ref: https://www.geeksforgeeks.org/how-to-show-and-hide-password-in-reactjs/ */}
                                    <input type="password" name="password" value={this.state.password} onChange={this.updateFormField} placeholder="Password" className="form-control"/>
                                </div>
                            </div>
                            {/* button */}
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


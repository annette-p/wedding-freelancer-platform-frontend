import React from 'react'
// import axios from 'axios'

export default class Login extends React.Component {
    state = {
        username: "",
        password: ""
    }

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
                <div className="row"></div>
                <div className="row">
                    <label className="form-label mt-3">Name: </label>
                    <input type="text" name="username" value={this.state.username} onChange={this.updateFormField} className="form-control"/>

                    <label className="form-label mt-3">Password: </label>
                    <input type="text" name="password" value={this.state.password} onChange={this.updateFormField} className="form-control"/>
                </div>
                <div className="row mt-3">
                    <button type="button" className="btn btn-primary" onClick={this.loginUser}>Submit and Close
                    </button>
                </div>
                
            </React.Fragment>
        )
    }
}


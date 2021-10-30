import React from 'react'
// import axios from 'axios'

export default class FeedbackForm extends React.Component {
    state = {
        name: "",
        email: "",
        feedback: ""
    }


    
    updateFormField = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    addFeedback = async () => {
        let newFeedback = {
            name: this.state.name,
            email: this.state.email,
            feedback: this.state.feedback
        }
        return newFeedback
    }


    render() {
        return (
            <React.Fragment>
                <div className="row mt-4">
                    <h3 className="d-none d-md-block login-title">Your Feedback is valuable to us</h3>
                    <h5 className="d-md-none login-title">Your Feedback is valuable to us</h5>
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-sm-12 col-md-8">
                            <label className="form-label register-form-headline">Name:</label>
                            <input type="text" name="name" value={this.state.name} onChange={this.updateFormField} className="form-control"/>

                            <label className="form-label register-form-headline">Email: </label>
                            <input type="text" name="email" value={this.state.email} onChange={this.updateForm} className="form-control"/>

                            <label className="form-label register-form-headline">Your Feedback / Questions:</label>
                            <input type="text" name="feedback" value={this.state.feedback} onChange={this.updateFormField} placeholder="Type your feedback or question to us" className="form-control bio-box"/>

                            <button 
                                onClick={this.addFeedback}
                                className="btn btn-secondary btn-lg account-btn" 
                                type="button">
                                 Send Your Message
                            </button>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>
                
                
            </React.Fragment>
        )
    }
}
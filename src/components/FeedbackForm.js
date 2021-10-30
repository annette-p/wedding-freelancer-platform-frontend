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
                    <h3 className="d-none d-md-block feedback-title">Your Feedback is valuable to us</h3>
                    <h5 className="d-md-none feedback-title">Your Feedback is valuable to us</h5>
                    <div className="row feedback-form ms-md-2">
                        <div className="d-none d-lg-block col-2"></div>
                        <div className="col col-lg-8">
                            <label className="form-label register-form-headline mt-4">Name:</label>
                            <input type="text" name="name" value={this.state.name} onChange={this.updateFormField} className="form-control"/>

                            <label className="form-label register-form-headline mt-4">Email: </label>
                            <input type="text" name="email" value={this.state.email} onChange={this.updateFormField} className="form-control"/>

                            <label className="form-label register-form-headline mt-4">Your Feedback / Questions:</label>
                            <input type="text" name="feedback" value={this.state.feedback} onChange={this.updateFormField} placeholder="Type your feedback or question to us" className="form-control bio-box"/>

                            <div className="account-creation-form feedback-btn mt-md-4">
                                <div className="d-grid gap-2 mb-2">
                                    <button 
                                        onClick={this.addFeedback}
                                        className="btn btn-secondary btn-lg account-btn font-size-btn" 
                                        type="button">
                                        Send Your Message
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="d-none d-lg-block col-2"></div>
                        <div className="d-block d-md-none d-lg-none" style={{height: "15px"}}></div>
                        <div className="d-none d-md-block d-lg-none" style={{height: "335px"}}></div>
                        <div className="d-none d-lg-block" style={{height: "180px"}}></div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
import React from 'react'
import emailjs from 'emailjs-com';  // initialize EmailJS
emailjs.init(process.env.REACT_APP_EMAILJS_USER_ID);

export default class FeedbackForm extends React.Component {
    // EmailJS config
    emailUserId = process.env.REACT_APP_EMAILJS_USER_ID
    emailServiceId = process.env.REACT_APP_EMAILJS_SERVICE_ID
    emailTemplateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID

    state = {
        name: "",
        email: "",
        feedback: "",
        errors: {},
        feedbackError: false,
        feedbackSent: false
    }

    updateFormField = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    renderFeedbackForm() {
        if (this.state.feedbackSent === false) {
            return (
                <div className="row feedback-form ms-md-2">
                    <div className="d-none d-lg-block col-2"></div>
                    <div className="col col-lg-8">
                        <label className="form-label register-form-headline mt-4">Name:</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.updateFormField} className="form-control"/>
                        <div className="error-msg">{this.state.errors.name}</div>

                        <label className="form-label register-form-headline mt-4">Email: </label>
                        <input type="text" name="email" value={this.state.email} onChange={this.updateFormField} className="form-control"/>
                        <div className="error-msg">{this.state.errors.email}</div>

                        <label className="form-label register-form-headline mt-4">Your Feedback / Questions:</label>
                        <input type="text" name="feedback" value={this.state.feedback} onChange={this.updateFormField} placeholder="Type your feedback or question to us" className="form-control bio-box"/>
                        <div className="error-msg">{this.state.errors.feedback}</div>

                        <div className="error-msg">
                            {this.state.feedbackError === true ? 
                            "An unexpected error occurred. Unable to send your feedback. Please try again later." : ""}
                        </div>

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
            )
        } else {
            return (
                <div className="row feedback-form ms-md-2">
                    <div className="thankyou-message">
                        <h2 className="mt-3 thanks-msg-headline">Thank you for your feedback! </h2>

                        <p className="mt-3 thanks-msg-content">We collect and manage all your feedback because we are absolutely committed to making the services better for you and other customers.</p>

                        <p className="mt-3 thanks-msg-ending">We will read your feedback and we will love to hear more from you.</p>
                    </div>
                </div>
            )
        }
    }

    validateForm = () => {
        let errors = {}
        let formIsValid = true

        if (!this.state.name) {
            formIsValid = false
            errors["name"] = "Please enter your name"
        }

        if (!this.state.email) {
            formIsValid = false
            errors["email"] = "Please enter your email"
        }

        if (!this.state.feedback) {
            formIsValid = false
            errors["feedback"] = "Please type in your feedback or question for us"
        }

        this.setState({errors})

        return formIsValid
    }

    addFeedback = async () => {
        if (this.validateForm()) {
            // feedback to be sent
            let newFeedback = {
                name: this.state.name,
                email: this.state.email,
                feedback: this.state.feedback
            }
            
            // send feedback via EmailJS
            let feedbackSent = false
            let feedbackError = false
            await emailjs.send(this.emailServiceId, this.emailTemplateId, newFeedback)
            .then(function(response) {
                feedbackSent = true
            }, function(error) {
                feedbackError = true
            });

            this.setState({ feedbackSent, feedbackError })
        }
    }


    render() {
        return (
            <React.Fragment>
                <div className="row mt-4">
                    <h3 className="d-none d-md-block feedback-title">Your Feedback is valuable to us</h3>
                    <h5 className="d-md-none feedback-title">Your Feedback is valuable to us</h5>
                    {this.renderFeedbackForm()}
                </div>
            </React.Fragment>
        )
    }
}


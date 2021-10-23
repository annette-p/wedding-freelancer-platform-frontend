import React from "react";
import axios from 'axios'

export default class GiveReviewModal extends React.Component {
    apiUrl = process.env.REACT_APP_BACKEND_API
    state = {
        newReviewerName: "",
        newReviewerEmail: "",
        newComment: "",
        newRating: "0",
        newRecommend: true,
    }

    updateForm = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    addReview = async () => {
        let newReviewData = {
            reviewerName: this.state.newReviewerName,
            email: this.state.newReviewerEmail,
            description: this.state.newComment,
            rating: this.state.newRating,
            recommend: this.state.newRecommend
        }

        console.log(newReviewData)

        await axios.post(`${this.apiUrl}/freelancer/${this.props.freelancer._id}/review`, newReviewData)
        .then( (result) => {
            // successfully added review

            // hide login form
            this.props.hideModal();

        })
        .catch( (error) => {

            // TODO - to display error that review not added

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

    render() {
        return (
            <React.Fragment>
                <div
                    className="modal show fade"
                    tabIndex="-1"
                    style={{
                    display: "block",
                    backgroundColor: "rgba(0.5, 0.5, 0.5, 0.5)"
                    }}
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h4>Help other bridegrooms know about the services you just received</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={this.props.hideModal}
                            ></button>
                            </div>
                            <div className="modal-body">
                                {/* Name & Email */}
                                <div className="row">
                                    <h5 className="modal-title">Rating and Review for {this.props.freelancer.name}</h5>
                                    <label className="form-label mt-3">Your Name: </label>
                                    <input type="text" name="newReviewerName" value={this.state.newReviewerName} onChange={this.updateForm} className="form-control"/>
                                    <label className="form-label mt-3">Your Email (optional): </label>
                                    <input type="text" name="newReviewerEmail" value={this.state.newReviewerEmail} onChange={this.updateForm} className="form-control"/>
                                </div>
                                {/* Rating & Recommendation */}
                                <div className="row">
                                    {/* Rating */}
                                    <label className="mt-3 my-2"> Rate {this.props.freelancer.name} from: 1 (bad) to 5 (excellent)</label>
                                    <div><input type="radio" name="newRating" value="1" checked={this.state.newRating === "1"} onChange={this.updateForm}/><span className="ms-2">1</span></div>
                                    <div><input type="radio" name="newRating" value="2" checked={this.state.newRating === "2"} onChange={this.updateForm}/><span className="ms-2">2</span></div>
                                    <div><input type="radio" name="newRating" value="3" checked={this.state.newRating === "3"} onChange={this.updateForm}/><span className="ms-2">3</span></div>
                                    <div><input type="radio" name="newRating" value="4" checked={this.state.newRating === "4"} onChange={this.updateForm}/><span className="ms-2">4</span></div>
                                    <div><input type="radio" name="newRating" value="5" checked={this.state.newRating === "5"} onChange={this.updateForm}/><span className="ms-2">5</span></div>
                                    {/* Recomending friend */}
                                    <label className="mt-3 my-2"> Will you recommend {this.props.freelancer.name} to your friend and family?</label>
                                    <div><input type="radio" name="newRecommend" value="true" checked={this.state.newRecommend === "true"} onChange={this.updateForm}/><span className="ms-2">Yes</span></div>
                                    <div><input type="radio" name="newRecommend" value="false" checked={this.state.newRecommend === "false"} onChange={this.updateForm}/><span className="ms-2">No</span></div>
                                    <label className="form-label mt-3">Comment: </label>
                                    <input type="text" name="newComment" value={this.state.newComment} onChange={this.updateForm} className="form-control comment-box"/>
                                </div>
                            </div>
                            {/* Submit */}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.addReview}>Submit and Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    
}


import React from "react";

export default function GiveReviewModal(props) {
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
                            onClick={props.hideModal}
                        ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                {/* Name & Email */}
                                <h5 className="modal-title">Rating and Review for {props.freelancer.name}</h5>
                                <label className="form-label mt-3">Your Name: </label>
                                <input type="text" name="newReviewerName" value={props.newReviewerName} onChange={props.updateField} className="form-control"/>
                                <label className="form-label mt-3">Your Email (optional): </label>
                                <input type="text" name="newReviewerEmail" value={props.newReviewerEmail} onChange={props.updateField} className="form-control"/>
                            </div>
                            <div className="row">
                                {/* Rating */}
                                <label className="mt-3 my-2"> Rate {props.freelancer.name} from: 1 (bad) to 5 (excellent)</label>
                                <div><input type="radio" name="newRating" value="1" checked={props.newRating === "1"} onChange={props.updateField}/><span className="ms-2">1</span></div>
                                <div><input type="radio" name="newRating" value="2" checked={props.newRating === "2"} onChange={props.updateField}/><span className="ms-2">2</span></div>
                                <div><input type="radio" name="newRating" value="3" checked={props.newRating === "3"} onChange={props.updateField}/><span className="ms-2">3</span></div>
                                <div><input type="radio" name="newRating" value="4" checked={props.newRating === "4"} onChange={props.updateField}/><span className="ms-2">4</span></div>
                                <div><input type="radio" name="newRating" value="5" checked={props.newRating === "5"} onChange={props.updateField}/><span className="ms-2">5</span></div>
                                {/* Recomending friend */}
                                <label className="mt-3 my-2"> Will you recommend {props.freelancer.name} to your friend and family?</label>
                                <div><input type="radio" name="newRecommend" value="true" checked={props.newRecommend === "true"} onChange={props.updateField}/><span className="ms-2">Yes</span></div>
                                <div><input type="radio" name="newRecommend" value="false" checked={props.newRecommend === "false"} onChange={props.updateField}/><span className="ms-2">No</span></div>
                                <label className="form-label mt-3">Comment: </label>
                                <input type="text" name="newComment" value={props.newComment} onChange={props.updateField} className="form-control comment-box"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={props.addReview}>Submit and Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
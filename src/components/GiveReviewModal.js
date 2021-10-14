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
                        <h4>Help other customer know about the services you just received</h4>
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
                                <h5 className="modal-title">Rating and Review for {props.freelancer.name}</h5>
                                <label className="form-label mt-3">Your Name: </label>
                                <input type="text" name="" value="" onChange="" className="form-control"/>
                                <label className="form-label mt-3">Your Email (optional): </label>
                                <input type="text" name="" value="" onChange="" className="form-control"/>
                            </div>
                            {/* <hr></hr> */}
                            <div className="row">
                                <label className="mt-3 my-2"> Rate {props.freelancer.name} from: 1(bad) to 5(excellent)</label>
                                <div><input type="radio" name="rate" value="one" /><span className="ms-2">1</span></div>
                                <div><input type="radio" name="rate" value="two" /><span className="ms-2">2</span></div>
                                <div><input type="radio" name="rate" value="three" /><span className="ms-2">3</span></div>
                                <div><input type="radio" name="rate" value="four" /><span className="ms-2">4</span></div>
                                <div><input type="radio" name="rate" value="five" /><span className="ms-2">5</span></div>
                                <label className="mt-3 my-2"> Will you recommend {props.freelancer.name} to your friend and family?</label>
                                <div><input type="radio" name="recommend" value="yes" /><span className="ms-2">Yes</span></div>
                                <div><input type="radio" name="recommend" value="no" /><span className="ms-2">No</span></div>
                                <label className="form-label mt-3">Comment: </label>
                                <input type="text" name="" value="" onChange="" className="form-control comment-box"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={props.hideModal}>Submit and Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
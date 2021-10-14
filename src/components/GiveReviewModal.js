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
                        <h3>Help other customer know about the services you just received</h3>
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
                                <h5 className="modal-title">Review and Rate {props.freelancer.name}</h5>
                                <label className="form-label">Your Name: </label>
                                <input type="text" name="" value="" onChange="" className="form-control"/>
                                <label className="form-label">Your Email (optional): </label>
                                <input type="text" name="" value="" onChange="" className="form-control"/>
                            </div>
                            {/* <hr></hr> */}
                            <div className="row">
                                <label className="mb-2"> Rate {props.freelancer.name} from 1(bad) to 5(excellent)</label>
                                <input type="radio" name="rate" value="one" /><span>1</span>
                                <input type="radio" name="rate" value="two" /><span>2</span>
                                <input type="radio" name="rate" value="three" /><span>3</span>
                                <input type="radio" name="rate" value="four" /><span>4</span>
                                <input type="radio" name="rate" value="five" /><span>5</span>
                                <label className="form-label">Comment: </label>
                                <input type="text" name="" value="" onChange="" className="form-control"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={props.hideModal}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
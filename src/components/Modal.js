import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function Modal(props) {
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
              <h5 className="modal-title">{props.freelancer.name}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={props.hideModal}
              ></button>
            </div>
            <div className="modal-body">
              {/* Social Media & Contact */}
              {/* ref: https://stackoverflow.com/questions/39965579/how-to-loop-an-object-in-react */}
                 <div className="row">
                    <div className="col">
                      <h5>Social media</h5>
                      {Object.keys(props.freelancer.socialMedia).map( eachSocialMedia  => 
                          <div key={eachSocialMedia}>{eachSocialMedia}: {props.freelancer.socialMedia[eachSocialMedia]}</div>
                      )}
                    </div>
                    <div className="col">
                      <h5 className="mt-2">Contact</h5>
                      {Object.keys(props.freelancer.contact).map( eachContact  => 
                          <div key={eachContact}>{eachContact}: {props.freelancer.contact[eachContact]}</div>
                      )}
                    </div>
                 </div>
                 <hr></hr>
                 {/* Review session */}
                 <div className="row">
                      <div className="mb-2">Total Reviews: {props.reviews.length}</div>
                      {props.reviews.map( eachReview =>
                          <div key={eachReview}>
                            <div className="rating">
                              <FontAwesomeIcon icon={faStar}/> {eachReview.rating} &nbsp; &nbsp; &nbsp;
                              <span className="reviewer-name">From: {eachReview.reviewer.name}</span>
                            </div>
                            <div>Date: {eachReview.date}</div>
                            <div>Detail: {eachReview.description}</div>
                          </div>
                      )}     
                 </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={props.hideModal}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

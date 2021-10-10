import React from "react";

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
              <p>Modal body text goes here.</p>
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

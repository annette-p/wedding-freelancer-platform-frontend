import React from 'react'
// import axios from 'axios'
import Collapse from 'react-bootstrap/Collapse'

export default class RegisterForm extends React.Component {
    state = {
        open: false,
    }

    setOpen() {
        this.setState({
            'open': !this.state.open
        })
    }


        // refer to ppt for idea details 

        /*
        1. acct register 


        2. profile setup

        */


    render() {
        return (
            <React.Fragment>
                <button
                        onClick={() => this.setOpen()}
                        aria-controls="example-collapse-text"
                        aria-expanded={this.state.open}
                        >
                        click
                        </button>
                        <Collapse in={this.state.open}>
                            <div id="example-collapse-text">
                                <h2>Register</h2>
                                <div>
                                    <label className="form-label">Name:</label>
                                    <input type="text"
                                        name="taskName"
                                        value=""
                                        onChange=""
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </Collapse>

            </React.Fragment>
        )
    }




}





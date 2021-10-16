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
                                <h3 className="mt-4">Create Profile and Post Your Services</h3>
                                <div className="row register-text">
                                    {/* Name */}
                                    <div className="col">
                                        <label className="form-label register-form-headline">Name:</label>
                                        <input type="text" name="" value="" className="form-control"/>
                                    </div>
                                    {/* Profession */}
                                    <div className="col profession-session">
                                        <label className="form-label register-form-headline">Profession:</label>
                                        <div>
                                            <input type="radio" name="profession" value="photographer"/><span className="ms-2">Photographer</span>
                                            <input className="ms-3" type="radio" name="profession" value="videographer"/><span className="ms-2">Videographer</span>
                                            <input className="ms-3" type="radio" name="profession" value="makeup-artist"/><span className="ms-2">Makeup-artist</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Specialization */}
                                <div className="row register-text">
                                    <label className="form-label register-form-headline">Specialization <span className="side-note">(only 3 list will be displayed)</span> :</label>
                                    <div className="col">
                                        <input type="checkbox" name="" value=""/><span className="ms-2">Photography</span>
                                        <input className="ms-3" type="checkbox" name="" value=""/><span className="ms-2">Videography</span>
                                        <input className="ms-3" type="checkbox" name="" value=""/><span className="ms-2">Pre-wedding</span>
                                        <input className="ms-3" type="checkbox" name="" value=""/><span className="ms-2">Wedding day / ROM</span>
                                        <input className="ms-3" type="checkbox" name="" value=""/><span className="ms-2">Bridal makeup</span>
                                        <input className="ms-3" type="checkbox" name="" value=""/><span className="ms-2">Fancy makeup</span>
                                        <input className="ms-3" type="checkbox" name="" value=""/><span className="ms-2">Natural glow makeup</span>
                                    </div>
                                </div>
                                {/* Rate */}
                                <div className="row register-text">
                                    <div className="col">
                                        <label className="form-label register-form-headline">Rate <span className="side-note">(SGD)</span> :</label>
                                        <input type="text" name="" value="" className="rate-input rate-field"/>
                                        <select className="rate-field" onChange="" value="" name="per">
                                            <option value="hour">hourly</option>
                                            <option value="session">session</option>
                                        </select>
                                    </div>
                                </div>
                                {/* Bio */}
                                <div className="row register-text">
                                    <div className="col">
                                        <label className="form-label register-form-headline">Bio:</label>
                                        <input type="text" name="" value="" placeholder="Describe about past experience and overall profile" className="form-control bio-box"/>
                                    </div>
                                </div>
                                {/* Social Media */}
                                <div className="row register-text">
                                    <div className="col">
                                        <label className="form-label register-form-headline">Social Media:</label>
                                        {/* <div className="row">
                                            <div className="col-2"><label className="form-label">Facebook:</label></div>
                                            <div className="col"><input type="text" name="" value="" className="media-field"/></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-2"><label className="form-label">Instagram:</label></div>
                                            <div className="col"><input type="text" name="" value="" className="media-field"/></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-2"><label className="form-label">Tiktok:</label></div>
                                            <div className="col"><input type="text" name="" value="" className="media-field"/></div>
                                        </div> */}
                                        <div>
                                            <label className="form-label">Facebook:</label>
                                            <input type="text" name="" value="" placeholder="paste URL here" className="media-field ms-2"/>
                                        </div>
                                        <div>
                                            <label className="form-label">Instagram:</label>
                                            <input type="text" name="" value="" placeholder="paste URL here" className="media-field"/>
                                        </div>
                                        <div>
                                            <label className="form-label">Tiktok:</label>
                                            <input type="text" name="" value="" placeholder="paste URL here" className="media-field tiktok"/>
                                        </div>
                                    </div>
                                    {/* Contact */}
                                    <div className="col">
                                        <label className="form-label register-form-headline">Contact:</label>
                                        <div>
                                            <label className="form-label">Mobile:</label>
                                            <input type="text" name="" value="" placeholder="paste URL here" className="media-field ms-2"/>
                                        </div>
                                        <div>
                                            <label className="form-label">Email:</label>
                                            <input type="text" name="" value="" placeholder="paste URL here" className="media-field email"/>
                                        </div>
                                        <div>
                                            <label className="form-label">Web:</label>
                                            <input type="text" name="" value="" placeholder="paste URL here" className="media-field web"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row register-text">
                                    {/* profile Image */}
                                    <div className="col">
                                        <label className="form-label register-form-headline">Upload your profile image:</label>
                                        <input type="text" name="" value="" placeholder="paste your image URL here" className="form-control"/>
                                        <div className="preview" style={{backgroundImage: "url('')"}}>
                                            <p>preview image</p>
                                        </div>
                                    </div>
                                    {/* showCase */}
                                    <div className="col">
                                        <label className="form-label register-form-headline">Upload your show case:</label>
                                        <input type="text" name="" value="" placeholder="paste the image/VDO URL to be displayed on your profile first page" className="form-control"/>
                                        <div className="preview" style={{backgroundImage: "url('')"}}>
                                            <p>preview image</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Portfolio */}
                                <div className="row register-text">
                                    <label className="form-label register-form-headline">Upload your portfolio image:</label>
                                    <div className="col">  
                                        <input type="text" name="" value="" placeholder="paste your image URL here" className="form-control"/>
                                        <div className="preview portfolio-preview" style={{backgroundImage: "url('')"}}>
                                            <p>preview image</p>
                                        </div>
                                    </div>
                                    <div className="col">  
                                        <input type="text" name="" value="" placeholder="paste your image URL here" className="form-control"/>
                                        <div className="preview portfolio-preview" style={{backgroundImage: "url('')"}}>
                                            <p>preview image</p>
                                        </div>
                                    </div>
                                    <div className="col">  
                                        <input type="text" name="" value="" placeholder="paste your image URL here" className="form-control"/>
                                        <div className="preview portfolio-preview" style={{backgroundImage: "url('')"}}>
                                            <p>preview image</p>
                                        </div>
                                    </div>
                                </div>
                                


                                <div className="row"></div>
                                <div className="col"></div>
                                <div></div>
                                
                                
                                
                                
                                

                            </div>
                        </Collapse>

            </React.Fragment>
        )
    }




}





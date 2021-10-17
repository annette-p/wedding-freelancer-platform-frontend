import React from 'react'
// import axios from 'axios'
import Collapse from 'react-bootstrap/Collapse'

export default class RegisterForm extends React.Component {
    state = {
        open: false,
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        type: "",
        specialized: [],
        rate: "",
        rateUnit: "hour",
        bio: "",
        facebook: "",
        instagram: "",
        tiktok: "",
        mobile: "",
        email: "",
        website: "",
        profileImage: "",
        showCase: "",
        portfolios: [ {title: "", url: ""}, {title: "", url: ""}, {title: "", url: ""} ]
        
        // specializations: {
        //     prewedding: "pre-wedding",
        //     rom: "wedding day / ROM",
        //     bridal: "bridal makeup",
        //     fancy: "fancy makeup",
        //     natural: "natural glow makeup",
        // }
    }

    setOpen() {
        this.setState({
            'open': !this.state.open
        })
    }

    updateFormField = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    updateSpecialization = (e) => {
        // remove the item that was just clicked on
        if (this.state.specialized.includes(e.target.value)) {
            let indexToRemove = this.state.specialized.indexOf(e.target.value);
            let cloned = [ ...this.state.specialized.slice(0, indexToRemove), ...this.state.specialized.slice(indexToRemove+1)];
            this.setState({
                specialized: cloned
            })
        } else {
            this.setState({
                specialized: [...this.state.specialized, e.target.value]
            })
        }
    }

    updatePortfolio = (index, e) => {
        this.setState({
            portfolios: [
                ...this.state.portfolios.slice(0, index), 
                { ...this.state.portfolios[index], [e.target.name]: e.target.value }, 
                ...this.state.portfolios.slice(index+1)]
        })
    }
    

    getPortfolioImage = (index) => {
        return {backgroundImage: `url("${this.state.portfolios[index].url}")`}
    }

    getImage = (key) => {
        return {backgroundImage: `url("${this.state[key]}")`}
    }


    render() {
        return (
            <React.Fragment>
                <button
                    onClick={() => this.setOpen()}
                    aria-controls="example-collapse-text"
                    aria-expanded={this.state.open}>
                click
                </button>
                <Collapse in={this.state.open}>
                    <div id="example-collapse-text">
                        {/* ........... Account Registration ........... */}
                        <div id="account-creation-form">
                            <h3 className="mt-4 account-form">Create Your Login details</h3>
                            <h6 className="account-form">Create your account. It's free and takes only few seconds.</h6>
                            {/* Username & Password */}
                            <div className="row register-text">
                                <div className="col">
                                    <label className="form-label register-form-headline">User Name:</label>
                                    <input type="text" name="username" value={this.state.username} onChange={this.updateFormField} className="form-control"/>
                                </div>
                                <div className="col">
                                    <label className="form-label register-form-headline">Password:</label>
                                    <input type="text" name="password" value={this.state.password} onChange={this.updateFormField} className="form-control"/>
                                </div>
                                <div className="col">
                                    <label className="form-label register-form-headline">Confirm Password:</label>
                                    <input type="text" name="confirmPassword" value={this.state.confirmPassword} onChange={this.updateFormField} className="form-control"/>
                                </div>
                            </div>
                        </div>
                        {/* ........... Profile Creation ........... */}
                        <div id="account-creation-form">
                            <h3 className="mt-4 account-form">Create Profile and Post Your Services</h3>
                            <div className="row register-text">
                                {/* Name */}
                                <div className="col">
                                    <label className="form-label register-form-headline">Name:</label>
                                    <input type="text" name="name" value={this.state.name} onChange={this.updateFormField} className="form-control"/>
                                </div>
                                {/* Profession */}
                                <div className="col profession-session">
                                    <label className="form-label register-form-headline">Profession:</label>
                                    <div>
                                        <input type="radio" name="type" value="photographer" onChange={this.updateFormField} checked={this.state.type === "photographer"}/><span className="ms-2">Photographer</span>
                                        <input className="ms-3" type="radio" name="type" value="videographer" onChange={this.updateFormField} checked={this.state.type === "videographer"}/><span className="ms-2">Videographer</span>
                                        <input className="ms-3" type="radio" name="type" value="makeup-artist" onChange={this.updateFormField} checked={this.state.type === "makeup-artist"}/><span className="ms-2">Makeup-artist</span>
                                    </div>
                                </div>
                            </div>
                            {/* Specialization */}
                            <div className="row register-text">
                                <label className="form-label register-form-headline">Specialization <span className="side-note">(only 3 list will be displayed)</span> :</label>
                                <div className="col">
                                    <input type="checkbox" name="specialized" value="photography" onChange={this.updateSpecialization}/><span className="ms-2">Photography</span>
                                    <input className="ms-3" type="checkbox" name="specialized" value="videography" onChange={this.updateSpecialization}/><span className="ms-2">Videography</span>
                                    <input className="ms-3" type="checkbox" name="specialized" value="pre-wedding" onChange={this.updateSpecialization}/><span className="ms-2">Pre-wedding</span>
                                    <input className="ms-3" type="checkbox" name="specialized" value="Wedding day /ROM" onChange={this.updateSpecialization}/><span className="ms-2">Wedding day / ROM</span>
                                    <input className="ms-3" type="checkbox" name="specialized" value="bridal makeup" onChange={this.updateSpecialization}/><span className="ms-2">Bridal makeup</span>
                                    <input className="ms-3" type="checkbox" name="specialized" value="fancy makeup" onChange={this.updateSpecialization}/><span className="ms-2">Fancy makeup</span>
                                    <input className="ms-3" type="checkbox" name="specialized" value="natural glow makeup" onChange={this.updateSpecialization}/><span className="ms-2">Natural glow makeup</span>
                                </div>
                            </div>
                            {/* Rate */}
                            <div className="row register-text">
                                <div className="col">
                                    <label className="form-label register-form-headline">Rate <span className="side-note">(SGD)</span>:</label>
                                    <input type="text" name="rate" value={this.state.rate} onChange={this.updateFormField} className="rate-input rate-field"/>
                                    <select className="rate-field" name="rateUnit" value={this.state.rateUnit} onChange={this.updateFormField}>
                                        <option value="hour">hourly</option>
                                        <option value="session">session</option>
                                    </select>
                                </div>
                            </div>
                            {/* Bio */}
                            <div className="row register-text">
                                <div className="col">
                                    <label className="form-label register-form-headline">Bio:</label>
                                    <input type="text" name="bio" value={this.state.bio} onChange={this.updateFormField} placeholder="Describe about past experience and overall profile" className="form-control bio-box"/>
                                </div>
                            </div>
                            <div className="row register-text">
                                {/* Social Media */}
                                <div className="col">
                                    <label className="form-label register-form-headline">Social Media:</label>
                                    <div>
                                        <label className="form-label">Facebook:</label>
                                        <input type="text" name="facebook" value={this.state.facebook} onChange={this.updateFormField} placeholder="paste URL here" className="media-field ms-2"/>
                                    </div>
                                    <div>
                                        <label className="form-label">Instagram:</label>
                                        <input type="text" name="instagram" value={this.state.instagram} onChange={this.updateFormField} placeholder="paste URL here" className="media-field"/>
                                    </div>
                                    <div>
                                        <label className="form-label">Tiktok:</label>
                                        <input type="text" name="tiktok" value={this.state.tiktok} onChange={this.updateFormField} placeholder="paste URL here" className="media-field tiktok"/>
                                    </div>
                                </div>
                                {/* Contact */}
                                <div className="col">
                                    <label className="form-label register-form-headline">Contact:</label>
                                    <div>
                                        <label className="form-label">Mobile:</label>
                                        <input type="text" name="mobile" value={this.state.mobile} onChange={this.updateFormField} placeholder="paste URL here" className="media-field mobile"/>
                                    </div>
                                    <div>
                                        <label className="form-label">Email:</label>
                                        <input type="text" name="email" value={this.state.email} onChange={this.updateFormField} placeholder="paste URL here" className="media-field email"/>
                                    </div>
                                    <div>
                                        <label className="form-label">Website:</label>
                                        <input type="text" name="web" value={this.state.website} onChange={this.updateFormField} placeholder="paste URL here" className="media-field web"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row register-text">
                                {/* profile Image */}
                                <div className="col">
                                    <label className="form-label register-form-headline">Upload your profile image:</label>
                                    <input type="text" name="profileImage" value={this.state.profileImage} onChange={this.updateFormField} placeholder="paste your image URL here" className="form-control"/>
                                    <div className="preview" style={this.getImage("profileImage")}>
                                        <p>{this.state.profileImage === "" ? "preview image" : ""}</p>
                                    </div>
                                </div>
                                {/* showCase */}
                                <div className="col">
                                    <label className="form-label register-form-headline">Upload your show case:</label>
                                    <input type="text" name="showCase" value={this.state.showCase} onChange={this.updateFormField} placeholder="paste the image/VDO URL to be displayed on your profile first page" className="form-control"/>
                                    <div className="preview" style={this.getImage("showCase")}>
                                        <p>{this.state.showCase === "" ? "preview image" : ""}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Portfolio */}
                            <div className="row register-text">
                                <label className="form-label register-form-headline">Upload your portfolio:</label>
                                <div className="col">  
                                    <label className="form-label">Portfolio 1:</label>
                                    <input type="text" name="title" value={this.state.portfolios[0].title} onChange={(e) => this.updatePortfolio(0, e)} className="form-control portfolio-title" placeholder="enter your portfolio title"/>
                                    <input type="text" name="url" value={this.state.portfolios[0].url} onChange={(e) => this.updatePortfolio(0, e)} placeholder="paste your portfolio image URL here" className="form-control"/>
                                    <div className="preview portfolio-preview" style={this.getPortfolioImage(0)}>
                                        <p>{this.state.portfolios[0].url === "" ? "preview image" : ""}</p>
                                    </div>
                                </div>
                                <div className="col">  
                                    <label className="form-label">Portfolio 2:</label>
                                    <input type="text" name="title" value={this.state.portfolios[1].title} onChange={(e) => this.updatePortfolio(1, e)} className="form-control portfolio-title" placeholder="enter your portfolio title"/>
                                    <input type="text" name="url" value={this.state.portfolios[1].url} onChange={(e) => this.updatePortfolio(1, e)} placeholder="paste your portfolio image URL here" className="form-control"/>
                                    <div className="preview portfolio-preview" style={this.getPortfolioImage(1)}>
                                        <p>{this.state.portfolios[1].url === "" ? "preview image" : ""}</p>
                                    </div>
                                </div>
                                <div className="col">  
                                    <label className="form-label">Portfolio 3:</label>
                                    <input type="text" name="title" value={this.state.portfolios[2].title} onChange={(e) => this.updatePortfolio(2, e)} className="form-control portfolio-title" placeholder="enter your portfolio title"/>
                                    <input type="text" name="url" value={this.state.portfolios[2].url} onChange={(e) => this.updatePortfolio(2, e)} placeholder="paste your portfolio image URL here" className="form-control"/>
                                    <div className="preview portfolio-preview" style={this.getPortfolioImage(2)}>
                                        <p>{this.state.portfolios[2].url === "" ? "preview image" : ""}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Collapse>
            </React.Fragment>
        )
    }
}





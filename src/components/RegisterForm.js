import React from 'react'
import axios from 'axios'
import Collapse from 'react-bootstrap/Collapse'

export default class RegisterForm extends React.Component {
    apiUrl = process.env.REACT_APP_BACKEND_API
    state = {
        open: false,
        showRegistration: true,
        errors: {},
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
        portfolios: [ 
            {title: "", description: "", url: ""}, 
            {title: "", description: "", url: ""}, 
            {title: "", description: "", url: ""} 
        ]
    }

    // set Collapse
    setOpen(showRegistration) {
        this.setState({
            'open': !this.state.open,
            'showRegistration': showRegistration
        })
    }

    // to display and hide the div form for registration
    showRegistrationForm = () => {
        if (this.state.showRegistration === true) {
            return {display: "block"}
        } else {
            return {display: "none"}
        }
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

    // React Form Validations / https://allegra9.medium.com/react-form-validations-286590d26b6f
    validateForm = () => {
        let errors = {}
        let formIsValid = true

        if (this.state.showRegistration === true) {
            if (!this.state.username) {
                formIsValid = false
                errors["username"] = "Please enter your prefered username"
            }

            if (!this.state.password) {
                formIsValid = false
                errors["password"] = "Please enter your prefered password"
            }

            if (!this.state.confirmPassword) {
                formIsValid = false
                errors["confirmPassword"] = "Please enter your prefered password again"
            }

            if (this.state.confirmPassword !== this.state.password) {
                formIsValid = false
                errors["confirmPassword"] = "Password mismatch. Please make sure the same password"
            }
        }

        if (!this.state.name) {
            formIsValid = false
            errors["name"] = "Please enter your name"
        }

        if (!this.state.type) {
            formIsValid = false
            errors["type"] = "Please select your profession"
        }

        if (this.state.specialized.length === 0) {
            formIsValid = false
            errors["specialized"] = "Please select at least 1 specialization"
        }

        if (this.state.specialized.length > 6) {
            formIsValid = false
            errors["specialized"] = "Only maximum 6 specialization are allowed"
        }

        if (!this.state.rate || isNaN(this.state.rate)) {
            formIsValid = false
            errors["rate"] = "Please enter rate of your service"
        }

        if (!this.state.bio) {
            formIsValid = false
            errors["bio"] = "Please describe your bio"
        }

        if (!this.state.email) {
            formIsValid = false
            errors["email"] = "Please enter email address"
        }

        if (!this.state.showCase) {
            formIsValid = false
            errors["showCase"] = "Please provide image URL to be displayed on your profile first page"
        }

        if (!this.state.facebook && !this.state.instagram && !this.state.tiktok) {
            formIsValid = false
            errors["socialMedia"] = "Please provide at least 1 social media"
        }

        let numPortfolios = 0
        this.state.portfolios.map( (portfolio) => {
            if (portfolio.title && portfolio.title.trim().length > 0 && 
                portfolio.description && portfolio.description.trim().length > 0 &&
                portfolio.url && portfolio.url.trim().length > 0) {
                
                numPortfolios = numPortfolios + 1
                
            }
            return portfolio
        })

        if (numPortfolios === 0) {
            formIsValid = false
            errors["portfolios"] = "Please provide at least 1 portfolio"
        }


        this.setState({errors})

        return formIsValid
 
    }

    
    addFreelancer = async () => {
        // perform validation on the form first
        if (this.validateForm ()) {
            // then process the form when all validation is done
            let newFreelancerData = {
                "type": this.state.type,
                "specialized": this.state.specialized,  
                "rate": this.state.rate,
                "rateUnit": this.state.rateUnit,
                "name": this.state.name,
                "profileImage": this.state.profileImage,
                "socialMedia": {
                    "facebook": this.state.facebook,
                    "instagram": this.state.instagram,
                    "tiktok": this.state.tiktok
                },
                "contact": {
                    "mobile": this.state.mobile,
                    "email": this.state.email,
                    "website": this.state.website
                },
                "bio": this.state.bio,
                "showCase": this.state.showCase,
                "portfolios": this.state.portfolios
            }
    
            // if there's registration
            if (this.state.showRegistration) {
                newFreelancerData.username = this.state.username
                newFreelancerData.password = this.state.password
            }
            console.log(newFreelancerData)
    
            await axios.post(this.apiUrl + '/freelancer', newFreelancerData)
            .then( (result) => {
                console.log("success", result.data)
    
                this.props.afterAddNewFreelancer()
            })
            .catch( (error) => {
    
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

    }


    render() {
        return (
            <React.Fragment>
                {/* create profile buttons */}
                <div className="row">
                    <div className="col d-grid gap-2 col-6 mx-auto mb-1">
                        <button
                            className="btn btn-secondary btn-lg account-btn"
                            type="button"
                            onClick={() => this.setOpen(true)}
                            aria-controls="example-collapse-text"
                            aria-expanded={this.state.open}>
                                Create Account and Profile
                        </button>
                    </div>
                    <div className="col d-grid gap-2 col-6 mx-auto mb-1">
                        <button
                            className="btn btn-secondary btn-lg account-btn" 
                            type="button"
                            onClick={() => this.setOpen(false)}
                            aria-controls="example-collapse-text"
                            aria-expanded={this.state.open}>
                             Create Profile
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p className="register-description">New? – register profile and start promote your talent</p>
                    </div>
                    <div className="col">
                        <p className="register-description">OR listing profile without registeration (no ability to modify listing)</p>
                    </div>
                </div>
                <Collapse in={this.state.open}>
                    <div id="example-collapse-text">
                        {/* ........... Account Registration ........... */}
                        <div style={this.showRegistrationForm()} className="account-creation-form">
                            <h3 className="mt-4 account-form">Create Your Login details</h3>
                            <h6 className="account-form">Create your account. It's free and takes only few seconds.</h6>
                            {/* Username & Password */}
                            <div className="row register-text">
                                <div className="col">
                                    <label className="form-label register-form-headline">User Name:</label>
                                    <input type="text" name="username" value={this.state.username} onChange={this.updateFormField} className="form-control"/>
                                    <div className="error-msg">{this.state.errors.username}</div>
                                </div>
                                <div className="col">
                                    <label className="form-label register-form-headline">Password:</label>
                                    <input type="password" name="password" value={this.state.password} onChange={this.updateFormField} className="form-control"/>
                                    <div className="error-msg">{this.state.errors.password}</div>
                                </div>
                                <div className="col">
                                    <label className="form-label register-form-headline">Confirm Password:</label>
                                    <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.updateFormField} className="form-control"/>
                                    <div className="error-msg">{this.state.errors.confirmPassword}</div>
                                </div>
                            </div>
                        </div>
                        {/* ........... Profile Creation ........... */}
                        <div className="account-creation-form">
                            <h3 className="mt-4 account-form">Create Profile and Post Your Services</h3>
                            <div className="row register-text">
                                {/* Name */}
                                <div className="col">
                                    <label className="form-label register-form-headline">Name:</label>
                                    <input type="text" name="name" value={this.state.name} onChange={this.updateFormField} className="form-control"/>
                                    <div className="error-msg">{this.state.errors.name}</div>
                                </div>
                                {/* Profession */}
                                <div className="col profession-session">
                                    <label className="form-label register-form-headline">Profession:</label>
                                    <div>
                                        <input type="radio" name="type" value="photographer" onChange={this.updateFormField} checked={this.state.type === "photographer"}/><span className="ms-2">Photographer</span>
                                        <input className="ms-3" type="radio" name="type" value="videographer" onChange={this.updateFormField} checked={this.state.type === "videographer"}/><span className="ms-2">Videographer</span>
                                        <input className="ms-3" type="radio" name="type" value="makeup-artist" onChange={this.updateFormField} checked={this.state.type === "makeup-artist"}/><span className="ms-2">Makeup-artist</span>
                                    </div>
                                    <div className="error-msg">{this.state.errors.type}</div>
                                </div>
                            </div>
                            {/* Specialization */}
                            <div className="row register-text">
                                <label className="form-label register-form-headline">Specialization <span className="side-note">(only 6 list will be displayed)</span> :</label>
                                <div className="col">
                                    <input type="checkbox" name="specialized" value="photography" onChange={this.updateSpecialization}/><span className="ms-2">Photography</span>
                                    <input className="ms-3" type="checkbox" name="specialized" value="videography" onChange={this.updateSpecialization}/><span className="ms-2">Videography</span>
                                    <input className="ms-3" type="checkbox" name="specialized" value="pre-wedding" onChange={this.updateSpecialization}/><span className="ms-2">Pre-wedding</span>
                                    <input className="ms-3" type="checkbox" name="specialized" value="Wedding day /ROM" onChange={this.updateSpecialization}/><span className="ms-2">Wedding day / ROM</span>
                                    <input className="ms-3" type="checkbox" name="specialized" value="maternity" onChange={this.updateSpecialization}/><span className="ms-2">Maternity shoot</span>
                                    <input className="ms-3" type="checkbox" name="specialized" value="newborn" onChange={this.updateSpecialization}/><span className="ms-2">Newborn shoot</span>
                                    <input className="ms-3" type="checkbox" name="specialized" value="bridal makeup" onChange={this.updateSpecialization}/><span className="ms-2">Bridal makeup</span>
                                    <input className="ms-3" type="checkbox" name="specialized" value="fancy makeup" onChange={this.updateSpecialization}/><span className="ms-2">Fancy makeup</span>
                                    <input className="ms-3" type="checkbox" name="specialized" value="natural glow makeup" onChange={this.updateSpecialization}/><span className="ms-2">Natural glow makeup</span>
                                </div>
                                <div className="error-msg">{this.state.errors.specialized}</div>
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
                                <div className="error-msg">{this.state.errors.rate}</div>
                            </div>
                            {/* Bio */}
                            <div className="row register-text">
                                <div className="col">
                                    <label className="form-label register-form-headline">Bio:</label>
                                    <input type="text" name="bio" value={this.state.bio} onChange={this.updateFormField} placeholder="Describe about past experience and overall profile" className="form-control bio-box"/>
                                </div>
                                <div className="error-msg">{this.state.errors.bio}</div>
                            </div>
                            <div className="row register-text">
                                {/* Social Media */}
                                <div className="col">
                                    <label className="form-label register-form-headline">Social Media:</label>
                                    <div>
                                        <label className="form-label">Facebook:</label>
                                        <input type="text" name="facebook" value={this.state.facebook} onChange={this.updateFormField} placeholder="Facebook URL" className="media-field ms-2"/>
                                    </div>
                                    <div>
                                        <label className="form-label">Instagram:</label>
                                        <input type="text" name="instagram" value={this.state.instagram} onChange={this.updateFormField} placeholder="Instagram URL" className="media-field"/>
                                    </div>
                                    <div>
                                        <label className="form-label">Tiktok:</label>
                                        <input type="text" name="tiktok" value={this.state.tiktok} onChange={this.updateFormField} placeholder="Tiktok URL" className="media-field tiktok"/>
                                    </div>
                                    <div className="error-msg">{this.state.errors.socialMedia}</div>
                                </div>
                                {/* Contact */}
                                <div className="col">
                                    <label className="form-label register-form-headline">Contact:</label>
                                    <div>
                                        <label className="form-label">Mobile:</label>
                                        <input type="text" name="mobile" value={this.state.mobile} onChange={this.updateFormField} placeholder="mobile number" className="media-field mobile"/>
                                    </div>
                                    <div>
                                        <label className="form-label">Email:</label>
                                        <input type="text" name="email" value={this.state.email} onChange={this.updateFormField} placeholder="email address" className="media-field email"/>
                                    </div>
                                    <div>
                                        <label className="form-label">Website:</label>
                                        <input type="text" name="web" value={this.state.website} onChange={this.updateFormField} placeholder="website URL" className="media-field web"/>
                                    </div>
                                    <div className="error-msg">{this.state.errors.email}</div>
                                </div>
                            </div>
                            <div className="row register-text">
                                {/* profile Image */}
                                <div className="col">
                                    <label className="form-label register-form-headline">Upload your profile image:</label>
                                    <input type="text" name="profileImage" value={this.state.profileImage} onChange={this.updateFormField} placeholder="image URL (portrait orientation image)" className="form-control"/>
                                    <div className="preview profile-img-preview" style={this.getImage("profileImage")}>
                                        <p className="img-discription">{this.state.profileImage === "" ? "Preview image": ""}</p>
                                    </div>
                                </div>
                                {/* showCase */}
                                <div className="col">
                                    <label className="form-label register-form-headline">Upload your showcase <span className="side-note">(to display on profile first page)</span>:</label>
                                    <input type="text" name="showCase" value={this.state.showCase} onChange={this.updateFormField} placeholder="image/VDO URL (portrait orientation image)" className="form-control"/>
                                    <div className="error-msg">{this.state.errors.showCase}</div>
                                    <div className="preview" style={this.getImage("showCase")}>
                                        <p className="img-discription">{this.state.showCase === "" ? "Preview image" : ""}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Portfolio */}
                            <div className="row register-text">
                                <label className="form-label register-form-headline">Upload your portfolio:</label>
                                {/* Portfolio 1 */}
                                <div className="col">  
                                    <label className="form-label portfolio-number head-center">Portfolio 1</label>
                                    <div>
                                        <label className="form-label">Title:</label>
                                        <input type="text" name="title" value={this.state.portfolios[0].title} onChange={(e) => this.updatePortfolio(0, e)} className="form-control portfolio-title" placeholder="portfolio title"/>
                                    </div>
                                    <div>
                                        <label className="form-label">Description:</label>
                                        <input type="text" name="description" value={this.state.portfolios[0].description} onChange={(e) => this.updatePortfolio(0, e)} className="form-control" placeholder="describe your portfolio (max 60 characters)"/>
                                    </div>
                                    <div>
                                        <label className="form-label">url:</label>
                                        <input type="text" name="url" value={this.state.portfolios[0].url} onChange={(e) => this.updatePortfolio(0, e)} placeholder="image URL (landscape orientation image)" className="form-control"/>
                                    </div>
                                    <div className="preview portfolio-preview" style={this.getPortfolioImage(0)}>
                                        <p className="img-discription">{this.state.portfolios[0].url === "" ? "Preview image" : ""}</p>
                                    </div>
                                </div>
                                {/* Portfolio 2 */}
                                <div className="col">  
                                    <label className="form-label portfolio-number head-center">Portfolio 2</label>
                                    <div>
                                        <label className="form-label">Title:</label>
                                        <input type="text" name="title" value={this.state.portfolios[1].title} onChange={(e) => this.updatePortfolio(1, e)} className="form-control portfolio-title" placeholder="portfolio title"/>
                                    </div>
                                    <div>
                                        <label className="form-label">Description:</label>
                                        <input type="text" name="description" value={this.state.portfolios[1].description} onChange={(e) => this.updatePortfolio(1, e)} className="form-control" placeholder="describe your portfolio (max 60 characters)"/>
                                    </div>
                                    <div>
                                        <label className="form-label">url:</label>
                                        <input type="text" name="url" value={this.state.portfolios[1].url} onChange={(e) => this.updatePortfolio(1, e)} placeholder="image URL (landscape orientation image)" className="form-control"/>
                                    </div>
                                    <div className="preview portfolio-preview" style={this.getPortfolioImage(1)}>
                                        <p className="img-discription">{this.state.portfolios[1].url === "" ? "Preview image" : ""}</p>
                                    </div>
                                </div>
                                {/* Portfolio 3 */}
                                <div className="col">  
                                    <label className="form-label portfolio-number head-center">Portfolio 3</label>
                                    <div>
                                        <label className="form-label">Title:</label>
                                        <input type="text" name="title" value={this.state.portfolios[2].title} onChange={(e) => this.updatePortfolio(2, e)} className="form-control portfolio-title" placeholder="portfolio title"/>
                                    </div>
                                    <div>
                                        <label className="form-label">Description:</label>
                                        <input type="text" name="description" value={this.state.portfolios[2].description} onChange={(e) => this.updatePortfolio(2, e)} className="form-control" placeholder="describe your portfolio (max 60 characters)"/>
                                    </div>
                                    <div>
                                        <label className="form-label">url:</label>
                                        <input type="text" name="url" value={this.state.portfolios[2].url} onChange={(e) => this.updatePortfolio(2, e)} placeholder="image URL (landscape orientation image)" className="form-control"/>
                                    </div>
                                    <div className="preview portfolio-preview" style={this.getPortfolioImage(2)}>
                                        <p className="img-discription">{this.state.portfolios[2].url === "" ? "Preview image" : ""}</p>
                                    </div>
                                </div>
                                <div className="error-msg-portfolio">{this.state.errors.portfolios}</div>
                            </div>
                        </div>
                        {/* ........... submit buttons ........... */}
                        <div className="account-creation-form">
                            <div className="d-grid gap-2 account-creation-button mb-2">
                                <button 
                                    onClick={this.addFreelancer}
                                    className="btn btn-secondary btn-lg account-btn" 
                                    type="button">
                                    {this.state.showRegistration === true ? "Register & Create" : "Just Create" }
                                </button>
                                <p className="register-description">
                                    {this.state.showRegistration === true ? "" : "Listing with no ability to modify the profile & post"}
                                </p>
                            </div>
                        </div>
                    </div>
                </Collapse>
            </React.Fragment>
        )
    }
}





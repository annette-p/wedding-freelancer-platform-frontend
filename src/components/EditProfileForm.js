import React from 'react'
import axios from 'axios'
import Collapse from 'react-bootstrap/Collapse'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'

export default class EditProfileForm extends React.Component {
    apiUrl = process.env.REACT_APP_BACKEND_API
    state = {
        activeDisplay: "account-details",
        showNavigationCard: true,
        loading: false,
        updateCompleted: false,
        errors: {},
        "_id": "",
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
        ],

        reasonToDelete: "",
        specifyDeleteReason: "",

        username: "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        changePasswordFailed: false,
        changePasswordSuccess: false
    }

    async componentDidMount() {
        this.setState({
            loading: true
        })
        this.fetchData();
        this.setState({
            loading: false
        })
    }

    fetchData() {
        let freelancer = JSON.parse(sessionStorage.getItem("authenticatedUser"))

        if (freelancer !== null) {

            // to retrieve portfolio first and massage data (array) first
            let freelancerPortfolio = [ ...this.state.portfolios ]
            for (let i=0; i < freelancer.portfolios.length; i++) {
                freelancerPortfolio[i] = freelancer.portfolios[i]
            }

            this.setState({
                "_id": freelancer._id,
                "name": freelancer.name,
                "type": freelancer.type,
                "specialized":  freelancer.specialized,
                "rate": freelancer.rate.toString(),
                "rateUnit": freelancer.rateUnit,
                "bio": freelancer.bio,
                "facebook": freelancer.socialMedia.facebook,
                "instagram": freelancer.socialMedia.instagram,
                "tiktok": freelancer.socialMedia.tiktok,
                "mobile": freelancer.contact.mobile,
                "email": freelancer.contact.email,
                "website": freelancer.contact.website,
                "profileImage": freelancer.profileImage,
                "showCase": freelancer.showCase,
                "portfolios": freelancerPortfolio
            })
        }
        
    }

    
    setActiveDisplay(activeDisplay) {
        // validate before switch to different tab
        if (this.validateForm()) {
            this.setState({
                "activeDisplay": activeDisplay,
                "changePasswordFailed": false,
                "changePasswordSuccess": false
            })
        }
    }

    // set Collapse
    setOpen(showNavigationCard) {
        this.setState({
            'open': !this.state.open,
            'showNavigationCard': showNavigationCard
        })
    }

    
    /* ............. related functions to process each account section tab  ............. */ 

    displayNavigationCard() {
        return (
            <div className="card edit-acct-nav-card">
                <ul className="list-group list-group-flush nav-card-ul">
                    {/* <li className="list-group-item disabled nav-card">
                        My Profile Setting <span className="ms-2"><FontAwesomeIcon icon={faAngleDoubleDown}/></span>
                    </li> */}
                    <li className="list-group-item disabled nav-card">Dashboard <span class="beta">(beta)</span></li>
                    <li className="list-group-item nav-card" onClick={() => {this.setActiveDisplay("account-details")}}>Account Details</li>
                    <li className="list-group-item nav-card" onClick={() => {this.setActiveDisplay("social-media")}}>Contact &amp; Social Media</li>
                    <li className="list-group-item nav-card" onClick={() => {this.setActiveDisplay("showcase")}}>Profile Image &amp; Showcase</li>
                    <li className="list-group-item nav-card" onClick={() => {this.setActiveDisplay("portfolio")}}>Portfolio</li>
                    <li className="list-group-item nav-card" onClick={() => {this.setActiveDisplay("change-password")}}>Change Password</li>
                    <li className="list-group-item nav-card" onClick={() => {this.setActiveDisplay("delete-account")}}>Delete Account</li>
                </ul>
            </div>
        )
    }

    displayProfileUpdateButtons() {
        return (
            /* ........... submit buttons ........... */
            <div className="account-creation-form">
                <div className="d-grid gap-2 account-creation-button mb-2">
                    <button 
                        onClick={this.updateProfile}
                        className="btn btn-secondary btn-lg account-btn edit-acct-btn" 
                        type="button">
                            Update
                    </button>
                </div>
                <div className="d-grid gap-2 account-creation-button mb-2">
                    <button 
                        onClick={this.updateProfileAndClose}
                        className="btn btn-secondary btn-lg account-btn edit-acct-btn" 
                        type="button">
                            Update and Close
                    </button>
                </div>
                <div className="d-grid gap-2 account-creation-button mb-2">
                    <button 
                        onClick={this.props.hideForm}
                        className="btn btn-secondary btn-lg account-btn edit-acct-btn" 
                        type="button">
                            Cancel
                    </button>
                </div>
            </div>
        )
    }

    displayAccountDetails() {
        if (this.state.activeDisplay === "account-details") {
            return (
                <div className="row register-text">
                    <h3 className="account-form d-none d-md-block">Account Setting</h3>
                    <h4 className="account-form d-md-none">Account Setting</h4>
                    <div className="row mb-3">
                        {/* Name */}
                        <div className="col-sm-12 col-md mt-4">
                            <label className="form-label register-form-headline">Name:</label>
                            <input type="text" name="name" value={this.state.name} onChange={this.updateFormField} className="form-control"/>
                            <div className="error-msg">{this.state.errors.name}</div>
                        </div>
                        {/* Profession */}
                        <div className="col-sm-12 col-md mt-4 profession-edit">
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
                    <div className="mt-4 mb-3">
                        <label className="form-label register-form-headline">Specialization <span className="side-note">(only 6 list will be displayed)</span> :</label>
                        <div className="col">
                            <input type="checkbox" name="specialized" value="photography" checked={this.state.specialized.indexOf("photography") >= 0} onChange={this.updateSpecialization}/><span className="ms-2">Photography</span>
                            <input className="ms-3" type="checkbox" name="specialized" value="videography" checked={this.state.specialized.indexOf("videography") >= 0} onChange={this.updateSpecialization}/><span className="ms-2">Videography</span>
                            <input className="ms-3" type="checkbox" name="specialized" value="pre-wedding" checked={this.state.specialized.indexOf("pre-wedding") >= 0} onChange={this.updateSpecialization}/><span className="ms-2">Pre-wedding</span>
                            <input className="ms-3" type="checkbox" name="specialized" value="wedding-day-rom" checked={this.state.specialized.indexOf("wedding-day-rom") >= 0} onChange={this.updateSpecialization}/><span className="ms-2">Wedding day / ROM</span>
                            <input className="ms-3" type="checkbox" name="specialized" value="maternity" checked={this.state.specialized.indexOf("maternity") >= 0} onChange={this.updateSpecialization}/><span className="ms-2">Maternity shoot</span>
                            <input className="ms-3" type="checkbox" name="specialized" value="newborn" checked={this.state.specialized.indexOf("newborn") >= 0} onChange={this.updateSpecialization}/><span className="ms-2">Newborn shoot</span>
                            <input className="ms-3" type="checkbox" name="specialized" value="bridal-makeup" checked={this.state.specialized.indexOf("bridal-makeup") >= 0} onChange={this.updateSpecialization}/><span className="ms-2">Bridal makeup</span>
                            <input className="ms-3" type="checkbox" name="specialized" value="fancy-makeup" checked={this.state.specialized.indexOf("fancy-makeup") >= 0} onChange={this.updateSpecialization}/><span className="ms-2">Fancy makeup</span>
                            <input className="ms-3" type="checkbox" name="specialized" value="natural-glow-makeup" checked={this.state.specialized.indexOf("natural-glow-makeup") >= 0} onChange={this.updateSpecialization}/><span className="ms-2">Natural glow makeup</span>
                        </div>
                        <div className="error-msg">{this.state.errors.specialized}</div>
                    </div>
                    {/* Rate */}
                    <div className="mt-4">
                        <label className="form-label register-form-headline">Rate <span className="side-note">(SGD)</span>:</label>
                        <input type="text" name="rate" value={this.state.rate} onChange={this.updateFormField} className="rate-input rate-field"/>
                        <select className="rate-field" name="rateUnit" value={this.state.rateUnit} onChange={this.updateFormField}>
                            <option value="hour">hourly</option>
                            <option value="session">session</option>
                        </select>
                        <div className="error-msg">{this.state.errors.rate}</div>
                    </div>
                    {/* Bio */}
                    <div className="mt-4 edit-bio-col">
                        <label className="form-label register-form-headline">Bio:</label>
                        <input type="text" name="bio" value={this.state.bio} onChange={this.updateFormField} placeholder="Describe about past experience and overall profile" className="form-control bio-box"/>
                        
                        <div className="error-msg">{this.state.errors.bio}</div>
                    </div>
                    {/* ........... submit buttons ........... */}
                    {this.displayProfileUpdateButtons()}
                </div>                
            )
        } else {
            return null
        }
        
    }

    displaySocialMedia() {
        if (this.state.activeDisplay === "social-media") {
            return (
                <div className="row register-text">
                    <h3 className="account-form d-none d-md-block">Contact &amp; Social Media Setting</h3>
                    <h4 className="account-form d-md-none">Contact &amp; Social Media Setting</h4>
                    {/* Social Media */}                   
                    <div className="col-sm-12 col-md mt-2 mt-md-4 mb-md-4">
                        <label className="form-label register-form-headline head-center mt-4">Social Media:</label>
                        <div className="mt-sm-3 mt-md-4">
                            <label className="form-label">Facebook:</label>
                            <input type="text" name="facebook" value={this.state.facebook} onChange={this.updateFormField} placeholder="Facebook URL" className="form-control"/>
                        </div>
                        <div className="mt-sm-3 mt-md-4">
                            <label className="form-label">Instagram:</label>
                            <input type="text" name="instagram" value={this.state.instagram} onChange={this.updateFormField} placeholder="Instagram URL" className="form-control"/>
                        </div>
                        <div className="mt-sm-3 mt-md-4">
                            <label className="form-label">Tiktok:</label>
                            <input type="text" name="tiktok" value={this.state.tiktok} onChange={this.updateFormField} placeholder="Tiktok URL" className="form-control"/>
                        </div>
                        <div className="error-msg">{this.state.errors.socialMedia}</div>
                    </div>
                    {/* Contact */}
                    <div className="col-sm-12 col-md mt-4 mb-4">
                        <label className="form-label register-form-headline head-center mt-4">Contact:</label>
                        <div className="mt-sm-3 mt-md-4">
                            <label className="form-label">Mobile:</label>
                            <input type="text" name="mobile" value={this.state.mobile} onChange={this.updateFormField} placeholder="mobile number" className="form-control"/>
                        </div>
                        <div className="mt-sm-3 mt-md-4">
                            <label className="form-label">Email:</label>
                            <input type="text" name="email" value={this.state.email} onChange={this.updateFormField} placeholder="email address" className="form-control"/>
                        </div>
                        <div className="mt-sm-3 mt-md-4">
                            <label className="form-label">Website:</label>
                            <input type="text" name="web" value={this.state.website} onChange={this.updateFormField} placeholder="website URL" className="form-control"/>
                        </div>
                        <div className="error-msg">{this.state.errors.email}</div>
                    </div>
                    {/* ........... submit buttons ........... */}
                    {this.displayProfileUpdateButtons()}
                </div>
            )
        } else {
            return null
        }

    }

    displayShowCase() {
        if (this.state.activeDisplay === "showcase") {
            return (
                <div className="row register-text">
                    <h3 className="account-form d-none d-md-block">Profile Image &amp; Showcase Setting</h3>
                    <h4 className="account-form d-md-none">Profile Image &amp; Showcase Setting</h4>
                    {/* profile Image */}
                    <div className="col mt-4 mb-4">
                        <label className="form-label register-form-headline head-center">Upload your profile image:</label>
                        <input type="text" name="profileImage" value={this.state.profileImage} onChange={this.updateFormField} placeholder="image URL (portrait orientation image)" className="form-control"/>
                        <div className="preview profile-img-preview" style={this.getImage("profileImage")}>
                            <p className="img-discription">{this.state.profileImage === "" ? "Preview image": ""}</p>
                        </div>
                    </div>
                    {/* showCase */}
                    <div className="col mt-4 mb-4">
                        <label className="form-label register-form-headline showcase">Upload your showcase <span className="side-note">(to display on profile first page)</span>:</label>
                        <input type="text" name="showCase" value={this.state.showCase} onChange={this.updateFormField} placeholder="image/VDO URL (portrait orientation image)" className="form-control"/>
                        <div className="error-msg">{this.state.errors.showCase}</div>
                        <div className="preview" style={this.getImage("showCase")}>
                            <p className="img-discription">{this.state.showCase === "" ? "Preview image" : ""}</p>
                        </div>
                    </div>
                    {/* ........... submit buttons ........... */}
                    {this.displayProfileUpdateButtons()}
                </div>
            )
        } else {
            return null
        }
    }

    displayPortfolio() {
        if (this.state.activeDisplay === "portfolio") {
            return (
                <div className="row register-text">
                    <h3 className="account-form d-none d-md-block">Portfolio Setting</h3>
                    <h4 className="account-form d-md-none">Portfolio Setting</h4>
                    <label className="form-label register-form-headline mt-4">Upload your portfolio:</label>
                    <div className="row">
                        {/* Portfolio 1 */}
                        <div className="col mt-3">  
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
                        <div className="col mt-3">  
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
                    </div>
                    <div className="row mt-3">
                        {/* Portfolio 3 */}
                        <div className="col mt-3 mb-4 mb-md-4 mb-lg-0">  
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
                        <div className="col d-none d-md-block"></div>
                    </div>
                    
                    
                    <div className="error-msg-portfolio">{this.state.errors.portfolios}</div>
                    {/* ........... submit buttons ........... */}
                    {this.displayProfileUpdateButtons()}
                </div>
            )
        } else {
            return null
        }
    }

    displayChangePassword() {
        if (this.state.activeDisplay === "change-password") {
            return (
                <div className="row register-text">
                    <h3 className="account-form d-none d-md-block">Change Password</h3>
                    <h4 className="account-form d-md-none">Change Password</h4>
                    {this.renderChangePasswordFailMessage()}
                    {this.renderChangePasswordSuccessMessage()}
                    {this.renderChangePasswordForm()}
                </div>
            )
        }
    }

    renderChangePasswordForm() {
        if (!this.state.changePasswordSuccess) {
            return (
                <div>
                    {/* username */}
                    <div className="row mt-4">
                        <div className="col-sm-12 col-md-3">
                            <p className="bold">Username: </p>
                        </div>
                        <div className="col-sm-12 col-md-9">
                            <input type="text" name="username" value={this.state.username} onChange={this.updateFormField} className="form-control"/>
                            <div className="error-msg">{this.state.errors.username}</div>
                        </div>
                    </div>
                    {/* Current password */}
                    <div className="row mt-4">
                        <div className="col-sm-12 col-md-3">
                            <p className="bold">Current password: </p>
                        </div>
                        <div className="col-sm-12 col-md-9">
                            <input type="password" name="currentPassword" value={this.state.currentPassword} onChange={this.updateFormField} className="form-control"/>
                            <div className="error-msg">{this.state.errors.currentPassword}</div>
                        </div>
                    </div>
                    {/* New password */}
                    <div className="row mt-3">
                        <div className="col-sm-12 col-md-3">
                            <p className="bold">New password: </p>
                        </div>
                        <div className="col-sm-12 col-md-9">
                            <input type="password" name="newPassword" value={this.state.newPassword} onChange={this.updateFormField} className="form-control"/>
                            <div className="error-msg">{this.state.errors.newPassword}</div>
                        </div>
                    </div>
                    {/* Confirm new password */}
                    <div className="row mt-3 mb-4">
                        <div className="col-sm-12 col-md-3">
                            <p className="bold">Confirm new password: </p>
                        </div>
                        <div className="col-sm-12 col-md-9 mt-md-2 mt-lg-0">
                            <input type="password" name="confirmNewPassword" value={this.state.confirmNewPassword} onChange={this.updateFormField} className="form-control"/>
                            <div className="error-msg">{this.state.errors.confirmNewPassword}</div>
                        </div>
                    </div>
                    {/* buttons */}
                    <div className="mt-4 delete-account">
                        <button 
                            onClick={this.props.hideForm}
                            className="btn btn-secondary account-btn delete-account-btn me-3" 
                            type="button">
                            Cancel
                        </button>

                        <button 
                            onClick={this.changePassword}
                            className="btn btn-secondary account-btn delete-account-btn" 
                            type="button">
                            Change Password
                        </button>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    renderChangePasswordFailMessage() {
        if (this.state.changePasswordFailed) {
            return (
                <div className="row mt-4 login-fail">
                    <p>Change Password Failed</p>
                </div>
            )
        }
    }

    renderChangePasswordSuccessMessage() {
        if (this.state.changePasswordSuccess) {
            return (
                <div className="row mt-4 change-success">
                    <p>Completed. Password has been changed</p>
                </div>
            )
        }
    }

    displayDeleteAccount() {
        if (this.state.activeDisplay === "delete-account") {
            return (
                <div className="row register-text">
                    <h3 className="account-form d-none d-md-block">Delete Your Account</h3>
                    <h4 className="account-form d-md-none">Delete Your Account</h4>
                    <p className="mt-3">Dear <span className="bold">{this.state.name}</span></p>
                    <p>We are sorry to hear that you would like to delete your account.</p>
                    <p className="bold mt-3">Are you sure you want to proceed?</p>
                    <p>
                        This mean you are deleting your portfolio profile and account permanently. You won't be able to retrieve the content or information that tag to your profile in Wedding Freelancer platform. All account information including reviews &amp; rating will be deleted permanently. 
                    </p>
                    <hr></hr>
                    {/* Drop down list for reason to delete */}
                    <div className="row">
                        <div className="col-sm-12 col-md-5">
                            <p className="bold mt-4">Why do you want to delete this account ?</p>
                        </div>
                        <div className="col-sm-12 col-md-7">
                            <div className="mt-0 mt-md-4">
                                <select className="" name="reasonToDelete" value={this.state.reasonToDelete} onChange={this.updateFormField}>
                                    <option value=""> ----- Select One ----- </option>
                                    <option value="second-account">Create second account</option>
                                    <option value="remove-data">Want to remove something</option>
                                    <option value="data-privacy">Concerned about my data</option>
                                    <option value="privacy">Privacy concerns</option>
                                    <option value="navigation">Trouble nagivating platform</option>
                                    <option value="other">Something else</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Speficy Reason */}
                    <div className="row mt-3">
                        <div className="col-sm-12 col-md-2">
                            <p className="bold mt-3 mt-md-0">Please specify: </p>
                        </div>
                        <div className="col-sm-12 col-md-10">
                            <input type="text" name="specifyDeleteReason" value={this.state.specifyDeleteReason} onChange={this.updateFormField} className="form-control"/>
                        </div>
                    </div>
                    {/* Enter password */}
                    <div className="row mt-3">
                        <div className="col-sm-12 col-md-5">
                            <p className="bold mt-3 mt-md-0">To continue, please re-enter your password</p>
                        </div>
                        <div className="col-sm-12 col-md-7 mt-0 mt-md-2">
                            <input type="text" name="currentPassword" value={this.state.currentPassword} onChange={this.updateFormField} className="form-control"/>
                        </div>
                    </div>
                    {/* buttons */}
                    <div className="mt-4 delete-account">
                        <button 
                            onClick={this.props.hideForm}
                            className="btn btn-secondary account-btn delete-account-btn me-3" 
                            type="button">
                            Cancel
                        </button>

                        <button 
                            onClick={this.addReasonToDelete}
                            className="btn btn-secondary delete-account-btn" 
                            type="button">
                            Delete Account
                        </button>
                    </div>   
                </div> 
            )
        } else {
            return null
        }
    }
        

    /* ............. related functions to process value for each key ............. */ 


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

    /* ............. end of related functions to process value for each key ............. */ 


    // React Form Validations / https://allegra9.medium.com/react-form-validations-286590d26b6f
    validateForm = () => {
        let errors = {}
        let formIsValid = true

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

    // save changes to DB
    updateProfile = async () => {
        let updateCompleted = false
        if (this.validateForm()) {
            // then process the form when all validation is done
            let updatedFreelancerData = {
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

            console.log(updatedFreelancerData)
    
            await axios.put(`${this.apiUrl}/freelancer/${this.state._id}`, updatedFreelancerData)
            .then( async (result) => {
                console.log("success", result.data)
    
                // get latest freelancer info from DB
                let latestFreelancerInfo = await axios.get(`${this.apiUrl}/freelancer/${this.state._id}`)
                // update session with latest freelancer info // JSON.stringify - convert object to string in json format
                sessionStorage.setItem("authenticatedUser", JSON.stringify(latestFreelancerInfo.data))
                
                updateCompleted = true
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

        this.setState({
            "updateCompleted": updateCompleted
        })
    }

    // save changes to DB and close
    updateProfileAndClose = async () => {
        await this.updateProfile()
        if (this.state.updateCompleted) {
            this.props.afterUpdateFreelancerProfile();
        }
    }

    validateChangePasswordForm = () => {
        let errors = {}
        let formIsValid = true

        if (!this.state.username) {
            formIsValid = false
            errors["username"] = "Please enter your username"
        }

        if (!this.state.currentPassword) {
            formIsValid = false
            errors["currentPassword"] = "Please enter your current password"
        }

        if (!this.state.newPassword) {
            formIsValid = false
            errors["newPassword"] = "Please enter your new password"
        }

        if (this.state.newPassword && this.state.newPassword === this.state.currentPassword) {
            formIsValid = false
            errors["newPassword"] = "Current password and new password cannot be the same"
        }

        if (!this.state.confirmNewPassword) {
            formIsValid = false
            errors["confirmNewPassword"] = "Please re-enter your new password"
        }

        if (this.state.confirmNewPassword && this.state.newPassword !== this.state.confirmNewPassword) {
            formIsValid = false
            errors["confirmNewPassword"] = "New password mismatch"
        }

        this.setState({errors})

        return formIsValid
    }

    changePassword = async () => {
        if (this.validateChangePasswordForm()) {
            let newUserPassword = {
                username: this.state.username,
                currentPassword: this.state.currentPassword,
                newPassword: this.state.newPassword
            } 
            let changePasswordFailed = false
            let changePasswordSuccess = false
            await axios.put(`${this.apiUrl}/change-password`, newUserPassword)
            .then( async (result) => {   
                changePasswordSuccess = true
            })
            .catch( (error) => {
    
                changePasswordFailed = true
            })
    
            this.setState({
                changePasswordFailed: changePasswordFailed,
                changePasswordSuccess: changePasswordSuccess, 
                username: "",
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: ""
            })
        }
    }

    
    deleteFreelancer = async () => {
        let freelancerToDelete = this.state._id

        await axios.delete(`${this.apiUrl}/freelancer/${freelancerToDelete}`)
        .then( async (result) => {
            sessionStorage.removeItem("authenticatedUser")
        })

        this.props.afterUpdateFreelancerProfile();
            
    }


    addReasonToDelete = async () => {
        let newData = {
            "reasonToDelete": this.state.reasonToDelete,
            "specifyDeleteReason": this.state.specifyDeleteReason
        }
        return newData
    }
    

    render() {
        return (
            <React.Fragment>
                {/* Collapse Section - Navigation card for MD and SM screen */}
                <div className="d-block d-lg-none">
                    <div className="row">
                        {/* Collapse button */}
                        <div className="row">
                            <button
                                className="btn btn-outline-secondary btn-lg account-btn btn-acct-size"
                                type="button"
                                onClick={() => this.setOpen(true)}
                                aria-controls="example-collapse-text"
                                aria-expanded={this.state.open}>
                                    My Profile Setting <span className="ms-3 arrow-down"><FontAwesomeIcon icon={faAngleDoubleDown}/></span>  
                            </button>
                        </div>
                        
                    </div>
                    <Collapse in={this.state.open}>
                    <div id="example-collapse-text">
                        <div className="col-sm-12 col-lg-3 mt-5">
                            {this.displayNavigationCard()}
                        </div>
                    </div>
                    </Collapse>
                </div>
                {/* Navigation card for laptop size screem*/}
                <div className="d-none d-lg-block col-sm-12 col-lg-3 mt-5">
                    {this.displayNavigationCard()}
                </div>
                {/* Display Fields */}
                <div className="col-sm-12 col-lg-9">
                    {/* Account Setting */}
                    {this.displayAccountDetails()}
                    {/* Social Media / Contact */}
                    {this.displaySocialMedia()}
                    {/* profile Image / Showcase*/}
                    {this.displayShowCase()}
                    {/* Portfolio*/}
                    {this.displayPortfolio()}
                    {/* Change password*/}
                    {this.displayChangePassword()}
                    {/* Delete Account*/}
                    {this.displayDeleteAccount()}
                </div>
 
                
            </React.Fragment>
        )
    }
}
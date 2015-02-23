/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Actions         = require('../../../actions'),
    AppStateStore   = require('../../../stores/appstate'),
    ProfileService  = require('../../../services/profile');

var AuthMixin       = require('../../../mixins/auth');

// React-router variables
var Link            = Router.Link;

var Profile = React.createClass({
    mixins: [AuthMixin],
    getInitialState: function() {
        return {
            userId: AppStateStore.getSessionData().id,
            firstName: AppStateStore.getSessionData().firstName,
            lastName: AppStateStore.getSessionData().lastName,
            email: AppStateStore.getSessionData().email,
            phone: AppStateStore.getSessionData().contactNumber,
            addressId: AppStateStore.getSessionData().addressId,
            address1: '',
            address2: '',
            city: '',
            province: '',
            zip: '',
            country: '',
            sessionToken: AppStateStore.getSessionData().sessionToken,
            toastMessage: undefined
        };
    },
    componentDidMount: function() {
        Actions.changePageTitle('Profile');
        console.log("Profile page sessionToken", this.state.sessionToken);
        var component = this;
        ProfileService.getProfileInfo (
            this.state.userId,
            this.state.sessionToken,
            function(res) {
                if(res.ok) {
                    // This means everything went just fine
                    if(res.body.Result) {
                        component.setState({
                            phone: res.body.Result.ContactNumber,
                            address1: res.body.Result.Address1,
                            address2: res.body.Result.Address2,
                            city: res.body.Result.City,
                            province: res.body.Result.State,
                            zip: res.body.Result.Zipcode,
                            country: res.body.Result.Country,
                        });
                    } else {
                        if (res.body.InfoMessages[0].Code == 1) {
                            component.setState({
                                toastMessage: res.body.InfoMessages[0].Text
                            });
                        }
                    }
                    console.log('Response from saveProfileInfo', JSON.stringify(res.body));
                } else {
                    console.log('Error at saveProfileInfo', res.text);
                }
            });
    },
    onFirstNameChanged: function(event){
        this.setState({
            firstName: event.target.value
        });
    },
    onLastNameChanged: function(event){
        this.setState({
            lastName: event.target.value
        });
    },
    onEmailChanged: function(event){
        this.setState({
            email: event.target.value
        });
    },
    onPhoneChanged: function(event){
        this.setState({
            phone: event.target.value
        });
    },
    onAddress1Changed: function(event){
        this.setState({
            address1: event.target.value
        });
    },
    onAddress2Changed: function(event){
        this.setState({
            address2: event.target.value
        });
    },
    onCityChanged: function(event){
        this.setState({
            city: event.target.value
        });
    },
    onProvinceChanged: function(event){
        this.setState({
            province: event.target.value
        });
    },
    onZipChanged: function(event){
        this.setState({
            zip: event.target.value
        });
    },
    onCountryChanged: function(event){
        this.setState({
            country: event.target.value
        });
    },
    onSubmitClick: function(event){
    var userId          = this.state.userId,
        firstName       = this.state.firstName,
        lastName        = this.state.lastName,
        email           = this.state.email,
        phone           = this.state.phone,
        addressId       = this.state.addressId,
        address1        = this.state.address1,
        address2        = this.state.address2,
        city            = this.state.city,
        province        = this.state.province,
        zip             = this.state.zip,
        country         = this.state.country,
        sessionToken    = this.state.sessionToken;

    var component = this;

        ProfileService.saveProfileInfo(
            userId,
            firstName,
            lastName,
            email,
            phone,
            addressId,
            address1,
            address2,
            city,
            province,
            zip,
            country,
            sessionToken,
            function(res) {
                if(res.ok) {
                    // This means everything went just fine
                    if(res.body.Result) {
                        component.setState({
                            firstName: res.body.Result.FirstName,
                            lastName: res.body.Result.LastName,
                            email: res.body.Result.Email,
                            phone: res.body.Result.ContactNumber,
                            address1: res.body.Result.Address1,
                            address2: res.body.Result.Address2,
                            city: res.body.Result.City,
                            province: res.body.Result.State,
                            zip: res.body.Result.Zipcode,
                            country: res.body.Result.Country,
                            toastMessage: 'Profile updated successfully'
                        });
                    } else {
                        if (res.body.InfoMessages[0].Code == 1) {
                            component.setState({
                                toastMessage: res.body.InfoMessages[0].Text
                            });
                        }
                    }
                    console.log('Response from saveProfileInfo', JSON.stringify(res.body));
                } else {
                    console.log('Error at saveProfileInfo', res.text);
                }
            });
    },
    render: function() {
        return (
            <div className="tab-content">
                <div className="left">
                    <div className="subtitle">Personal Info</div>
                    <div className="form">
                        <div className="field">
                            <div className="label">First name</div>
                            <input type="text" className="textbox" value={this.state.firstName} onChange={this.onFirstNameChanged}/>
                        </div>
                        <div className="field">
                            <div className="label">Last Name</div>
                            <input type="text" className="textbox" value={this.state.lastName} onChange={this.onLastNameChanged}/>
                        </div>
                        <div className="field">
                            <div className="label">Email</div>
                            <input type="text" className="textbox" value={this.state.email} onChange={this.onEmailChanged}/>
                        </div>
                        <div className="field">
                            <div className="label">Phone</div>
                            <input type="text" className="textbox" value={this.state.phone} onChange={this.onPhoneChanged}/>
                        </div>
                        <div className="field">
                            <div className="label">Address 1</div>
                            <input type="text" className="textbox" value={this.state.address1} onChange={this.onAddress1Changed}/>
                        </div>
                        <div className="field">
                            <div className="label">Address 2</div>
                            <input type="text" className="textbox" value={this.state.address2} onChange={this.onAddress2Changed}/>
                        </div>
                        <div className="field">
                             <div className="label">City</div>
                             <input type="text" className="textbox" value={this.state.city} onChange={this.onCityChanged}/>
                        </div>
                        <div className="field">
                             <div className="label">State</div>
                             <input type="text" className="textbox" value={this.state.province} onChange={this.onProvinceChanged}/>
                        </div>
                        <div className="field">
                             <div className="label">Zip</div>
                             <input type="text" className="textbox" value={this.state.zip} onChange={this.onZipChanged}/>
                        </div>
                        <div className="field">
                            <div className="label">Country</div>
                            <input type="text" className="textbox" value={this.state.country} onChange={this.onCountryChanged}/>
                        </div>
                        <div className="field btn" >
                            <div className="label"></div>
                            <button type="submit" id="save-profile-button" className="button" onClick={this.onSubmitClick}>Save</button>
                            <div className={'flash' + (this.state.toastMessage ? ' visible' : '')}>
                                {this.state.toastMessage}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="right narrow">
                    <div className="subtitle">Company</div>
                    <div className="row">
                        <div className="profile-pic">
                            <i className="fa fa-university"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">Group.Direct Demo Company</div>
                            <div className="line2 link"><a href='notice'>Edit info</a></div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="top-text-wrapper">
                            <div className="line1"><a href='notice'><i className="fa fa-plus-square-o"></i>  Create or Join another company</a></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Profile;

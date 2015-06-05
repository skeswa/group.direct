/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions'),
    validator       = require('validator'),

    SignupService   = require('../../services/signup');

var Header          = require('./header');

// React-router variables
var Link            = Router.Link;

var steps = [
    // First Step
    function (component) {
        return (
            <div className="form">
                <div className="field left">
                    <div className="label">First Name</div>
                    <input type="text" className="textbox" value={component.state.firstName} onChange={component.onFirstNameChanged}/>
                </div>
                <div className="field right">
                    <div className="label">Last Name</div>
                    <input type="text" className="textbox" value={component.state.lastName} onChange={component.onLastNameChanged}/>
                </div>
                <div className="field left">
                    <div className="label">Email</div>
                    <input type="text" className="textbox" value={component.state.email} onChange={component.onEmailChanged}/>
                </div>
                <div className="field right">
                    {/*
                     <div className="label">Username</div>
                     <input type="text" className="textbox" value={component.state.userName} onChange={component.onUsernameChanged}/>
                    */}
                </div>
                <div className="field left">
                    <div className="label">Password</div>
                    <input type="password" className="textbox" value={component.state.password} onChange={component.onPasswordChanged}/>
                </div>
                <div className="field right">
                    <div className="label">Confirm Password</div>
                    <input type="password" className="textbox" value={component.state.confirmPassword} onChange={component.onConfirmPasswordChanged}/>
                </div>
            </div>
        );
    },
    // Second Step
    function(component) {
        return (
            <div>
                <form id="company-form-selector">
                    <input type="radio" name="selector" onChange={component.showJoinCompanyForm} checked={component.state['isJoiningExistingCompany']}/><span>Join an existing company</span>
                    <input type="radio" name="selector" onChange={component.showCreateCompanyForm} checked={component.state['isCreatingNewCompany']}/><span>I would like to sign-up a new company</span>
                </form>
                <div id="join-company-form" className="form" style={{ display: (component.state.isJoiningExistingCompany ? 'block' : 'none') }}>
                    <div className="field full">
                        <div className="label">Invitation Code</div>
                        <p>You should have received a company invitation code from your company admin. Please type it below.</p>
                        <input type="text" className="textbox colored" value={component.state['companyInvitationCode']} onChange={component.onCodeChanged}/>
                    </div>
                </div>
                <div id="create-company-form" className="form" style={{ display: (component.state.isCreatingNewCompany ? 'block' : 'none') }}>
                    <div className="field left">
                        <div className="label">Company Name</div>
                        <input type="text" className="textbox" value={component.state['newCompanyName']} onChange={component.onCompanyNameChanged}/>
                    </div>
                    <div className="field right">
                        <div className="label">Email</div>
                        <input type="text" className="textbox" value={component.state['newCompanyEmail']} onChange={component.onCompanyEmailChanged}/>
                    </div>
                    <div className="field left">
                        <div className="label">Address Line 1</div>
                        <input type="text" className="textbox" value={component.state['newCompanyAddrLine1']} onChange={component.onCompanyAddrLine1Changed}/>
                    </div>
                    <div className="field right">
                        <div className="label">Address Line 2</div>
                        <input type="text" className="textbox" value={component.state['newCompanyAddrLine2']} onChange={component.onCompanyAddrLine2Changed}/>
                    </div>
                    <div className="field left">
                        <div className="label">City</div>
                        <input type="text" className="textbox" value={component.state['newCompanyCity']} onChange={component.onCompanyCityChanged}/>
                    </div>
                    <div className="field right">
                        <div className="label">State</div>
                        <input type="text" className="textbox" value={component.state['newCompanyState']} onChange={component.onCompanyStateChanged}/>
                    </div>
                    {/*<div className="field left">
                        <div className="label">Country</div>
                        <input type="text" className="textbox" value={component.state['newCompanyCountry']} onChange={component.onCompanyCountryChanged}/>
                    </div>
                    */}
                    <div className="field left">
                        <div className="label">Zip</div>
                        <input type="text" className="textbox" value={component.state['newCompanyZip']} onChange={component.onCompanyZipChanged}/>
                    </div>
                </div>
            </div>
        );
    },
    // Third Step
    function(component) {
        return (
            <div>
                <div className="icon gray shimmed">
                    <i className="fa fa-check"/>
                </div>
                <div className="title">Thank you for signing up with GroupConnect! You will receive a confirmation email. Please click on it to activate the basic free services provisioned with your account.</div>
                <Link to="signin" className="subtitle">Continue to your account</Link>
                <br />
            </div>
        );
    }
];

var Register = React.createClass({
    getInitialState: function() {
        return {
            toastMessage: undefined,
            password: '',
            waiting: false,
            step: 0,
            isJoiningExistingCompany: true,
            isCreatingNewCompany: false
        };
    },
    componentDidMount: function() {
        var component = this;
        Actions.changePageTitle('Register');
    },
    componentWillUnmount: function() {
    },
    showJoinCompanyForm: function() {
        this.setState({
            isCreatingNewCompany: false,
            isJoiningExistingCompany: true
        });
    },
    showCreateCompanyForm: function() {
        this.setState({
            isCreatingNewCompany: true,
            isJoiningExistingCompany: false
        });
    },
    //user related functions::
    onFirstNameChanged: function(event){
        this.setState({
            firstName: event.target.value,
            toastMessage: undefined
        });
    },
    onLastNameChanged: function(event){
        this.setState({
            lastName: event.target.value,
            toastMessage: undefined
        });
    },
    onEmailChanged: function(event){
        this.setState({
            email: event.target.value,
            toastMessage: undefined
        });
    },
    onPasswordChanged: function(event){
        this.setState({
            password: event.target.value,
            toastMessage: undefined
        });
    },
    onConfirmPasswordChanged: function(event){
        this.setState({
            confirmPassword: event.target.value,
            toastMessage: undefined
        });
    },

    onNext: function() {
        var firstName       = this.state.firstName,
            lastName        = this.state.lastName,
            email           = this.state.email,
            password        = this.state.password,
            confirmPassword = this.state.confirmPassword,
            activationCode  = 0;

        if (this.state.waiting) return;
        else {
            // Validate input
            var problems = [];
            if (!validator.matches(firstName, /[a-zA-Z_\-]{2,}/)) {
                problems.push({
                    field: 'First Name',
                    message: 'Must be at least two letters long'
                });
            }
            if (!validator.matches(lastName, /[a-zA-Z_\-]{2,}/)) {
                problems.push({
                    field: 'Last Name',
                    message: 'Must be at least two letters long'
                });
            }
            if (!validator.isEmail(email)) {
                problems.push({
                    field: 'Email',
                    message: 'Must be a correctly formatted email address'
                });
            }
            //(?=.*[A-Z])(?=.*[@#$%]) //uppercase letter, special symbol
            if (!validator.matches(password, /((?=.*\d)(?=.*[a-z]).{6,20})/)) {
                problems.push({
                    field: 'Password',
                    message: 'Must have one digit, lowercase letter and be between 6 and 20 characters long'
                });
            }
            if(confirmPassword != password){
                problems.push({
                    field: 'Confirm Password',
                    message: 'Passwords did not match. Please try again'
                });
            }
            // Yell at the requester if ill-formatter
            if (problems.length > 0) {
                //Display full message in toast
                //var messages = '';
                //for (var i=0; i < problems.length; i++)
                //messages+= problems[i].field + ': '+ problems[i].message + '\n';

                //Display messages one by one
                var message = problems[0].field + ': '+ problems[0].message;
                this.setState({
                    toastMessage: message
                    });
                return;
            }
        }
        // Start waiting
        // this.setState({
        //     waiting: true,
        //     toastMessage: 'This is a waiting Toast message.'
        // });

        //Go to next step
        var step = this.state.step;
        if (step < steps.length - 1) {
            this.setState({
                step: (step + 1)
            });
        }
    },

    //company related functions::
    onCodeChanged: function(event){
        this.setState({
            invitationCode: event.target.value,
            toastMessage: undefined
        });
    },
    onCompanyNameChanged: function(event){
        this.setState({
            newCompanyName: event.target.value,
            toastMessage: undefined
        });
    },
    onCompanyEmailChanged: function(event){
        this.setState({
            newCompanyEmail: event.target.value,
            toastMessage: undefined
        });
    },
    onCompanyAddrLine1Changed: function(event){
        this.setState({
            newCompanyAddrLine1: event.target.value,
            toastMessage: undefined
        });
    },
    onCompanyAddrLine2Changed: function(event){
        this.setState({
            newCompanyAddrLine2: event.target.value,
            toastMessage: undefined
        });
    },
    onCompanyCityChanged: function(event){
        this.setState({
            newCompanyCity: event.target.value,
            toastMessage: undefined
        });
    },
    onCompanyStateChanged: function(event){
        this.setState({
            newCompanyState: event.target.value,
            toastMessage: undefined
        });
    },
    onCompanyCountryChanged: function(event){
        this.setState({
            newCompanyCountry: event.target.value,
            toastMessage: undefined
        });
    },
    onCompanyZipChanged: function(event){
        this.setState({
            newCompanyZip: event.target.value,
            toastMessage: undefined
        });
    },

    onFinish: function() {
        if (this.state.isCreatingNewCompany) {
            console.log("create Company");
            this.createCompany();
        }
        if (this.state.isJoiningExistingCompany) {
            console.log("create user for existing Company");
            this.joinCompany();
        }
    },
    onBack: function() {
        var step = this.state.step;
        if (step > 0) {
            this.setState({
                step: (step - 1)
            });
        }
    },
    onSkip: function() {
        //Create user and if successful Go to thankyou page
        console.log("create User");
        this.createUser();
    },
    //Webservice Calls
    createCompany: function() {
        var newCompanyName      = this.state.newCompanyName,
            newCompanyEmail     = this.state.newCompanyEmail,
            newCompanyAddrLine1 = this.state.newCompanyAddrLine1,
            newCompanyAddrLine2 = this.state.newCompanyAddrLine2,
            newCompanyCity      = this.state.newCompanyCity,
            newCompanyState     = this.state.newCompanyState,
            newCompanyZip       = this.state.newCompanyZip,
            newCompanyCountry   = this.state.newCompanyCountry,
            activationCode  = 0;

        if (this.state.waiting) return;
        else {
            // Validate input
            var problems = [];
            if (!validator.matches(newCompanyName, /[a-zA-Z_\-]{2,}/)) {
                problems.push({
                    field: 'Company Name',
                    message: 'Must be at least two letters long'
                });
            }
            if (!validator.isEmail(newCompanyEmail)) {
                problems.push({
                    field: 'Company Email',
                    message: 'Must be a correctly formatted email address'
                });
            }
            if (problems.length > 0) {
                //Display full message in toast
                //var messages = '';
                //for (var i=0; i < problems.length; i++)
                //messages+= problems[i].field + ': '+ problems[i].message + '\n';

                //Display messages one by one
                var message = problems[0].field + ': '+ problems[0].message;
                this.setState({
                    toastMessage: message
                    });
                return;
            }
        }
        // Send company signup request
        var component = this;
        SignupService.companySignupRequest(
            this.state.firstName,
            this.state.lastName,
            this.state.password,
            this.state.email,
            newCompanyName,
            newCompanyEmail,
            newCompanyAddrLine1,
            newCompanyAddrLine2,
            newCompanyCity,
            newCompanyState,
            newCompanyCountry,
            newCompanyZip,
            function(res) {
                if (res.ok) {
                    // This means everything went just fine
                    console.log('We got a response', JSON.stringify(res.body));
                    if (res.body.Result) {
                        //Go to last step
                        component.setState({
                            step: 2
                        });
                    } else {
                        component.setState({
                            toastMessage: res.body.InfoMessages[0].Text
                        });
                    }
                } else {
                    component.setState({
                        toastMessage:
                            'There was a problem connecting to the server. ' +
                            'Check your connection status and try again.'
                    });
                    return;
                    console.log('We got an error', res.text);
                }
            });
    },
    joinCompany: function() {
        var component = this;
        SignupService.signupForExistingCompany(
            this.state.firstName,
            this.state.lastName,
            this.state.email,
            this.state.password,
            this.state.invitationCode,
            function(res) {
                if (res.ok) {
                    // This means everything went just fine
                    if (res.body.Result) {
                        //Go to last step
                        component.setState({
                            step: 2
                        });
                    } else {
                        component.setState({
                            toastMessage: res.body.InfoMessages[0].Text
                        });
                    }
                } else {
                    component.setState({
                        toastMessage:
                            'There was a problem connecting to the server. ' +
                            'Check your connection status and try again.'
                    });
                    return;
                    console.log('We got an error', res.text);
                }
            });
    },
    createUser: function() {
    // Send the signup request
    var component = this;
    SignupService.userSignupRequest(
        this.state.firstName,
        this.state.lastName,
        this.state.password,
        'Male',
        this.state.email,
        '10-10-2010',
        '902-872-1113',
        function(res) {
            if (res.ok) {
                // This means everything went just fine
                console.log('userSignupRequest', JSON.stringify(res.body));
                if (res.body.Result) {
                    component.setState({
                        step: 2
                    });
                } else {
                    component.setState({
                        toastMessage: res.body.InfoMessages[0].Text
                    });
                }
            } else {
                component.setState({
                    toastMessage:
                        'There was a problem connecting to the server. ' +
                        'Check your connection status and try again.'
                });
                return;
                console.log('We got an error', res.text);
            }
        });
    },
    render: function() {
        return (
            <div id="register" className="page">
                <Header />
                <div className="spotlight"/>
                <div id="content">
                    <div className="card">
                        <div className="wrapper">
                            <h1>
                                <span className={this.state.waiting ? 'hidden' : ''} style={{ display: (this.state.step === 0 ? 'inline-block' : 'none') }}>Quick Sign-Up</span>
                                <div style={{ display: (this.state.step === 1 ? 'inline-block' : 'none') }}>
                                    <span className={this.state.waiting ? 'hidden' : ''} >Sign-up with a Company</span>
                                </div>
                                <span className={this.state.waiting ? 'hidden' : ''} style={{ display: (this.state.step === 2 ? 'inline-block' : 'none') }}>Success!</span>
                                <i className={'fa fa-refresh fa-spin' + (this.state.waiting ? '' : ' hidden')}></i>
                            </h1>
                            <div className="divider"/>
                            <div className="step-holder">
                                <div className="step one">
                                    {(steps[this.state.step])(this)}
                                </div>
                                <div className={'flash' + (this.state.toastMessage ? ' visible' : '')}>
                                    {this.state.toastMessage}
                                </div>
                                <div className="footer">
                                    <div className="divider"/>
                                    <button id="back-button" onClick={this.onBack} disabled={this.state.waiting} style={{ display: (this.state.step === 2 ? 'none' : 'inline-block') }}>Back</button>
                                    <button id="skip-button" style={{ display: (this.state.step === 1 ? 'inline-block' : 'none') }} onClick={this.onSkip} disabled={this.state.waiting}>Skip</button>
                                    <button id="next-button" onClick={this.onNext} disabled={this.state.waiting} style={{ display: (this.state.step === 0 ? 'inline-block' : 'none') }}>Next</button>
                                    <button id="finish-button" onClick={this.onFinish} disabled={this.state.waiting} style={{ display: (this.state.step === 1 ? 'inline-block' : 'none') }}>Finish</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Register;

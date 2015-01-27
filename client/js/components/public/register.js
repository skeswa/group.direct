/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions'),
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
                     <div className="label">Username</div>
                     <input type="text" className="textbox" value={component.state.userName} onChange={component.onUsernameChanged}/>
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
                        <input type="text" className="textbox" value={component.state['companyInvitationCode']} onChange={component.onLastNameChanged}/>
                    </div>
                </div>
                <div id="create-company-form" className="form" style={{ display: (component.state.isCreatingNewCompany ? 'block' : 'none') }}>
                    <div className="field left">
                        <div className="label">Name</div>
                        <input type="text" className="textbox" value={component.state['newCompanyName']} onChange={component.onLastNameChanged}/>
                    </div>
                    <div className="field right">
                        <div className="label">Email</div>
                        <input type="text" className="textbox" value={component.state['newCompanyEmail']} onChange={component.onLastNameChanged}/>
                    </div>
                    <div className="field full">
                        <div className="label">Address Line 1</div>
                        <input type="text" className="textbox" value={component.state['newCompanyAddrLine1']} onChange={component.onLastNameChanged}/>
                    </div>
                    <div className="field full">
                        <div className="label">Address Line 2</div>
                        <input type="text" className="textbox" value={component.state['newCompanyAddrLine2']} onChange={component.onLastNameChanged}/>
                    </div>
                    <div className="field left">
                        <div className="label">City</div>
                        <input type="text" className="textbox" value={component.state['newCompanyCity']} onChange={component.onLastNameChanged}/>
                    </div>
                    <div className="field right">
                        <div className="label">State</div>
                        <input type="text" className="textbox" value={component.state['newCompanyState']} onChange={component.onLastNameChanged}/>
                    </div>
                    <div className="field left">
                        <div className="label">Country</div>
                        <input type="text" className="textbox" value={component.state['newCompanyCountry']} onChange={component.onLastNameChanged}/>
                    </div>
                    <div className="field right">
                        <div className="label">Zip</div>
                        <input type="text" className="textbox" value={component.state['newCompanyZip']} onChange={component.onLastNameChanged}/>
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
                <div className="title">Thank you! Your order has been received. You will receive an email and see your new services on your account once they have been provisioned.</div>
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
            userName: '',
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
    onPasswordChanged: function(event){
        this.setState({
            password: event.target.value
        });
    },
    //TODO: Review
    onConfirmPasswordChanged: function(event){
        this.setState({
            confirmPassword: event.target.value
        });
    },
    onUsernameChanged: function(event){
        this.setState({
            userName: event.target.value
        });
    },
    onNext: function() {
        var step = this.state.step;
        if (step < steps.length - 1) {
            this.setState({
                step: (step + 1)
            });
        }

        var firstName = this.state.firstName,
            lastName = this.state.lastName,
            userName = this.state.userName,
            email = this.state.email,
            password = this.state.password,
            activationCode = 0;

        SignupService.userSignupRequest(
            firstName,
            lastName,
            userName,
            password,
            'Male',
            email,
            '10-10-2010',
            '902-872-1113',
            function(res) {
                if (res.ok) {
                    // This means everything went just fine
                    console.log('We got a response', JSON.stringify(res.body));
                    activationCode = res.body.Result.ActivationCode;
                    console.log(email + " Code: " +  activationCode);
                    //Testing with timedelay
                    setTimeout(function(){
                        SignupService.activateUserSignupRequest(
                        email,
                        activationCode,
                        function(res) {
                            if (res.ok) {
                                // This means everything went just fine
                                console.log('Activation', JSON.stringify(res.body));
                            } else {
                                console.log('We got an error', res.text);
                            }
                        });
                    }, 5000);
                } else {
                    console.log('We got an error', res.text);
                }
            });
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
        //Go to thankyou page
        this.setState({
            step: 2
        });
    },
    onFinish: function(){
        this.setState({
            step: 2
        });
        console.log("On finish Result: " + activationCode);
        console.log("Email: " + email);
    },
    onSubmit: function() {

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
                                <span className={this.state.waiting ? 'hidden' : ''}>Quick Sign-Up</span>
                                <i className={'fa fa-refresh fa-spin' + (this.state.waiting ? '' : ' hidden')}></i>
                            </h1>
                            <div className="divider"/>
                            <div className="step-holder">
                                <div className="step one">
                                    {(steps[this.state.step])(this)}
                                </div>
                                <div className="footer">
                                    <div className="divider"/>
                                    <button id="skip-button" style={{ display: (this.state.step === 1 ? 'inline-block' : 'none') }} onClick={this.onSkip} disabled={this.state.waiting}>Skip</button>
                                    <button id="back-button" onClick={this.onBack} disabled={this.state.waiting} style={{ display: (this.state.step === 2 ? 'none' : 'inline-block') }}>Back</button>
                                    <button id="next-button" onClick={this.onNext} disabled={this.state.waiting} style={{ display: (this.state.step === 0 ? 'inline-block' : 'none') }}>Next</button>
                                    <button id="finish-button" onClick={this.onNext} disabled={this.state.waiting} style={{ display: (this.state.step === 1 ? 'inline-block' : 'none') }}>Finish</button>
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

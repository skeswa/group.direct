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
                    <input type="text" className="textbox" value={component.state['firstName']} onChange={component.generateTextListener('firstName')}/>
                </div>
                <div className="field right">
                    <div className="label">Last Name</div>
                    <input type="text" className="textbox" value={component.state['lastName']} onChange={component.generateTextListener('lastName')}/>
                </div>
                <div className="field left">
                    <div className="label">Username</div>
                    <input type="text" className="textbox" value={component.state['userName']} onChange={component.generateTextListener('userName')}/>
                </div>
                <div className="field right">
                    <div className="label">Email</div>
                    <input type="text" className="textbox" value={component.state['email']} onChange={component.generateTextListener('email')}/>
                </div>
                <div className="field left">
                    <div className="label">Password</div>
                    <input type="password" className="textbox" value={component.state['password']} onChange={component.generateTextListener('password')}/>
                </div>
                <div className="field right">
                    <div className="label">Confirm Password</div>
                    <input type="password" className="textbox" value={component.state['confirmPassword']} onChange={component.generateTextListener('confirmPassword')}/>
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
                        <input type="text" className="textbox" value={component.state['companyInvitationCode']} onChange={component.generateTextListener('companyInvitationCode')}/>
                    </div>
                </div>
                <div id="create-company-form" className="form" style={{ display: (component.state.isCreatingNewCompany ? 'block' : 'none') }}>
                    <div className="field left">
                        <div className="label">Name</div>
                        <input type="text" className="textbox" value={component.state['newCompanyName']} onChange={component.generateTextListener('newCompanyName')}/>
                    </div>
                    <div className="field right">
                        <div className="label">Email</div>
                        <input type="text" className="textbox" value={component.state['newCompanyEmail']} onChange={component.generateTextListener('newCompanyEmail')}/>
                    </div>
                    <div className="field full">
                        <div className="label">Address Line 1</div>
                        <input type="text" className="textbox" value={component.state['newCompanyAddrLine1']} onChange={component.generateTextListener('newCompanyAddrLine1')}/>
                    </div>
                    <div className="field full">
                        <div className="label">Address Line 2</div>
                        <input type="text" className="textbox" value={component.state['newCompanyAddrLine2']} onChange={component.generateTextListener('newCompanyAddrLine2')}/>
                    </div>
                    <div className="field left">
                        <div className="label">City</div>
                        <input type="text" className="textbox" value={component.state['newCompanyCity']} onChange={component.generateTextListener('newCompanyCity')}/>
                    </div>
                    <div className="field right">
                        <div className="label">State</div>
                        <input type="text" className="textbox" value={component.state['newCompanyState']} onChange={component.generateTextListener('newCompanyState')}/>
                    </div>
                    <div className="field left">
                        <div className="label">Country</div>
                        <input type="text" className="textbox" value={component.state['newCompanyCountry']} onChange={component.generateTextListener('newCompanyCountry')}/>
                    </div>
                    <div className="field right">
                        <div className="label">Zip</div>
                        <input type="text" className="textbox" value={component.state['newCompanyZip']} onChange={component.generateTextListener('newCompanyZip')}/>
                    </div>
                </div>
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
        Actions.changePageTitle('Register');
    },
    componentWillUnmount: function() {
    },
    generateTextListener: function(name) {
        return function(event) {
            var obj = {};
            obj[name] = event.target.value;
            this.setState(obj);
        };
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
    onNext: function() {
        var step = this.state.step;
        if (step < steps.length - 1) {
            this.setState({
                step: (step + 1)
            });
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
    onSubmit: function() {
        SignupService.userSignupRequest(
            'Ali',
            'Khan',
            'akhan',
            'LOL',
            'Male',
            'akhan@technuf.com',
            93218470921384,
            '267-312-8763',
            function(res) {
                if (res.ok) {
                    // This means everything went just fine
                    console.log('We got a response', JSON.stringify(res.body));
                } else {
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
                            <h1 onClick={this.onSubmit}>
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
                                    <button id="back-button" onClick={this.onBack} disabled={this.state.waiting}>Back</button>
                                    <button id="next-button" onClick={this.onNext} disabled={this.state.waiting}>Next</button>
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

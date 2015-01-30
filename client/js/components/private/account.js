/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions'),
    AppStateStore   = require('../../stores/appstate');

var Header          = require('./header');

// React-router variables
var Link            = Router.Link;

var steps = [
    //First Step: Profile
    function (component) {
        return (
            <div className="tab-content">
                <div className="left">
                    <div className="subtitle">Personal Info</div>
                    <div className="form">
                        <div className="field">
                            <div className="label">Name</div>
                            <input type="text" className="textbox" value={component.state.firstName} onChange={component.onFirstNameChanged}/>
                        </div>
                        <div className="field">
                            <div className="label">Address 1</div>
                            <input type="text" className="textbox" value={component.state.lastName} onChange={component.onLastNameChanged}/>
                        </div>
                        <div className="field">
                            <div className="label">Address 2</div>
                            <input type="text" className="textbox" value={component.state.email} onChange={component.onEmailChanged}/>
                        </div>
                        <div className="field">
                             <div className="label">City/State/Zip</div>
                             <input type="text" className="textbox" value={component.state.userName} onChange={component.onUsernameChanged}/>
                        </div>
                        <div className="field">
                            <div className="label">Country</div>
                            <input type="password" className="textbox" value={component.state.password} onChange={component.onPasswordChanged}/>
                        </div>
                        <div className="field">
                            <div className="label">Email</div>
                            <input type="password" className="textbox" value={component.state.confirmPassword} onChange={component.onConfirmPasswordChanged}/>
                        </div>
                        <div className="field btn" >
                            <div className="label"></div>
                            <Link to="about" className="button">Save</Link>
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
                            <div className="line1">Power and Electric Co</div>
                            <div className="line2 link">Edit info</div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="top-text-wrapper">
                            <div className="line1"><i className="fa fa-plus-square-o"></i>  Create or Join a company</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    // Second Step: Connections
    function(component) {
        return(
            <div className="tab-content">
                <div className="row">
                    <div className="left wide">
                        <input type="text" defaultValue='Search contacts'  className="textbox" ref="search" id="search-textbox" />
                    </div>
                    <div className="right narrow">
                        <Link to="about" className="button"><i className="fa fa-plus"></i> Add Members</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="left wide">
                        <div className="profile-pic">
                            <i className="fa fa-user"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">User Name</div>
                            <div className="line2">username@email.com</div>
                        </div>
                    </div>
                    <div className="right narrow">
                        <Link to="about" className="button">Invite</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="left wide">
                        <div className="profile-pic">
                            <i className="fa fa-user"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">User Name</div>
                            <div className="line2">username@email.com</div>
                        </div>
                    </div>
                    <div className="right narrow">
                        <Link to="about" className="button">Member</Link>
                        <Link to="about" className="button">Remove</Link>
                    </div>
                </div>
            </div>
        );
    },
    //Third Step: Settings
    function (component) {
        return (
            <div className="tab-content">
                <div className="left wide">
                    <div className="subtitle">Password</div>
                    <div className="form">
                        <div className="field">
                            <div className="label">Current</div>
                            <input type="text" className="textbox" value={component.state.firstName} onChange={component.onFirstNameChanged}/>
                        </div>
                        <div className="field">
                            <div className="label">New</div>
                            <input type="text" className="textbox" value={component.state.lastName} onChange={component.onLastNameChanged}/>
                        </div>
                        <div className="field">
                            <div className="label">Confirm new</div>
                            <input type="text" className="textbox" value={component.state.email} onChange={component.onEmailChanged}/>
                        </div>
                        <div className="field btn">
                        <div className="label"></div>
                            <Link to="about" className="button">Save</Link>
                        </div>
                    </div>
                </div>
                <div className="right narrow">
                    <div className="subtitle">Notification</div>
                    <div className="field">
                        <div className="label">Send email</div>
                            <Link to="about" className="button">Once an hour  <i className="fa fa-chevron-down"></i> </Link>
                    </div>
                </div>
            </div>
        );
    },
    //Fourth Step: Apps
    function (component) {
        return (
            <div className="tab-content">
                <div className="left narrow">
                    <div className="row">
                        <div className="profile-pic">
                            <i className="fa fa-puzzle-piece"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">Aphelia</div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link">Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="profile-pic">
                            <i className="fa fa-users"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">GroupVideoConnect</div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link">Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="profile-pic">
                            <i className="fa fa-bullhorn"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">BioConnect</div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link">Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="profile-pic">
                            <i className="fa fa-empire"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">ReportForResults</div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link">Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="profile-pic">
                            <i className="fa fa-phone-square"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">CiscoInstantConnect</div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link">Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="profile-pic">
                            <i className="fa fa-chain-broken"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">MutualConnect</div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link">Upgrade License</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right wide">
                    <div className="left">
                        <div className="subtitle">App Settings</div>
                        <div className="field">
                            <div className="label">Send email</div>
                            <Link to="about" className="button">Once an hour  <i className="fa fa-chevron-down"></i></Link>
                        </div>
                    </div>
                    <div className="right">
                        <div className="subtitle">Console</div>
                        <div className="field">
                            <Link to="about" className="button big">Go to Application</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    //Fifth Step
    function (component) {
        return (
                        <div className="tab-content">
                <div className="left narrow">
                    <div className="row">
                        <div className="profile-pic">
                            <i className="fa fa-puzzle-piece"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">Aphelia</div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link">Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="profile-pic">
                            <i className="fa fa-users"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">GroupVideoConnect</div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link">Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="profile-pic">
                            <i className="fa fa-bullhorn"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">BioConnect</div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link">Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="profile-pic">
                            <i className="fa fa-empire"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">ReportForResults</div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link">Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="profile-pic">
                            <i className="fa fa-phone-square"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">CiscoInstantConnect</div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link">Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="profile-pic">
                            <i className="fa fa-chain-broken"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">MutualConnect</div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link">Upgrade License</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right wide">
                    <div className="billing">
                        <div className="app-header"><i className="fa fa-chevron-down"></i> Aphelia</div>
                        <div className="row">
                            <span></span>
                            <span>License</span>
                            <span className="amount">$0.00</span>
                        </div>
                        <div className="row">
                            <input type="text" className="textbox" />
                            <span> Free License - $0/month per user</span>
                            <span className="amount">$0.00</span>
                        </div>
                        <div className="row">
                            <input type="text" className="textbox" />
                            <span> Free License - $0/month per user</span>
                            <span className="amount">$0.00</span>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
];

var Account = React.createClass({
    getInitialState: function() {
        return {
            step: 0,
            value: 'Search contacts',
            userName: AppStateStore.getSessionData().userName,
            firstName: AppStateStore.getSessionData().firstName,
            lastName: AppStateStore.getSessionData().lastName
        };
    },
    componentDidMount: function() {
        var component = this;
        Actions.changePageTitle('Account');
    },
    componentWillUnmount: function() {
    },
    onProfileClick: function() {
        this.setState({
            step: 0
        });
    },
    onConnectionsClick: function() {
        this.setState({
            step: 1
        });
    },
    onSettingsClick: function() {
        this.setState({
            step: 2
        });
    },
    onAppsClick: function() {
        this.setState({
            step: 3
        });
    },
    onBillingClick: function() {
        this.setState({
            step: 4
        });
    },
    render: function() {
        return (
            <div id="account" className="page">
                <Header />
                <div id="content">
                <div className="title">My Account</div>
                <div className="tabs">
                    <span onClick={this.onProfileClick} className={'tab'+(this.state.step === 0 ? ' active' : '')}>Profile</span>
                    <span className="separator"></span>
                    <span onClick={this.onConnectionsClick} className={'tab'+(this.state.step === 1 ? ' active' : '')}>Connections</span>
                    <span className="separator"></span>
                    <span className={'tab'+(this.state.step === 2 ? ' active' : '')} onClick={this.onSettingsClick}>Settings</span>
                    <span className="separator"></span>
                    <span className={'tab'+(this.state.step === 3 ? ' active' : '')} onClick={this.onAppsClick}>Apps</span>
                    <span className="separator"></span>
                    <span className={'tab'+(this.state.step === 4 ? ' active' : '')} onClick={this.onBillingClick}>Billing</span>
                </div>
                    {(steps[this.state.step])(this)}
                </div>
            </div>
        );
    }
});

module.exports = Account;

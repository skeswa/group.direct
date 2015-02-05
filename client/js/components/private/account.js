/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions');

var Header          = require('./header'),
    //Inlude the tabs
    Profile         = require('./account/profile'),
    Connections     = require('./account/connections'),
    Settings        = require('./account/settings'),
    Apps            = require('./account/apps'),
    Billing         = require('./account/billing');

// React-router variables
var Link            = Router.Link;

var steps = [
    //First Step: Profile
    function (component) {
        return (
            <Profile />
        );
    },
    // Second Step: Connections
    function(component) {
        return(
            <Connections />
        );
    },
    //Third Step: Settings
    function (component) {
        return (
            <Settings />
        );
    },
    //Fourth Step: Apps
    function (component) {
        return (
            <Apps />
        );
    },
    //Fifth Step
    function (component) {
        return (
            <Billing />
        );
    }
];

var Account = React.createClass({
    getInitialState: function() {
        return {
            step: 3,
            value: 'Search contacts',
        };
    },
    componentDidMount: function() {
        var component = this;
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
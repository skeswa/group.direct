/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../../util'),
    Actions         = require('../../../actions');

var Header          = require('../header'),
    //Inlude the tabs
    Profile         = require('./profile'),
    Connections     = require('./connections'),
    Settings        = require('./settings'),
    Apps            = require('./apps'),
    Billing         = require('./billing');

// React-router variables
var Link            = Router.Link;
var RouteHandler    = Router.RouteHandler;

var Account = React.createClass({
    mixins: [
        Router.State
    ],
    statics: {
        willTransitionTo: function(transition) {
            if (transition.path === '/account' || transition.path === '/account/') {
                transition.redirect('/account/apps');
            }
        }
    },
    getInitialState: function() {
        return {
            value: 'Search contacts'
        };
    },
    componentDidMount: function() {
        var component = this;
    },
    componentWillUnmount: function() {
    },
    render: function() {
        // Get the route name
        var routeName = this.getRoutes().reverse()[0].name;

        return (
            <div id="private">
                <Header />
                <div id="account" className="page">
                    <div id="content">
                        <div className="title">My Account</div>
                        <div className="tabs">
                            <Link to="profile">Profile</Link>
                            <span className="separator"></span>
                            <Link to="connections">Connections</Link>
                            <span className="separator"></span>
                            <Link to="settings">Settings</Link>
                            <span className="separator"></span>
                            <Link to="apps">Apps</Link>
                            <span className="separator"></span>
                            <Link to="billing">Billing</Link>
                        </div>
                        <RouteHandler component="div" key={routeName}/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Account;

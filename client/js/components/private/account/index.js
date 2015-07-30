/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../../util'),
    Actions         = require('../../../actions'),
    AppStateStore   = require('../../../stores/appstate');

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
                        <div className="tabs">
                            {/*<img src='../static/img/ic_aphelia.png' height='45px' />
                            <div><b>GroupDirect</b> <sup>BETA</sup></div>*/}
                            <Link to="profile">Profile</Link>
                            <Link to="connections">Connections</Link>
                            <Link to="settings">Settings</Link>
                            <Link to="apps">Apps</Link>
                            <Link to="billing" className={(AppStateStore.getSessionData().userTypeId == 2) ? '' : 'invisible'}>Billing</Link>
                        </div>
                        <RouteHandler component="div" key={routeName}/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Account;

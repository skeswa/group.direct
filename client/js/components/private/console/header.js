/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var AppStateStore   = require('../../../stores/appstate'),
    Actions         = require('../../../actions');

// React-router variables
var Link            = Router.Link;

var Header = React.createClass({
    mixins: [Router.Navigation],
    getInitialState: function() {
        return {
            firstName: AppStateStore.getSessionData().firstName,
            lastName: AppStateStore.getSessionData().lastName,
            sk: AppStateStore.getSessionData().sessionToken
        };
    },
    logout: function() {
        Actions.declareLoggedOut();
        this.transitionTo('/signin');
    },
    render: function() {
        return (
            <div className="header-private">
                <div className="logo">
                    <div className="logo-image">
                        <Link to="apps"><img src='../static/img/ic_aphelia.png' /></Link>
                        <img src='../static/img/arrow.png' />
                    </div>
                    <div className="logo-text">
                        <Link to="routes">SchoolBus Connect Administration <sup>BETA</sup></Link>
                    </div>
                </div>
                <div className="nav">
                    <div className="logout" onClick={this.logout}>Sign out</div>
                    <div className="separator"></div>
                    <a target="_blank" href={"http://apps.group.direct?sk=" + this.state.sk}>Application Console</a>
                    <div className="separator"></div>
                    <Link to="profile">{this.state.firstName + " " + this.state.lastName}</Link>
                </div>
            </div>
        );
    }
});

module.exports = Header;

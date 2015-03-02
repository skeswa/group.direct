/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var AppStateStore   = require('../../stores/appstate'),
    Actions         = require('../../actions');

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
                <Link to="splash" className="logo">
                    <div className="profile-pic" onClick={this.onBiocomClick}>
                        <i className="fa fa-users"></i>
                    </div>
                    <div className="logo-text">
                        GroupConnect <sup>BETA</sup>
                    </div>
                </Link>
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

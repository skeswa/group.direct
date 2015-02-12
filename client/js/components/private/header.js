/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var AppStateStore   = require('../../stores/appstate')

// React-router variables
var Link            = Router.Link;

var Header = React.createClass({
    getInitialState: function() {
        return {
            firstName: AppStateStore.getSessionData().firstName,
            lastName: AppStateStore.getSessionData().lastName,
            sk: AppStateStore.getSessionData().sessionToken
        };
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
                    <Link to="signin">Log out</Link>
                    <div className="separator"></div>
                    <a target="_blank" href={"http://apps.group.direct?sk=" + this.state.sk}>Application Console</a>
                    <Link to="profile">{this.state.firstName + " " + this.state.lastName + " "} :</Link>
                </div>
            </div>
        );
    }
});

module.exports = Header;
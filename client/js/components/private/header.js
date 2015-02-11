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
                <Link to="splash" className="logo">GroupConnect <sup>BETA</sup></Link>
                <div className="nav">
                    <Link to="signin">Sign out</Link>
                    <div className="separator"></div>
                    <a href={"http://apps.group.direct?sk=" + this.state.sk}>Application Console</a>
                    <div className="separator"></div>
                    <a href="#">{this.state.firstName + " " + this.state.lastName}</a>
                </div>
            </div>
        );
    }
});

module.exports = Header;
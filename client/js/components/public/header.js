/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var AppStateStore   = require('../../stores/appstate');

// React-router variables
var Link            = Router.Link;

var Header = React.createClass({
    render: function() {
        //TODO: hide signup/signin buttons if current page == signup/signin
        return (
            <div className="header">
                <Link to="splash" className="logo">
                        <div className="profile-pic">
                            <img src='../static/img/ic_aphelia.png' />
                        </div>
                        <div className="logo-text">
                            GroupDirect <sup>BETA</sup>
                        </div>
                </Link>
                <div className="nav">
                    <Link to="about">About Us</Link>
                    <div className="separator"></div>
                    <Link to="signin">Sign In</Link>
                    <Link className="button" to="signup">Sign Up</Link>
                </div>
            </div>
        );
    }
});

module.exports = Header;
/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

// React-router variables
var Link            = Router.Link;

var Header = React.createClass({
    render: function() {
        return (
            <div className="header">
                <div className="logo">GroupConnect</div>
                <div className="links">
                    <div className="link" data-reference="gptt">Verticals</div>
                    <div className="link" data-reference="apps">Apps</div>
                </div>
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

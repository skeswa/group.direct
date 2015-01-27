/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

// React-router variables
var Link            = Router.Link;

var Header = React.createClass({
    render: function() {
        return (
            <div className="header-private">
                <div className="logo">GroupConnect</div>
                <div className="nav">
                    <Link to="signin">Sign out</Link>
                    <div className="separator"></div>
                    <Link to="about">User Name</Link>
                </div>
            </div>
        );
    }
});

module.exports = Header;
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
                        <div className="tagline"><i>Powered by: </i> <b>C</b>isco <b>I</b>nstant <b>C</b>onnect</div>
                    </div>
                </Link>
                <div className="nav">
                    {/*<a href="http://www.cisco.com" target="_blank"><img height="20px" src='../static/img/cic_logo.png'/></a>
                    <a href="http://www.cisco.com" target="_blank"><i>Powered by:</i> Cisco IC</a>
                    <div className="separator"></div>*/}
                    <Link to="signin">Sign In</Link>
                    <div className="separator"></div>
                    <Link to="signup">Register</Link>
                </div>
                <div className="links">
                    <Link className="link" to="about">About Us</Link>
                    <div className="link" data-reference="apps"><a href="#apps">Apps</a></div>
                    <div className="link" data-reference="gptt"><a href="#verticals">Verticals</a></div>
                    <Link className="link" to="contact">Contact Us</Link>
                </div>
            </div>
        );
    }
});

module.exports = Header;
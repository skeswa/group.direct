/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions');

var Header          = require('./header');

// React-router variables
var Link            = Router.Link;

var Account = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('Account');
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div id="account" className="page">
                <Header />
                <div id="content">
                    <div className="top">
                        <div className="top-wrapper">
                            <div className="profile-pic">
                                <i className="fa fa-user"></i>
                            </div>
                            <div className="top-text-wrapper">
                                <div className="title">User Name</div>
                                <Link to="about" className="button">Edit Profile</Link>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div>Connections</div>
                        <div className="row">
                            <div className="left">
                                <input type="text" className="textbox" ref="search" id="search-textbox" />
                            </div>
                            <div className="right">
                                <Link to="about" className="button">Sync Contacts</Link>
                                <Link to="about" className="button">Add Members</Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="left">
                                <div className="profile-pic">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="top-text-wrapper">
                                    <div className="line1">User Name</div>
                                    <div className="line2">username@email.com</div>
                                </div>
                            </div>
                            <div className="right">
                                <Link to="about" className="button">Invite</Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="left">
                                <div className="profile-pic">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="top-text-wrapper">
                                    <div className="line1">User Name</div>
                                    <div className="line2">username@email.com</div>
                                </div>
                            </div>
                            <div className="right">
                                <Link to="about" className="button">Member</Link>
                                <Link to="about" className="button">Remove</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Account;

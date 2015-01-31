/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Actions         = require('../../../actions');

// React-router variables
var Link            = Router.Link;

var Connections = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('Connections');
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div className="tab-content">
                <div className="row">
                    <div className="left wide">
                        <input type="text" defaultValue='Search contacts'  className="textbox" ref="search" id="search-textbox" />
                    </div>
                    <div className="right narrow">
                        <Link to="about" className="button"><i className="fa fa-plus"></i> Add Members</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="left wide">
                        <div className="profile-pic">
                            <i className="fa fa-user"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">User Name</div>
                            <div className="line2">username@email.com</div>
                        </div>
                    </div>
                    <div className="right narrow">
                        <Link to="about" className="button">Invite</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="left wide">
                        <div className="profile-pic">
                            <i className="fa fa-user"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">User Name</div>
                            <div className="line2">username@email.com</div>
                        </div>
                    </div>
                    <div className="right narrow">
                        <Link to="about" className="button">Member</Link>
                        <Link to="about" className="button">Remove</Link>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Connections;
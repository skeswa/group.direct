/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions');

var Header          = require('./header');

// React-router variables
var Link            = Router.Link;

var Register = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('Register');
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div id="register" className="page">
                <Header />
                <div id="content">
                    <div className="card">
                        <div className="title">Quick Sign-Up</div>
                        <div className="step-holder">
                            <div className="step one">
                                <div className="left">
                                    <div className="field">
                                        <div className="label">First Name</div>
                                        <div className="value">
                                            <input type="text"/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="label">Last Name</div>
                                        <div className="value">
                                            <input type="text"/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="label">Username</div>
                                        <div className="value">
                                            <input type="text"/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="label">Password</div>
                                        <div className="value">
                                            <input type="text"/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="label">Phone</div>
                                        <div className="value">
                                            <input type="text"/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="label">Email</div>
                                        <div className="value">
                                            <input type="text"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="right">
                                    <input type="radio" value="1"/>I have received an invite to join a company<br/>
                                    <input type="radio" value="2"/>I would like to sign-up a new company<br/>
                                    <input type="radio" value="3"/>I would like to invite others to join a group<br/>
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            <div className="separator"/>
                            <div className="btn next">Next</div>
                            <div className="btn back">Back</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Register;

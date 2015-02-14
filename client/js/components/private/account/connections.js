/** @jsx React.DOM */
var React               = require('react'),
    Router              = require('react-router');

var Actions             = require('../../../actions'),
    AppStateStore       = require('../../../stores/appstate'),
    ContactService      = require('../../../services/connections');

var AuthMixin       = require('../../../mixins/auth'),
    ExecutorMixin   = require('../../../mixins/executor');

// React-router variables
var Link            = Router.Link;

var steps = [
    //default state
    function (component) {
        //Populate Add requests
        var requestElements = [];
        for (var i=0; i<component.state.requests.length; i++) {
            var currentRequest = component.state.requests[i];
            requestElements.push(
                <div className="row">
                    <div className="left wide">
                        <div className="profile-pic">
                            <i className="fa fa-user"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">{currentRequest.FirstName + " " + currentRequest.LastName}</div>
                            <div className="line2">{currentRequest.Email}</div>
                        </div>
                    </div>
                    <div className="right narrow">
                        <input type="text" value={component.state.tempReqId} className="textbox temp" placeholder="Req Id?" onChange={component.onTempReqId} />
                        <button className="button" id="accept-button" onClick={component.onAcceptClick}>Accept</button>
                        <button className="button" id="decline-button" onClick={component.onDeclineClick}>Decline</button>
                    </div>
                </div>
            );
        }
        //Populate connections
        var contactElements = [];
        for (var i=0; i<component.state.contacts.length; i++) {
            var currentContact = component.state.contacts[i];
            contactElements.push(
                <div className="row">
                    <div className="left wide">
                        <div className="profile-pic">
                            <i className="fa fa-user"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">{currentContact.FirstName + " " + currentContact.LastName}</div>
                            <div className="line2">{currentContact.Email}</div>
                        </div>
                    </div>
                    <div className="right narrow">
                        <button className="button" id="remove-button" onClick={component.onRemoveClick}>Remove</button>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="left">Connection Requests:</div>
                {requestElements}
                <div className="left">Connections:</div>
                {contactElements}
            </div>
        );
    },
    //contact found
    function (component) {
        return (
            <div className="row">
                <div className="left wide">
                    <div className="profile-pic">
                        <i className="fa fa-user"></i>
                    </div>
                    <div className="top-text-wrapper">
                        <div className="line1">{component.state.firstName} {component.state.lastName}</div>
                        <div className="line2">{component.state.contactEmail}</div>
                    </div>
                </div>
                <div className="right narrow">
                    <button id="invite-button" className={component.state.inviteButtonStyle} onClick={component.onInvite}>{component.state.inviteButtonValue}</button>
                </div>
            </div>
        );
    },
    //contact not found
    function (component) {
        return (
            <div className="row">
                Contact not found. <a href="#">Send invite with invitation code?</a>
            </div>
        );
    }
];

var Connections = React.createClass({
    mixins: [
        AuthMixin,
        ExecutorMixin
    ],
    getInitialState: function() {
        return {
            step: 0,
            inviteButtonValue: 'Invite',
            inviteButtonStyle: 'button',
            sessionToken: AppStateStore.getSessionData().sessionToken,
            userId: AppStateStore.getSessionData().id,
            contacts: [],
            requests: []
        };
    },
    //TODO: remove temp
    onTempReqId: function(event){
        this.setState({
            tempReqId: event.target.value
        });
    },
    onAcceptClick: function(event) {
    var sessionToken = this.state.sessionToken,
        requestId   = this.state.tempReqId,
        status      = 1;

    var component   = this;
        ContactService.approveDenyContactRequest(
            requestId,
            status,
            sessionToken,
            function(res) {
                if (res.ok) {
                    if (res.body.Result) {
                        component.componentDidMount();
                    } else {
                        console.log(res.body.InfoMessages[0].Text);
                    }
                } else {
                    console.log('Error at approveDenyContactRequest', res.text);
                }
            });
    },
    onDeclineClick: function(event) {
    var sessionToken    = this.state.sessionToken,
        requestId   = this.state.tempReqId,
        status      = 0;

    var component   = this;
        ContactService.approveDenyContactRequest(
            requestId,
            status,
            sessionToken,
            function(res) {
                if (res.ok) {
                    if (res.body.Result) {
                        component.componentDidMount;
                    } else {
                        console.log(res.body.InfoMessages[0].Text);
                    }
                } else {
                    console.log('Error at approveDenyContactRequest', res.text);
                }
            });
    },
    onRemoveClick: function(event, contactId) {
        var sessionToken    = this.state.sessionToken,
            component = this;
        ContactService.deleteContactByUserId(
            userId,
            contactId,
            sessionToken,
            function(res) {
                if (res.ok) {
                    if (res.body.Result) {
                        console.log('Response for getUserByEmail', JSON.stringify(res.body));
                        //TODO call getUserContactsByUserId separtely
                        component.componentDidMount;
                    } else {
                        console.log('Error at deleteContactByUserId', res.text);
                    }
                } else {
                    console.log('Error at deleteContactByUserId', res.text);
                }
            })
    },
    onSearch: function(event) {
        this.setState({email: event.target.value});
        var sessionToken    = this.state.sessionToken,
            email = this.state.email,
            component = this;

        ContactService.getUserByEmail(
            email,
            sessionToken,
            function(res) {
                if (res.ok) {
                    if (res.body.Result) {
                        //Contact found
                         component.setState({
                            step: 1,
                            contactId: res.body.Result.Id,
                            firstName: res.body.Result.FirstName,
                            lastName: res.body.Result.LastName,
                            contactEmail: res.body.Result.Email,
                        });
                    } else {
                        //No contact found
                        component.setState({
                            step: 2
                        });
                    }
                    console.log('Response for getUserByEmail', JSON.stringify(res.body));
                } else {
                    console.log('Error at getUserByEmail', res.text);
                }
            });
    },
    onInvite: function(event) {
        var requesterId     = this.state.userId,
            sessionToken    = this.state.sessionToken,
            requesteeId     = this.state.contactId;

        var component       = this;
        ContactService.addContactRequest(
            requesterId,
            requesteeId,
            sessionToken,
            function(res) {
                if (res.ok) {
                    //TODO: Review: experiment
                    component.setState({
                        inviteButtonValue: 'Invitation sent, RequestId: '+ res.body.Result.Id, //TODO: remove temp
                        inviteButtonStyle: 'button disabled'
                    });
                    console.log('Response for addContactRequest', JSON.stringify(res.body));
                } else {
                    console.log('Error at addContactRequest', res.text);
                }
            });
    },
    componentDidMount: function() {
        var sessionToken    = this.state.sessionToken,
            userId          = this.state.userId,
            component       = this;

        Actions.changePageTitle('Connections');
        //Get Add requests
        ContactService.getAddRequestsByUserId(
            userId,
            sessionToken,
            function(res) {
                if (res.ok) {
                    if (res.body.ResultSet) {
                        component.setState({
                            requests: res.body.ResultSet
                        });
                        console.log('Response for getAddRequestsByUserId', JSON.stringify(res.body));
                    }
                } else {
                    console.log('Error at getAddRequestsByUserId', res.text);
                }
            });

        //Get connections
        ContactService.getUserContactsByUserId(
            userId,
            sessionToken,
            function(res) {
                if (res.ok) {
                    if (res.body.ResultSet) {
                        component.setState({
                            contacts: res.body.ResultSet
                        });
                        console.log('Response for getUserContactsByUserId', JSON.stringify(res.body));
                    }
                } else {
                    console.log('Error at getUserContactsByUserId', res.text);
                }
            });
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div className="tab-content">
                <div className="row">
                    <div className="left wide">
                        <input type="text" value={this.state.email} className="textbox" placeholder="Search Contact"  onChange={this.onSearch} />
                    </div>
                    <div className="right narrow">
                        <Link to="about" className="button"><i className="fa fa-plus"></i> Add Members</Link>
                    </div>
                </div>
                {(steps[this.state.step])(this)}
            </div>
        );
    }
});

module.exports = Connections;

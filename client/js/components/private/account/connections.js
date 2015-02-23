/** @jsx React.DOM */
var React               = require('react'),
    Router              = require('react-router');

var Actions             = require('../../../actions'),
    AppStateStore       = require('../../../stores/appstate'),
    ContactService      = require('../../../services/connections'),
    Validator           = require('validator');

var AuthMixin       = require('../../../mixins/auth'),
    ExecutorMixin   = require('../../../mixins/executor');

// React-router variables
var Link            = Router.Link;

var steps = [
    //0:default state
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
                        <button className="button" id="accept-button" onClick={component.createExecutable(component.onAcceptClick, currentRequest.RequestId)}>Accept</button>
                        <button className="button" id="decline-button" onClick={component.createExecutable(component.onDeclineClick, currentRequest.RequestId)}>Decline</button>
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
                        <button className="button" id="remove-button" onClick={component.createExecutable(component.onRemoveClick, currentContact.Id)}>Remove</button>
                    </div>
                </div>
            );
        }

        return (
            <div className="row borderless">
                <div className={'caps'  + (component.state.requests.length ? '' : ' invisible')}>Connection Requests</div>
                {requestElements}
                <div className={'caps' + (component.state.contacts.length ? '' : ' invisible')}>Connections</div>
                {contactElements}
            </div>
        );
    },
    //1:contact found
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
                    <button id="invite-button" className="button" type="button" disabled={component.state.inviteButtonStyle} onClick={component.onInvite}>{component.state.inviteButtonValue}</button>
                </div>
            </div>
        );
    },
    //2:Invalid email
    function (component) {
        return (
            <div className="row">
                {component.state.toastMessage}
            </div>
        );
    },
    //3:contact not found
    function (component) {
        return (
            <div className="row">
                {component.state.toastMessage} <div className="link" onClick={component.onNewInvite}>Send connection request to {component.state.contactEmail}?</div>
            </div>
        );
    },
    //4:Invitation sent
    function (component) {
        return (
            <div className="row">
                Connection request sent to {component.state.contactEmail} successfully.
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
            inviteButtonStyle: '',
            sessionToken: AppStateStore.getSessionData().sessionToken,
            userId: AppStateStore.getSessionData().id,
            contacts: [],
            requests: [],
            searchString: '',
            toastMessage: undefined,
            contactEmail: ''
        };
    },
    onAcceptClick: function(requestId, event) {
    console.log("onAcceptClick", requestId, event);
    var sessionToken = this.state.sessionToken,
        status      = 1;

    var component   = this;
        ContactService.approveDenyContactRequest(
            requestId,
            status,
            sessionToken,
            function(res) {
                if (res.ok) {
                    if (res.body.Result) {
                        console.log("Response from AcceptContactRequest");
                        for(var i=0; i<component.state.requests.length; i++) {
                            if(component.state.requests[i].RequestId === requestId) {
                                component.state.contacts.push(component.state.requests[i]);
                                component.state.requests.splice(i, 1);
                                component.forceUpdate();
                                break;
                            }
                        }
                    } else {
                        console.log(res.body.InfoMessages[0].Text);
                    }
                } else {
                    console.log('Error at approveDenyContactRequest', res.text);
                }
            });
    },
    onDeclineClick: function(requestId, event) {
    var sessionToken    = this.state.sessionToken,
        status          = 0;

    var component   = this;
        ContactService.approveDenyContactRequest(
            requestId,
            status,
            sessionToken,
            function(res) {
                if (res.ok) {
                    if (res.body.Result) {
                        console.log("Response from DeclineContactRequest");
                        for(var i=0; i<component.state.requests.length; i++) {
                            if(component.state.requests[i].RequestId === requestId) {
                                component.state.requests.splice(i, 1);
                                component.forceUpdate();
                                break;
                            }
                        }
                    } else {
                        console.log(res.body.InfoMessages[0].Text);
                    }
                } else {
                    console.log('Error at approveDenyContactRequest', res.text);
                }
            });
    },
    onRemoveClick: function(contactId, event) {
        var sessionToken    = this.state.sessionToken,
            userId          = this.state.userId,
            component = this;
        ContactService.deleteContactByUserId(
            userId,
            contactId,
            sessionToken,
            function(res) {
                if (res.ok) {
                    if (res.body.Result) {
                        console.log('Response for deleteContactByUserId', JSON.stringify(res.body));
                        for(var i=0; i<component.state.contacts.length; i++) {
                            if(component.state.contacts[i].Id === contactId) {
                                console.log(component.state.contacts[i].FirstName);
                                component.state.contacts.splice(i, 1);
                                component.forceUpdate();
                                break;
                            }
                        }
                    } else {
                        console.log('Error at deleteContactByUserId', res.text);
                    }
                } else {
                    console.log('Error at deleteContactByUserId', res.text);
                }
            })
    },
    onSearch: function(event) {
        this.setState({
            searchString: event.target.value,
            inviteButtonValue: 'Invite',
            inviteButtonStyle: ''
        });

        var timer = null,
            email = event.target.value,
            sessionToken    = this.state.sessionToken,
            component   = this;

        clearTimeout(timer);
        timer = setTimeout(function() {
            if (!Validator.isEmail(email)) {
                component.setState({
                    toastMessage: 'Enter a valid email address.',
                    step: 2
                });
            } else {
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
                                contactEmail: res.body.Result.Email
                            });
                        } else {
                            //No contact found
                            component.setState({
                                step: 3,
                                toastMessage: 'Contact not found.',
                                contactEmail: component.state.searchString
                            });
                        }
                        console.log('Response for getUserByEmail', JSON.stringify(res.body));
                    } else {
                        console.log('Error at getUserByEmail', res.text);
                    }
                });
            }
        }, 1000);
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
                        inviteButtonValue: 'Invitation sent',
                        inviteButtonStyle: 'disabled'
                    });
                    console.log('Response for addContactRequest', JSON.stringify(res.body));
                } else {
                    console.log('Error at addContactRequest', res.text);
                }
            });
    },
    onNewInvite: function(event) {
        var requesterId     = this.state.userId,
            sessionToken    = this.state.sessionToken,
            requesteeEmail  = this.state.contactEmail;

        var component       = this;
        ContactService.sendInviteToEmail(
            requesterId,
            requesteeEmail,
            sessionToken,
            function(res) {
                if (res.ok) {
                    component.setState({
                        step: 4
                    });
                    console.log('Response for sendInviteToEmail', JSON.stringify(res.body));
                } else {
                    console.log('Error at sendInviteToEmail', res.text);
                }
            });
    },
    componentDidMount: function() {
        var sessionToken    = this.state.sessionToken,
            userId          = this.state.userId,
            component       = this;

        Actions.changePageTitle('Connections');
        //Get Add requests
        console.log('Get Add requests');
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
                        <input type="text" id="search-text" value={this.state.email} className="textbox" placeholder="Enter email address to add contact"  onChange={this.onSearch} />
                    </div>
                    <div className="right narrow">

                    </div>
                </div>
                {(steps[this.state.step])(this)}
            </div>
        );
    }
});

module.exports = Connections;

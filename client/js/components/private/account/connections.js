/** @jsx React.DOM */
var React               = require('react'),
    Router              = require('react-router');

var Actions             = require('../../../actions'),
    AppStateStore       = require('../../../stores/appstate'),
    ContactService   = require('../../../services/connections');

// React-router variables
var Link            = Router.Link;
//TODO: Review
//Note: I have used the concept of Steps for showing dynamic html in render: function()
//Wondering if there is a better way to do this.
var steps = [
    //default state
    function (component) {
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
                        <Link to="about" className="button">{currentContact.Status ? 'Invite' : 'Respond to Add Request'}</Link>
                    </div>
                </div>
            );
        }

        return (
            <div>
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
    getInitialState: function() {
        return {
            step: 0,
            inviteButtonValue: 'Invite',
            inviteButtonStyle: 'button',
            userId: AppStateStore.getSessionData().id,
            sk: AppStateStore.getSessionData().sessionToken,
            contacts: []
        };
    },
    onSearch: function(event) {
        this.setState({email: event.target.value});
        var email           = this.state.email,
            sessionToken    = this.state.sk;

        var component       = this;
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
            requesteeId     = this.state.contactId,
            sessionToken    = this.state.sk;

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
                        inviteButtonStyle: 'button disabled'
                    });
                    console.log('Response for addContactRequest', JSON.stringify(res.body));
                } else {
                    console.log('Error at addContactRequest', res.text);
                }
            });
    },
    componentDidMount: function() {
        var userId          = this.state.userId,
            sessionToken    = this.state.sessionToken;

        var component       = this;

        Actions.changePageTitle('Connections');
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
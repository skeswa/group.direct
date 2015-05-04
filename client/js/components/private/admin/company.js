/** @jsx React.DOM */
var React               = require('react'),
    Router              = require('react-router');

var Actions             = require('../../../actions'),
    AppStateStore       = require('../../../stores/appstate'),
    ContactService      = require('../../../services/connections'),
    AdminService        = require('../../../services/admin'),
    Validator           = require('validator');

var AuthMixin       = require('../../../mixins/auth'),
    ExecutorMixin   = require('../../../mixins/executor');

// React-router variables
var Link            = Router.Link;

var ManageCompany = React.createClass({
    mixins: [
        AuthMixin,
        ExecutorMixin
    ],

    getInitialState: function() {
        return {
            contacts: [],
            requests: [],
            sessionToken: AppStateStore.getSessionData().sessionToken,
            userId: AppStateStore.getSessionData().id,
            toastMessage: undefined,
            toggleButtonValue: 1
        };
    },
    onAcceptClick: function(requestId, event) {
    console.log("onAcceptClick", requestId, event);
    var sessionToken = this.state.sessionToken;

    var component   = this;
    AdminService.acceptCompanySignupRequest(
        this.state.userId,
        requestId,
        sessionToken,
        function(res) {
            if (res.ok) {
                if (res.body.Result) {
                    console.log("Response from AcceptContactRequest");
                    for(var i=0; i<component.state.requests.length; i++) {
                        if(component.state.requests[i].RequestedBy === requestId) {
                            console.log("requestId", requestId);
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
                console.log('Error at AcceptContactRequest', res.text);
            }
        });
    },
    onDeclineClick: function(requestId, event) {
    var sessionToken    = this.state.sessionToken;
    var component   = this;
    AdminService.rejectCompanySignupRequest(
        this.state.userId,
        requestId,
        sessionToken,
        function(res) {
            if (res.ok) {
                if (res.body.Result) {
                    console.log("Response from rejectCompanySignupRequest");
                    for(var i=0; i<component.state.requests.length; i++) {
                        if(component.state.requests[i].RequestedBy === requestId) {
                            component.state.requests.splice(i, 1);
                            component.forceUpdate();
                            break;
                        }
                    }
                } else {
                    console.log(res.body.InfoMessages[0].Text);
                }
            } else {
                console.log('Error at rejectCompanySignupRequest', res.text);
            }
        });
    },
    onEnableDisableClick: function(companyId, event) {
        var component = this,
        sessionToken    = this.state.sessionToken;

        AdminService.enableDisableCompany(
            companyId,
            component.state.toggleButtonValue,
            sessionToken,
            function(res) {
                if (res.ok) {
                    if (res.body.Result) {
                        console.log('Response for deleteContactByUserId', JSON.stringify(res.body));
                        if(component.state.toggleButtonValue) {
                            component.setState({
                                toggleButtonValue: 0
                            });
                        } else {
                            component.setState({
                                toggleButtonValue: 1
                            });
                        }
                    } else {
                        console.log('Error at deleteContactByUserId', res.text);
                    }
                } else {
                    console.log('Error at deleteContactByUserId', res.text);
                }
            });
    },
    componentDidMount: function() {
        var component       = this,
             sessionToken    = this.state.sessionToken,
             userId          = this.state.userId;

        Actions.changePageTitle('Manage company');
        //Get company requests
        AdminService.getCompanySignupRequests(
            userId,
            sessionToken,
            function(res) {
                if (res.ok) {
                    if (res.body.ResultSet) {
                        component.setState({
                            requests: res.body.ResultSet
                        });
                        console.log('Response for getCompanySignupRequests', JSON.stringify(res.body));
                    }
                } else {
                    console.log('Error at getCompanySignupRequests', res.text);
                }
            });

        //Get company lists
        AdminService.getCompanyList(
            userId,
            sessionToken,
            function(res) {
                if (res.ok) {
                    if (res.body.ResultSet) {
                        component.setState({
                            contacts: res.body.ResultSet
                        });
                        console.log('Response for getCompanyList', JSON.stringify(component.state.contacts));
                    }
                } else {
                    console.log('Error at getCompanyList', res.text);
                }
            });
    },
    render: function() {
        var requestElements = [];
        for (var i=0; i<this.state.requests.length; i++) {
            var currentRequest = this.state.requests[i];
            requestElements.push(
                <div className="row">
                    <div className="left wide">
                        <div className="profile-pic">
                            <i className="fa fa-university"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">{currentRequest.Name}</div>
                            <div className="line2">{currentRequest.Email}</div>
                        </div>
                    </div>
                    <div className="right narrow">
                        <button className="button" id="accept-button" onClick={this.createExecutable(this.onAcceptClick, currentRequest.RequestedBy)}>Accept</button>
                        <button className="button" id="decline-button" onClick={this.createExecutable(this.onDeclineClick, currentRequest.RequestedBy)}>Decline</button>
                    </div>
                </div>
            );
        }
        //Populate connections
        var contactElements = [];
        for (var i=0; i<this.state.contacts.length; i++) {
            var currentContact = this.state.contacts[i];
            contactElements.push(
                <div className="row">
                    <div className="left wide">
                        <div className="profile-pic">
                            <i className="fa fa-user"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">{currentContact.Name}</div>
                            <div className="line2">{currentContact.Email}</div>
                        </div>
                    </div>
                    <div className="right narrow">
                        <button className="button" id="remove-button"
                        onClick={this.createExecutable(this.onEnableDisableClick, currentContact.Id)}>
                        {(this.state.toggleButtonValue ? 'Enable' : 'Disable')}</button>
                    </div>
                </div>
            );
        }

        return (
            <div className="tab-content">
                <div className={'caps'  + (this.state.requests.length ? '' : ' invisible')}>Comapny Signup Requests</div>
                {requestElements}
                <div className={'caps' + (this.state.contacts.length ? '' : ' invisible')}>Existing companies</div>
                {contactElements}
            </div>
        );
    }
});
module.exports = ManageCompany;

/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Actions             = require('../../../actions'),
    AppStateStore       = require('../../../stores/appstate'),
    SchoolBusService    = require('../../../services/schoolbusconnect');

var AuthMixin       = require('../../../mixins/auth'),
    ExecutorMixin   = require('../../../mixins/executor');

// React-router variables
var Link            = Router.Link;

var Drivers = React.createClass({
    mixins: [
        AuthMixin,
        ExecutorMixin
    ],
    getInitialState: function() {
        return{
            contacts: [],
            active: 0,
            proPic: '../static/img/profile-pic.png',
            proPicThumb: '../static/img/profile-pic-thumb.png'
        }
    },
    componentDidMount: function() {
        var component   = this;

        Actions.changePageTitle('SchoolBus Connect');

        //Get connections
        SchoolBusService.getDrivers(
            AppStateStore.getSessionData().sessionToken,
            function (res) {
                if (res.ok) {
                    if (res.body.ResultSet) {
                        component.setState({
                            contacts: res.body.ResultSet,
                            firstName: res.body.ResultSet[0].FirstName,
                            lastName: res.body.ResultSet[0].LastName,
                            email: res.body.ResultSet[0].Email,
                            active: 0
                        });
                        if (res.body.ResultSet[0].ProfilePicture) {
                            component.setState({proPic: res.body.ResultSet[0].ProfilePicture});
                        }
                        if (res.body.ResultSet[0].ProfilePictureThumbnail) {
                            component.setState({proPicThumb: res.body.ResultSet[0].ProfilePictureThumbnail});
                        }
                    }
                } else {
                    console.log('Error at GetListOfUsersByRole', res.text);
                }
            });
    },
    onRouteClick: function(currentContact, i, event) {
        this.setState({
            firstName: currentContact.FirstName,
            lastName: currentContact.LastName,
            email: currentContact.Email,
            active: i
        });
        if (currentContact.ProfilePicture) {
            this.setState({proPic: currentContact.ProfilePicture});
        }
        if (this.ProfilePictureThumbnail) {
            component.setState({proPicThumb: currentContact.ProfilePictureThumbnail});
        }
    },
    render: function() {
        //Get list of drivers
        var contactElements = [];
        for (var i=0; i<this.state.contacts.length; i++) {
            var currentContact = this.state.contacts[i];
            contactElements.push(
                <div className={'row' + (this.state.active === i ? ' active':'')} onClick={this.createExecutable(this.onRouteClick, currentContact, i)}>
                    <div className="profile-pic">
                        <img src={this.state.proPicThumb} />
                    </div>
                    <div className="top-text-wrapper">
                        <div className="line1">{currentContact.FirstName} {currentContact.LastName}</div>
                    </div>
                    <div className="remove-button">
                        <i className="fa fa-close"></i>
                    </div>
                </div>
            );
        }

        return (
            <div className="tab-content">
                <div className="left narrow">
                    <input type="text" className="textbox" placeholder="Search drivers"/>
                    <div className="routes">{contactElements}</div>
                </div>
                <div className="left">
                    <div className="profile-pic">
                        <img src={this.state.proPic} />
                    </div>
                    <div className="subtitle">
                    <input type="text" id="email" ref="email" className="textbox" placeholder="Enter name" value={this.state.email}/></div>
                    <div className="form">
                        <div className="field">
                            <div>First name</div>
                            <input type="text" id="firstName" ref="firstName" className="textbox" value={this.state.firstName}/>
                        </div>
                        <div className="field">
                            <div>Last name</div>
                            <input type="text" id="lastName" ref="lastName" className="textbox" value={this.state.lastName}/>
                        </div>
                        <div className="field">
                            <button id="save-button" type="button" className="button">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Drivers;
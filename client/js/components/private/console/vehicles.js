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

var Vehicles = React.createClass({
    mixins: [
        AuthMixin,
        ExecutorMixin
    ],
    getInitialState: function() {
        return{
            vehicles: [],
            active: 0,
            status:''
        }
    },
    componentDidMount: function() {
        var component   = this;

        Actions.changePageTitle('SchoolBus Connect');

        SchoolBusService.getVehicles(
            AppStateStore.getSessionData().sessionToken,
            function (res) {
                if (res.body.ResultSet) {
                    console.log('Response for getVehicles', JSON.stringify(res.body));
                    component.setState({
                        vehicles: res.body.ResultSet,
                        name: res.body.ResultSet[0].Name,
                        description: res.body.ResultSet[0].Description,
                        model: res.body.ResultSet[0].ModelNo,
                        registration: res.body.ResultSet[0].RegistrationNo,
                        active: 0
                    });
                } else {
                    console.log('Error at getVehicles', res.text);
                }
            });
    },
    onVehicleClick: function(current, i, event) {
        this.setState({
            name: current.Name,
            description: current.Description,
            model: current.ModelNo,
            registration: current.RegistrationNo,
            active: i,
            status:''
        });
    },
    onAddClick: function(event) {
        console.log("ON ADD CLICK");
        this.setState({
            name: '',
            description: '',
            model: '',
            registration: '',
            active: 100
        });
    },
    onNameChange: function(event) {
        this.setState({
            name: event.target.value
        });
    },
    onModelChange: function(event) {
        this.setState({
            model: event.target.value
        });
    },
    onRegChange: function(event) {
        this.setState({
            registration: event.target.value
        });
    },
    onDescChange: function(event) {
        this.setState({
            description: event.target.value
        });
    },
    addVehicle: function(event) {
    var component   = this;
        SchoolBusService.addVehicle(
            this.state.name,
            this.state.model,
            this.state.registration,
            this.state.description,
            AppStateStore.getSessionData().sessionToken,
            function (res) {
                if (res.body.Result) {
                    console.log('Response for addVehicle', JSON.stringify(res.body));
                    component.setState({
                        name: res.body.Result.Name,
                        description: res.body.Result.Description,
                        model: res.body.Result.ModelNo,
                        registration: res.body.Result.RegistrationNo,
                        active: 101,
                        status: 'Vehicle added successfully.'
                    });
                } else {
                    console.log('Error at addVehicle', res.text);
                    component.setState({
                        status: 'Error on adding vehicle.'
                    });
                }
            });
    },
    render: function() {
        //Get list of vehicles
        var vehicleElements = [];
        for (var i=0; i<this.state.vehicles.length; i++) {
            var current = this.state.vehicles[i];
            vehicleElements.push(
                <div className={'row' + (this.state.active === i ? ' active':'')} onClick={this.createExecutable(this.onVehicleClick, current, i)}>
                    <div className="profile-pic">
                        <i className="fa fa-map-marker"></i>
                    </div>
                    <div className="top-text-wrapper">
                        <div className="line1">{current.Name}</div>
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
                    <input type="text" className="textbox" placeholder="Search vehicles"/>
                    <div className="add-button" onClick={this.onAddClick}>
                        <i className="fa fa-plus"></i>
                    </div>
                    <div className="routes">{vehicleElements}</div>
                </div>
                <div className="left">
                    <div className="subtitle">Profile</div>

                    <div className="form">
                        <div className="field">
                            <div className="label wide">Name</div>
                            <input type="text" id="name" ref="name" className="textbox narrow" value={this.state.name} onChange={this.onNameChange}/>
                        </div>
                        <div className="field">
                            <div className="label wide">Model</div>
                            <input type="text" id="model" ref="model" className="textbox narrow" value={this.state.model} onChange={this.onModelChange}/>
                        </div>
                        <div className="field">
                            <div className="label wide">Registration #</div>
                            <input type="text" id="registration" ref="registration" className="textbox narrow" value={this.state.registration} onChange={this.onRegChange}/>
                        </div>
                        <div className="field">
                            <div className="label wide">Description</div>
                            <textarea rows="4" cols="50" name="description" ref="description" className="textbox textarea" value={this.state.description} onChange={this.onDescChange}/>
                        </div>
                        <div className="field center">
                            <button id="save-button" type="button" className="save-button" onClick={this.addVehicle}><i className="fa fa-check"></i></button>
                        </div>
                    </div>
                    <div className={'schedule' + (this.state.active === 100 ? '':' active')}>
                        <div className="subtitle">Schedule</div>
                        <div className="row wider">4-8-2015, Wed, Job: Student Pickup - Route #1 at 7:30am</div>
                        <div className="row wider">4-7-2015, Tue, Job: Student Pickup - Route #1 at 7:30am</div>
                        <div className="row wider">4-6-2015, Mon, Job: Student Pickup - Route #1 at 7:30am</div>
                    </div>
                    <div className="status">
                        {this.state.status}
                    </div>
                </div>
                <div className="vehicle-pic">
                    <img src='../static/img/schoolbus.jpg' />
                </div>
            </div>
        );
    }
});

module.exports = Vehicles;
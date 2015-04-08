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
            active: 0
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
            active: i
        });
    },
    onAddClick: function(event) {
        console.log("ON ADD CLICK");
        this.setState({
            name: '',
            description: '',
            model: '',
            registration: '',
            active: 0
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
                    <div className="subtitle">
                    <input type="text" id="vehicleName" ref="vehicleName" className="textbox" placeholder="Enter vehicle name" value={this.state.name}/></div>
                    <div className="form">
                        <div className="field">
                            <div className="label">Model</div>
                            <input type="text" id="model" ref="model" className="textbox" value={this.state.model}/>
                        </div>
                        <div className="field">
                            <div className="label">Registration #</div>
                            <input type="text" id="registration" ref="registration" className="textbox" value={this.state.registration}/>
                        </div>
                        <div className="field center">
                            <button id="save-button" type="button" className="save-button"><i className="fa fa-check"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Vehicles;
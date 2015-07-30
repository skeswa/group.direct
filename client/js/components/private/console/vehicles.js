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
            message:''
        }
    },
    componentDidMount: function() {
        var component   = this;

        Actions.changePageTitle('SchoolBus Connect');

        SchoolBusService.getVehicles(
            AppStateStore.getSessionData().companyId,
            AppStateStore.getSessionData().sessionToken,
            function (res) {
                if (res.body.ResultSet[0]) {
                    //console.log('Response for getVehicles', JSON.stringify(res.body));
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
                    component.setState({
                        active: 101
                    });
                }
            });
    },
    onVehicleClick: function(current, i, event) {
        this.setState({
            id: current.Id,
            name: current.Name,
            description: current.Description,
            model: current.ModelNo,
            registration: current.RegistrationNo,
            active: i,
            message:''
        });
    },
    onAddClick: function(event) {
        this.setState({
            name: '',
            description: '',
            model: '',
            registration: '',
            active: 100,
            message:''
        });
    },
    onNameChange: function(event) {
        this.setState({
            name: event.target.value,
        });
    },
    onModelChange: function(event) {
        this.setState({
            model: event.target.value,
        });
    },
    onRegChange: function(event) {
        this.setState({
            registration: event.target.value,
        });
    },
    onDescChange: function(event) {
        this.setState({
            description: event.target.value,
        });
    },
    addVehicle: function(event) {
    var component   = this;
        SchoolBusService.addVehicle(
            this.state.name,
            this.state.model,
            this.state.registration,
            this.state.description,
            AppStateStore.getSessionData().companyId,
            AppStateStore.getSessionData().sessionToken,
            function (res) {
                if (res.body.Result) {
                    console.log('Response for addVehicle', JSON.stringify(res.body));
                    component.setState({
                        message: 'Vehicle added successfully.'
                    });
                    console.log('message', component.state.message);
                    //var position = component.state.vehicles.length -1;
                    component.state.vehicles.push(res.body.Result);
                    component.forceUpdate();
                    console.log('vehicles', JSON.stringify(component.state.vehicles));
                } else {
                    console.log('Error at addVehicle', res.text);
                    component.setState({
                        message: 'Error on adding vehicle.'
                    });
                }
            });
    },
    onDelete: function(id, event) {
        var component = this;
        SchoolBusService.deleteVehicle(
           id,
           AppStateStore.getSessionData().sessionToken,
            function(res) {
                if (res.body.Result) {
                    console.log('Response for onDelete', JSON.stringify(res.body));
                    component.setState({
                        id: undefined,
                        name: undefined,
                        description: undefined,
                        model: undefined,
                        registration: undefined,
                        message:'Vehicle deleted successfully'
                    });
                    for(var i=0; i<component.state.vehicles.length; i++) {
                        if(component.state.vehicles[i].Id === id) {
                            console.log(component.state.vehicles[i].Name);
                            component.state.vehicles.splice(i, 1);
                            component.forceUpdate();
                            break;
                        }
                    }
                } else {
                    console.log('Error at onDelete', res.text);
                }
            });
    },
    updateVehicle: function(event) {
        var component   = this;
        console.log("name", this.state.name);
        SchoolBusService.updateVehicle(
            this.state.id,
            this.state.name,
            this.state.model,
            this.state.registration,
            this.state.description,
            AppStateStore.getSessionData().companyId,
            AppStateStore.getSessionData().sessionToken,
            function (res) {
                if (res.body.Result) {
                    console.log('Response for updateVehicle', JSON.stringify(res.body));
                    for(var i=0; i<component.state.vehicles.length; i++) {
                        if(component.state.vehicles[i].Id === component.state.id) {
                            component.state.vehicles[i].Name = component.state.name;
                            component.forceUpdate();
                            break;
                        }
                    }
                    component.setState({
                        message: 'Vehicle updated successfully.'
                    });
                } else {
                    console.log('Error at updateVehicle', res.text);
                    component.setState({
                        message: 'Error on update vehicle.'
                    });
                }
            });
    },
    removeToast: function(event) {
        this.setState({
            mwssage: undefined
        });
    },
    render: function() {
        console.log("active", this.state.active);
        var vehicleElements = [];
        //Get list of vehicles
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
                        <i className="fa fa-close" onClick={this.createExecutable(this.onDelete, current.Id)}></i>
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
                    <div className={this.state.active === 101? '' : 'invisible'}>
                        Looks like you have not setup any vehicle yet. <a onClick={this.onAddClick}>Click here</a> to add a new vehicle.
                    </div>
                    <div className={this.state.active === 101? 'invisible' : ''}>
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
                                <button id="save-button" type="button" className="save-button" onClick={(this.state.active === 100) ? this.addVehicle : this.updateVehicle}><i className="fa fa-check"></i></button>
                            </div>
                        </div>
                        <div className="field center">
                            <div className={'toast'+ (this.state.message ? ' active': ' ')}>
                                <div className="text">{this.state.message}</div>
                                <div className="remove-button">
                                    <i className="fa fa-close" onClick={this.removeToast}></i>
                                </div>
                            </div>
                        </div>
                        <div className={'schedule' + (this.state.active === 100 ? '':' active')}>

                        <br />
                            <div className="subtitle">Schedule</div>
                            <div className="row wider">4-8-2015, Wed, Job: Student Pickup - Route #1 at 7:30am</div>
                            <div className="row wider">4-7-2015, Tue, Job: Student Pickup - Route #1 at 7:30am</div>
                            <div className="row wider">4-6-2015, Mon, Job: Student Pickup - Route #1 at 7:30am</div>
                        </div>
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
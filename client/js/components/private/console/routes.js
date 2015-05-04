/** @jsx React.DOM **/
var React           = require('react'),
    Router          = require('react-router');

var Map             = require('./map.js');

//var Autosuggest     = require('./autosuggest.js');

var Actions             = require('../../../actions'),
    AppStateStore       = require('../../../stores/appstate'),
    SchoolBusService    = require('../../../services/schoolbusconnect');

var AuthMixin       = require('../../../mixins/auth'),
    ExecutorMixin   = require('../../../mixins/executor');

//var suburbs         = ['Cheltenham', 'Mill Park', 'Mordialloc', 'Nunawading'];

// var inputAttributes = {
//   id: 'locations-autosuggest',
//   name: 'locations-autosuggest',
//   className: 'my-sweet-locations-autosuggest',
//   placeholder: 'Enter locations...',
//   value: 'Mordialloc'   // Initial value
// };

// React-router variables
var Link            = Router.Link;
var sessionToken    = AppStateStore.getSessionData().sessionToken,
    companyId       = AppStateStore.getSessionData().companyId,
    d               = new Date();

var Routes = React.createClass({
    mixins: [
        AuthMixin,
        ExecutorMixin
    ],
    getInitialState: function() {
        return{
            routes: [],
            stopData: [],
            stopComponent:[],
            markerElements: [],
            active: 0,
            newStop: undefined,
            //fromAddress: undefined,
            counter: 1000
        }
    },
    componentDidMount: function() {
        var component   = this;

        Actions.changePageTitle('SchoolBus Connect');

        SchoolBusService.getRoutes(
            sessionToken,
            companyId,
            function (res) {
                if (res.body.ResultSet) {
                    //console.log('Response for getRoutes', JSON.stringify(res.body));
                    var stopPoints = [];
                    for (var i=0; i<res.body.ResultSet[0].RoutePointResponseList.length; i++) {
                        var currentStop = res.body.ResultSet[0].RoutePointResponseList[i];
                        stopPoints.push({
                            "Address": currentStop.LocationResponse.Address,
                            "Longitude": currentStop.LocationResponse.Longitude,
                            "Latitude": currentStop.LocationResponse.Latitude,
                            "IsEndingLocation": currentStop.IsEndingLocation,
                            "IsStartingLocation": currentStop.IsStartingLocation,
                            "IsStopOver": 1,
                            "Order": i + 1
                        });
                        component.state.stopComponent.push(
                        <div>
                            <input type="text" className="textbox" value={stopPoints[i].Address}/>
                            <div className="remove-button">
                                <i className="fa fa-close" onClick={component.createExecutable(component.deleteStop, i)}></i>
                            </div>
                        </div>
                        );
                        component.state.markerElements.push(
                            {
                                latitude: currentStop.Latitude,
                                longitude: currentStop.Longitude,
                                title: currentStop.Address
                            }
                        );
                    }

                    component.setState({
                        routes: res.body.ResultSet,
                        routeId: res.body.ResultSet[0].Id,
                        routeName: res.body.ResultSet[0].Name,
                        //fromAddress: res.body.ResultSet[0].RoutePointResponseList[0].LocationResponse.Street1,
                        //toAddress: res.body.ResultSet[0].RoutePointResponseList[res.body.ResultSet[0].RoutePointResponseList.length - 1].LocationResponse.Street1,
                        stopData: stopPoints,
                        active: 0
                    });

                    console.log("stopData on load", JSON.stringify(component.state.stopData));
                } else {
                    console.log('Error at getRoutes', res.text);
                }
            });
    },
    // getSuburbs: function(input, callback) {
    //     var regex = new RegExp('^' + input, 'i');

    //       setTimeout(function() {
    //         callback(null, suburbs.filter(function(suburb){
    //             regex.test(suburb);
    //         }));
    //       }, 300);
    //     },
    onRouteClick: function(currentRoute, i, event) {
        this.setState({
            routeName: currentRoute.Name,
            active: i,
            //stopComponent: [],
            newStop: undefined,
            counter: 1000
        });
        if (currentRoute.RoutePointResponseList[0] === undefined) {
            this.setState({
                //fromAddress: 'Data not found',
                //toAddress: 'Data not found',
                stopData: 'No stops found',
            });
        } else {
            var stopPoints = [];
            this.state.stopComponent.length = 0;
            for (var i=0; i<currentRoute.RoutePointResponseList.length; i++) {
                var currentStop = currentRoute.RoutePointResponseList[i];
                stopPoints.push({
                    "Address": currentStop.LocationResponse.Address,
                    "Longitude": currentStop.LocationResponse.Longitude,
                    "Latitude": currentStop.LocationResponse.Latitude,
                    "IsEndingLocation": currentStop.IsEndingLocation,
                    "IsStartingLocation": currentStop.IsStartingLocation,
                    "IsStopOver": 1,
                    "Order": i + 1
                });
                this.state.stopComponent.push(
                    <div>
                        <input type="text" className="textbox" value={stopPoints[i].Address}/>
                        <div className="remove-button">
                            <i className="fa fa-close" onClick={this.createExecutable(this.deleteStop, i)}></i>
                        </div>
                    </div>
                );
            }

            this.setState({
                //fromAddress: currentRoute.RoutePointResponseList[0].LocationResponse.Street1,
                //toAddress: currentRoute.RoutePointResponseList[currentRoute.RoutePointResponseList.length - 1].LocationResponse.Street1,
                stopData: stopPoints
            });
        }
    },
    onDeleteRouteClick: function(currentRoute, event) {
        var component = this;
        SchoolBusService.deleteRoute(
            currentRoute.Id,
            sessionToken,
            function(res) {
                if (res.body.Result) {
                    console.log('Response for onDeleteRouteClick', JSON.stringify(res.body));
                    for(var i=0; i<component.state.routes.length; i++) {
                        if(component.state.routes[i].Id === currentRoute.Id) {
                            console.log(component.state.routes[i].Name);
                            component.state.routes.splice(i, 1);
                            component.forceUpdate();
                            break;
                        }
                    }
                } else {
                    console.log('Error at onDeleteRouteClick', res.text);
                }
            });
    },
    onAddRouteClick: function(event) {
        this.setState({
            routeName: undefined,
            newStop: undefined,
            //fromAddress: undefined,
            //toAddress: undefined,
            stopData: [],
            active: 100,
            stopComponent: [],
            counter: 0
        });
    },
    onNewStop: function(event) {
        //capture new address
        this.setState ({
            newStop: event.target.value
        });
    },
    onUpdateStop: function(event) {
        this.setState ({
            newStop: event.target.value
        });
    },
    getCoordinates: function(address) {
        var component = this,
                timer = null;
        clearTimeout(timer);
        timer = setTimeout(function() {
            SchoolBusService.getCoordinates(
                component.state[address],
                function (res) {
                    if (res.body.results) {
                        //console.log('Response for getCoordinates', JSON.stringify(res.body));
                        component.setState({
                            street1: res.body.results[0].address_components[0].long_name + ' ' + res.body.results[0].address_components[1].long_name,
                            city: res.body.results[0].address_components[2].long_name,
                            province: res.body.results[0].address_components[4].short_name,
                            country: res.body.results[0].address_components[5].long_name,
                            zip: res.body.results[0].address_components[6].long_name,
                            lat: res.body.results[0].geometry.location.lat,
                            lng: res.body.results[0].geometry.location.lng
                        });
                        component.state.stopData.push({
                            "Address": component.state.street1,
                            "Longitude": component.state.lng,
                            "Latitude": component.state.lat,
                            "IsEndingLocation": 0,
                            "IsStartingLocation": 0,
                            "IsStopOver": 1,
                            "Order": component.state.counter + 1
                        });
                        var i = component.state.counter;
                        component.state.stopComponent.push(
                            <div>
                                <input type="text" className="textbox" value={(component.state.active === 100) ? component.state.stopData[i].Address : component.state.stopData[component.state.stopData.length - 1].Address} onChange={component.addNewStop}/>
                                <div className="remove-button">
                                    <i className="fa fa-close"></i>
                                </div>
                            </div>
                        );
                        //console.log("stopComponent after push", JSON.stringify(component.state.stopComponent));
                        component.setState({
                            newStop: undefined,
                            counter: i + 1
                        });
                        console.log("stopData", JSON.stringify(component.state.stopData));
                    } else {
                        console.log('Error at getCoordinates', res.text);
                    }
                });
            }, 1);
    },
    addNewStop: function(event) {
        //get lat lng and valid address from google API
        this.getCoordinates('newStop');
        var component = this,
                timer = null;

        console.log("counter", component.state.stopData.length);
        console.log("stopData before push", JSON.stringify(component.state.stopData));
        console.log("active", JSON.stringify(component.state.active));

    },
    deleteStop: function(i, event) {
        console.log("count", i)
        this.state.stopData.splice(i, 1);
        this.state.stopComponent.splice(i,1);
        this.forceUpdate();
        console.log("stopData", JSON.stringify(this.state.stopData));
    },
    onRouteNameChange: function(event) {
        this.setState({
            routeName: event.target.value
        });

        console.log("routeName", this.state.routeName);
    },
    // onFromAddressChange: function(event) {
    //     this.setState({
    //         fromAddress: event.target.value,
    //         isStartingLocation: 1,
    //         isEndingLocation: 0
    //     });
    // },
    // onToAddressChange: function(event) {
    //     this.setState({
    //         toAddress: event.target.value,
    //         isStartingLocation: 0,
    //         isEndingLocation: 1
    //     });
    // },
    onSaveRoute: function(event) {
        var component = this;
        SchoolBusService.addRoute(
            this.state.routeName,
            companyId,
            this.state.stopData,
            sessionToken,
            function(res) {
                if (res.body.Result) {
                    console.log('Response from addRoute', JSON.stringify(res.body));
                } else {
                    console.log('Error at addRoute', res.text);
                }
        });
    },
    onUpdateRoute: function(event) {
        var component = this;
        SchoolBusService.updateRoute(
            this.state.routeId,
            this.state.routeName,
            companyId,
            this.state.stopData,
            sessionToken,
            function(res) {
                if (res.body.Result) {
                    console.log('Response from editRoute', JSON.stringify(res.body));
                } else {
                    console.log('Error at editRoute', res.text);
                }
        });
    },
    render: function() {
        //Get list of routes
        var routeElements = [];
        for (var i=0; i<this.state.routes.length; i++) {
            var currentRoute = this.state.routes[i];
            routeElements.push(
                <div className={'row' + (this.state.active === i ? ' active':'')} onClick={this.createExecutable(this.onRouteClick, currentRoute, i)}>
                    <div className="profile-pic">
                        <i className="fa fa-map-marker"></i>
                    </div>
                    <div className="top-text-wrapper">
                        <div className="line1">{currentRoute.Name}</div>
                    </div>
                    <div className="remove-button">
                        <i className="fa fa-close" onClick={this.createExecutable(this.onDeleteRouteClick, currentRoute)}></i>
                    </div>
                </div>
            );
        }

        return (
            <div className="tab-content">
                <div className="left narrow">
                    <input type="text" className="textbox" placeholder="Search routes"/>
                    <div className="add-button" onClick={this.onAddRouteClick}>
                        <i className="fa fa-plus"></i>
                    </div>
                    <div className="routes">{routeElements}</div>
                </div>
                <div className="left">
                    <div>
                    <input type="text" id="routeName" ref="routeName" className="textbox" placeholder="Enter route name" value={this.state.routeName} onBlur={this.onRouteNameChange} /></div>
                    <div className="form">
                        {/*<div className="field">
                            <div className="label">From</div>
                            <input type="text" id="fromAddress" ref="fromAddress" className="textbox" value={this.state.fromAddress} onChange={this.onFromAddressChange} onBlur={this.createExecutable(this.getCoordinates, 'fromAddress')}/>
                        </div>
                        <div className="field">
                            <div className="label">To</div>
                            <input type="text" id="toAddress" ref="toAddress" className="textbox" value={this.state.toAddress} onChange={this.onToAddressChange} onBlur={this.createExecutable(this.getCoordinates, 'toAddress')}/>
                        </div>*/}
                        <div>Enter addresses of drop-off/pickup points below.</div>
                        <div className="field narrow">
                            {this.state.stopComponent}
                            <div>
                                <input type="text" className="textbox" placeholder="Enter stop name" onChange={(this.state.active === 100) ? this.onNewStop : this.onUpdateStop} value={this.state.newStop}/>
                                <div className="remove-button" onClick={this.addNewStop}>
                                    <i className="fa fa-plus"></i>
                                </div>
                            </div>
                        </div>
                        <div className="field center">
                            <button id="save-button" type="button" className="save-button" onClick={(this.state.active === 100) ? this.onSaveRoute : this.onUpdateRoute}><i className="fa fa-check"></i></button>
                            {/*<Autosuggest />*/}
                        </div>
                    </div>
                </div>
                <div className="map">
                    <Map markers={[
                        {latitude: 39.182677, longitude: -77.2748273, title: 'Test 1'},
                        {latitude: 39.213243, longitude: -77.31001, title: 'Test 2'},
                        {latitude: 39.273243, longitude: -77.35001, title: 'Test 3'},
                        {latitude: 39.31, longitude: -77.39300, title: 'Test 4'},
                        //{this.state.markerElements}
                    ]}/>
                </div>
            </div>
        );
    }
});

module.exports = Routes;
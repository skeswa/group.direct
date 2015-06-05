/** @jsx React.DOM **/
var React           = require('react'),
    Router          = require('react-router');

var Map             = require('./map.js');
var ExampleGoogleMap = require('./directionmap.js');

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
            toast: undefined,
            counter: 1000,
            routeName: undefined
        }
    },
    componentDidMount: function() {
        var component   = this;

        Actions.changePageTitle('SchoolBus Connect');

        SchoolBusService.getRoutes(
            AppStateStore.getSessionData().sessionToken,
            AppStateStore.getSessionData().companyId,
            function (res) {
                if (res.body.ResultSet) {
                    console.log('ResultSet Routes: ' + res.body.ResultSet);
                    //console.log('Response for getRoutes', JSON.stringify(res.body));
                    var stopPoints = [];
                    for (var i=0; i<res.body.ResultSet[0].RoutePointResponseList.length; i++) {
                        var currentStop = res.body.ResultSet[0].RoutePointResponseList[i];
                        if(currentStop.LocationResponse) {
                            stopPoints.push({
                                "Address": currentStop.LocationResponse.Address,
                                "Longitude": currentStop.LocationResponse.Longitude,
                                "Latitude": currentStop.LocationResponse.Latitude,
                                "IsEndingLocation": currentStop.IsEndingLocation,
                                "IsStartingLocation": currentStop.IsStartingLocation,
                                "IsStopOver": 1,
                                "Order": i + 1
                            });
                        } else {
                            stopPoints.push({
                                "Address":"Address not found"
                            });
                        }
                        component.state.stopComponent.push(
                        <div>
                            <input type="text" className="textbox" placeholder="Enter stop address" value={stopPoints[i].Address} onChange={component.onSavedStop}/>
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
    renderPointsOnRight: function(currentRoute, i){
        this.setState({
            routeId: currentRoute.Id,
            routeName: currentRoute.Name,
            active: i,
            stopData: [],
            newStop: undefined,
            toast: undefined,
            counter: 1000
        });
        if (currentRoute.RoutePointResponseList[0] === undefined) {
            this.setState({
                //fromAddress: 'Data not found',
                //toAddress: 'Data not found',
                stopData: 'No stops found',
            });
        } else  {
            var stopPoints = [];
            this.state.stopComponent.length = 0;
            for (var i=0; i<currentRoute.RoutePointResponseList.length; i++) {
                var currentStop = currentRoute.RoutePointResponseList[i];
                if(currentStop.LocationResponse) {
                    stopPoints.push({
                        "Address": currentStop.LocationResponse.Address,
                        "Longitude": currentStop.LocationResponse.Longitude,
                        "Latitude": currentStop.LocationResponse.Latitude,
                        "IsEndingLocation": currentStop.IsEndingLocation,
                        "IsStartingLocation": currentStop.IsStartingLocation,
                        "IsStopOver": 1,
                        "Order": i + 1
                    });
                } else {
                    stopPoints.push({
                        "Address":"Address not found"
                    });
                }
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
    onRouteClick: function(currentRoute, i, event) {
        this.renderPointsOnRight(currentRoute, i);
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
            toast: undefined,
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
        console.log("newStop", this.state.newStop);
    },
    onSavedStop: function(event) {
        //capture new address
        this.setState ({
            savedStop: event.target.value
        });
        console.log("savedStop", this.state.savedStop);
    },
    onSavedStopClick: function(event) {
        this.props.value = '';
    },
    onUpdateStop: function(position, event) {
        var component = this;
        console.log("position", position);
        for (var i=0; i<this.state.stopData.length; i++) {
            if (i = position) {
                this.state.stopData.push({
                    "Address": component.state.savedStop,
                    "Longitude": 0,
                    "Latitude": 0,
                    "IsEndingLocation": 0,
                    "IsStartingLocation": 0,
                    "IsStopOver": 1,
                    "Order": i + 1
                });
            break;
            }
        }

        console.log("onUpdateStop", JSON.stringify(this.state.stopData));
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
                            street1: res.body.results[0].address_components[0].long_name + ' ' + res.body.results[0].address_components[1].long_name + ', ' +res.body.results[0].address_components[2].long_name + ', ' +res.body.results[0].address_components[4].short_name,
                            //city: res.body.results[0].address_components[2].long_name,
                            //province: res.body.results[0].address_components[4].short_name,
                            //country: res.body.results[0].address_components[5].long_name,
                            //zip: res.body.results[0].address_components[6].long_name,
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
                                <input type="text" className="textbox" value={(component.state.active === 100) ? component.state.stopData[i].Address : component.state.stopData[component.state.stopData.length - 1].Address}
                                onChange={component.onSavedStop}/>
                                <div className="remove-button">
                                    <i className="fa fa-close" onClick={component.createExecutable(component.deleteStop, i)}></i>
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
        var component = this;

        this.setState({
            counter: component.state.stopData.length,
            toast: undefined
        });
        //get lat lng and valid address from google API
        this.getCoordinates('newStop');

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

        //Reload list to enable multiple deletion
        var stopPoints = [];
        this.state.stopComponent.length = 0;
        for (var i=0; i<this.state.stopData.length; i++) {
            var currentStop = this.state.stopData[i];
                stopPoints.push({
                    "Address": currentStop.Address,
                    "Longitude": currentStop.Longitude,
                    "Latitude": currentStop.Latitude,
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
    },
    onRouteNameChange: function(event) {
        this.setState({
            routeName: event.target.value,
            toast: undefined
        });
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
    calculateStartEndPoints: function() {
        for(var i=0;i<this.state.stopData.length; i++) {
            if(i == 0) {
                this.state.stopData[i].IsStartingLocation = 1;
                this.state.stopData[i].IsEndingLocation = 0;
            } else if(i == this.state.stopData.length - 1) {
                this.state.stopData[i].IsStartingLocation = 0;
                this.state.stopData[i].IsEndingLocation = 1;
            } else {
                this.state.stopData[i].IsStartingLocation = 0;
                this.state.stopData[i].IsEndingLocation = 0;
            }
        }
        console.log('calculateStartEndPoints', JSON.stringify(this.state.stopData));
    },
    onSaveRoute: function(event) {
        //console.log(this.state.stopData);
        var component = this;
        //this.state.routes.push();
        this.calculateStartEndPoints();
        SchoolBusService.addRoute(
            this.refs.routeName.getDOMNode().value.trim(),
            companyId,
            this.state.stopData,
            sessionToken,
            function(res) {
                if (res.body.Result) {
                    component.state.routes.push(res.body.Result);
                    console.log('Response from addRoute', JSON.stringify(res.body));
                    component.setState({
                        toast: "Route added successfully. Refresh page to see the new route."
                    });

                    component.renderPointsOnRight(res.body.Result, component.state.routes.length-1);
                } else {
                    console.log('Error at addRoute', res.text);
                    component.setState({
                        toast: res.body.ErrorMessages[0].Text
                    });
                }
        });
    },
    onUpdateRoute: function(event) {
        var component = this;
        this.calculateStartEndPoints();
        SchoolBusService.updateRoute(
            this.state.routeId,
            this.state.routeName,
            companyId,
            this.state.stopData,
            sessionToken,
            function(res) {
                if (res.body.Result) {
                    console.log('Response from editRoute', JSON.stringify(res.body));
                    component.setState({
                        toast: "Route updated successfully. Refresh page to see the changes."
                    });
                } else {
                    console.log('Error at editRoute', res.text);
                    component.setState({
                        toast: res.body.ErrorMessages[0].Text
                    });
                }
        });
    },
    removeToast: function(event) {
        this.setState({
            toast: undefined
        });
    },
    render: function() {
        //Get list of routes
        //console.log("routes", JSON.stringify(this.state.routes));
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
                        <input type="text" id="routeName" ref="routeName" className="textbox" placeholder="Enter route name" value={this.state.routeName} onChange={this.onRouteNameChange}/>
                    </div>
                    <div className="form">
                        {/*<div className="field">
                            <div className="label">From</div>
                            <input type="text" id="fromAddress" ref="fromAddress" className="textbox" value={this.state.fromAddress} onChange={this.onFromAddressChange} onBlur={this.createExecutable(this.getCoordinates, 'fromAddress')}/>
                        </div>
                        <div className="field">
                            <div className="label">To</div>
                            <input type="text" id="toAddress" ref="toAddress" className="textbox" value={this.state.toAddress} onChange={this.onToAddressChange} onBlur={this.createExecutable(this.getCoordinates, 'toAddress')}/>
                        </div>*/}
                        <div>Enter addresses or co-ordinates of drop-off/pickup points below. Click on Save when you are done.</div>
                        <div className="field narrow">
                            {this.state.stopComponent}
                            <div>
                                <input type="text" className="textbox" placeholder="Enter stop address" onChange={this.onNewStop} value={this.state.newStop}/>
                                <div className="remove-button" onClick={this.addNewStop}>
                                    <i className="fa fa-plus"></i>
                                </div>
                            </div>
                        </div>
                        <div className="field center">
                            <button id="save-button" title="Save" type="button" className="save-button" onClick={(this.state.active === 100) ? this.onSaveRoute : this.onUpdateRoute}><i className="fa fa-check"></i></button>
                            {/*<Autosuggest />*/}
                        </div>
                        <div className="field center">
                            <div className={'toast'+ (this.state.toast ? ' active': ' ')}>
                                <div className="text">{this.state.toast}</div>
                                <div className="remove-button">
                                    <i className="fa fa-close" onClick={this.removeToast}></i>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="map">
                    <ExampleGoogleMap route={this.state.routes[this.state.active]} />
                </div>
            </div>
        );
    }
});

module.exports = Routes;
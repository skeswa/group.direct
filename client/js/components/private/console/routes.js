/** @jsx React.DOM **/
var React           = require('react'),
    Router          = require('react-router');

var Map             = require('./map.js');
var ExampleGoogleMap = require('./directionmap.js');

var Actions             = require('../../../actions'),
    AppStateStore       = require('../../../stores/appstate'),
    SchoolBusService    = require('../../../services/schoolbusconnect');

var AuthMixin       = require('../../../mixins/auth'),
    ExecutorMixin   = require('../../../mixins/executor');

// React-router variables
var Link            = Router.Link;
var sessionToken    = AppStateStore.getSessionData().sessionToken,
    companyId       = AppStateStore.getSessionData().companyId,
    d               = new Date();
var timer;

var ReactLayeredComponentMixin = {
    componentWillUnmount: function() {
        this._unrenderLayer();
        document.body.removeChild(this._target);
    },
    componentDidUpdate: function() {
        this._renderLayer();
    },
    componentDidMount: function() {
        // Appending to the body is easier than managing the z-index of everything on the page.
        // It's also better for accessibility and makes stacking a snap (since components will stack
        // in mount order).
        this._target = document.createElement('div');
        document.body.appendChild(this._target);
        this._renderLayer();
    },
    _renderLayer: function() {
        // By calling this method in componentDidMount() and componentDidUpdate(), you're effectively
        // creating a "wormhole" that funnels React's hierarchical updates through to a DOM node on an
        // entirely different part of the page.
        React.renderComponent(this.renderLayer(), this._target);
    },
    _unrenderLayer: function() {
        React.unmountComponentAtNode(this._target);
    }
};

var Modal = React.createClass({
    killClick: function(e) {
        // clicks on the content shouldn't close the modal
        e.stopPropagation();
    },
    handleBackdropClick: function() {
        // when you click the background, the user is requesting that the modal gets closed.
        // note that the modal has no say over whether it actually gets closed. the owner of the
        // modal owns the state. this just "asks" to be closed.
        this.props.onRequestClose();
    },
    render: function() {
        return this.transferPropsTo(
            <div className="ModalBackdrop" onClick={this.handleBackdropClick}>
                <div className="ModalContent" onClick={this.killClick}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});


var Routes = React.createClass({
    mixins: [
        AuthMixin,
        ExecutorMixin,
        ReactLayeredComponentMixin
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
            routeName: undefined,
            companyId: AppStateStore.getSessionData().companyId,
            sessionToken: AppStateStore.getSessionData().sessionToken,
            shown: false, ticks: 0, modalShown: false,
            waiting: false
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
                        //console.log('Stops', JSON.stringify(currentStop.LocationResponse));
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
                        stopData: stopPoints,
                        active: 0
                    });

                    //console.log("stopData on load", JSON.stringify(component.state.stopData));
                } else {
                    console.log('Error at getRoutes', res.text);
                    component.setState({
                        counter: 1001
                    });
                }
            });
    },
    renderPointsOnRight: function(currentRoute, i){
        this.setState({
            routeId: currentRoute.Id,
            routeName: currentRoute.Name,
            active: i,
            stopData: [],
            newStop: undefined,
            counter: 1000
        });
        if (currentRoute.RoutePointResponseList[0] === undefined) {
            this.setState({
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
           this.state.sessionToken,
            function(res) {
                if (res.body.Result) {
                    //console.log('Response for onDeleteRouteClick', JSON.stringify(res.body));
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
       //console.log("newStop", this.state.newStop);
    },
    onSavedStop: function(event) {
        //capture new address
        this.setState ({
            savedStop: event.target.value
        });
      // console.log("savedStop", this.state.savedStop);
    },
    onSavedStopClick: function(event) {
        this.props.value = '';
    },
    onUpdateStop: function(position, event) {
        var component = this;
       // console.log("position", position);
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

        //console.log("onUpdateStop", JSON.stringify(this.state.stopData));
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
                        //console.log("stopData", JSON.stringify(component.state.stopData));
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

        // console.log("counter", component.state.stopData.length);
        // console.log("stopData before push", JSON.stringify(component.state.stopData));
        // console.log("active", JSON.stringify(component.state.active));

    },
    deleteStop: function(i, event) {
        //console.log("count", i)
        this.state.stopData.splice(i, 1);
        this.state.stopComponent.splice(i,1);
        this.forceUpdate();
        //console.log("stopData", JSON.stringify(this.state.stopData));

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
        //console.log('calculateStartEndPoints', JSON.stringify(this.state.stopData));
    },
    stopWait: function(){
        this.setState({waiting: !this.state.waiting});
        this.setState({shown: !this.state.shown});
        clearInterval(timer);
    },
    onSaveRoute: function(event) {
        //console.log(this.state.stopData);
        timer = setInterval(this.stopWait, 4000);
        var component = this;
        component.setState({waiting: !this.state.waiting});
        component.setState({shown: !this.state.shown});
        //this.state.routes.push();
        this.calculateStartEndPoints();
        SchoolBusService.addRoute(
            this.refs.routeName.getDOMNode().value.trim(),
            this.state.companyId,
            this.state.stopData,
            this.state.sessionToken,
            function(res) {
                if (res.body.Result) {
                    component.state.routes.push(res.body.Result);
                    //console.log('Response from addRoute', JSON.stringify(res.body));
                    component.setState({
                        toast: "Route added successfully."
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
            this.state.companyId,
            this.state.stopData,
            this.state.sessionToken,
            function(res) {
                if (res.body.Result) {
                    //console.log('Response from editRoute', JSON.stringify(res.body));
                    component.setState({
                        toast: "Route updated successfully."
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
    handleClick: function() {
        //console.log("Clicked");
        var component = this;
        component.setState({waiting: !this.state.waiting});
        component.setState({shown: !this.state.shown});
    },
    renderLayer: function() {
        if (!this.state.shown) {
            return <span />;
        }
        return (
            <Modal>
                <i className={'fa fa-refresh fa-spin' + (this.state.waiting ? '' : ' hidden')}></i>
            </Modal>
        );
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
                    <div className={this.state.counter === 1001? '' : 'invisible'}>
                        Looks like you have not setup any route yet. <a onClick={this.onAddRouteClick}>Click here</a> to add a new route.
                    </div>
                    <div className={this.state.counter === 1001? 'invisible' : ''}>
                        <div>
                            <input type="text" id="routeName" ref="routeName" className="textbox" placeholder="Enter route name" value={this.state.routeName} onChange={this.onRouteNameChange}/>
                        </div>
                        <div className="form">
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
                </div>
                <div className="map">
                    <ExampleGoogleMap route={this.state.routes[this.state.active]} />
                </div>
            </div>
        );
    }
});

module.exports = Routes;
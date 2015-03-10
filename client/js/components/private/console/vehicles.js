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
            routes: [],
            stops: [],
            active: 0
        }
    },
    componentDidMount: function() {
        var component   = this;

        Actions.changePageTitle('SchoolBus Connect');

        SchoolBusService.getRoutes(
            AppStateStore.getSessionData().id,
            AppStateStore.getSessionData().sessionToken,
            function (res) {
                if (res.body.ResultSet) {
                    console.log('Response for getRoutes', JSON.stringify(res.body));
                    component.setState({
                        routes: res.body.ResultSet,
                        routeName: res.body.ResultSet[0].routeName,
                        fromAddress: res.body.ResultSet[0].fromAddress,
                        toAddress: res.body.ResultSet[0].toAddress,
                        stops: res.body.ResultSet[0].stops,
                        active: 0
                    });
                } else {
                    console.log('Error at getRoutes', res.text);
                }
            });
    },
    onRouteClick: function(currentRoute, i, event) {
        this.setState({
            routeName: currentRoute.routeName,
            fromAddress: currentRoute.fromAddress,
            toAddress: currentRoute.toAddress,
            stops: currentRoute.stops,
            active: i
        });
    },
    onAddClick: function(event) {
        console.log("ON ADD CLICK");
        this.setState({
            routeName: '',
            fromAddress: '',
            toAddress: '',
            stops: '',
            active: 0
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
                        <div className="line1">{currentRoute.routeName}</div>
                    </div>
                    <div className="remove-button">
                        <i className="fa fa-close"></i>
                    </div>
                </div>
            );
        }
        //Get list of stops for each route
        var stopElements = [];
        for (var i=0; i<this.state.stops.length; i++) {
            var currentStop = this.state.stops[i];
            stopElements.push(
                <div>
                    <input type="text" className="textbox" value={this.state.stops[i].name}/>
                    <div className="remove-button">
                        <i className="fa fa-close"></i>
                    </div>
                </div>
            );
        }

        return (
            <div className="tab-content">
                <div className="left narrow">
                    <input type="text" className="textbox" placeholder="Search routes"/>
                    <div className="add-button" onClick={this.onAddClick}>
                        <i className="fa fa-plus"></i>
                    </div>
                    <div className="routes">{routeElements}</div>
                </div>
                <div className="left">
                    <div className="subtitle">
                    <input type="text" id="routeName" ref="routeName" className="textbox" placeholder="Enter route name" value={this.state.routeName}/></div>
                    <div className="form">
                        <div className="field">
                            <div className="label">From</div>
                            <input type="text" id="fromAddress" ref="fromAddress" className="textbox" value={this.state.fromAddress}/>
                        </div>
                        <div className="field">
                            <div className="label">To</div>
                            <input type="text" id="toAddress" ref="toAddress" className="textbox" value={this.state.toAddress}/>
                        </div>
                        <div>Click on map or enter addresses of drop-off/pickup points below.</div>
                        <div className="field narrow">
                            {stopElements}
                            <div>
                                <input type="text" className="textbox" placeholder="Add new stop"/>
                                <div className="remove-button">
                                    <i className="fa fa-plus"></i>
                                </div>
                            </div>
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

module.exports = Vehicles;
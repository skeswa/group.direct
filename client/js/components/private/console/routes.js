/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');
/**google maps integration
example http://tomchentw.github.io/react-google-maps/#gs
--skipped: {ToastContainer, ToastMessage} = require("react-toastr") - do not have 'react-toastr' yet
--{GoogleMapsMixin, Map, Marker} = require("react-google-maps") gives <Error in plugin 'gulp-uglify'> So did the follwoing **/

var GoogleMapsMixin = require('react-google-maps'),
    Map             = require('react-google-maps'),
    Marker          = require('react-google-maps');

var Actions             = require('../../../actions'),
    AppStateStore       = require('../../../stores/appstate'),
    SchoolBusService    = require('../../../services/schoolbusconnect');

var AuthMixin       = require('../../../mixins/auth'),
    ExecutorMixin   = require('../../../mixins/executor');


// React-router variables
var Link            = Router.Link;

var Routes = React.createClass({
    mixins: [
        AuthMixin,
        ExecutorMixin,
        GoogleMapsMixin
    ],
    getInitialState: function() {
        return{
            routes: [],
            stops: [],
            active: 0,
            //start: google maps integration
            markers: [{
                position: {
                  lat: 25.0112183,
                  lng: 121.52067570000001,
                },
                key: "Taiwan",
            }],
            //end: google maps integration
        }
    },
/* The following codeblock gives <Error in plugin 'gulp-uglify'>, commented out.
   //This is called when you click on the map.
   //Go and try click now.

 _handle_map_click (event) {
    var {markers} = this.state;
    markers = React.addons.update(markers, {
      $push: [
        {
          position: event.latLng,
          key: Date.now(),// Add a key property for: http://fb.me/react-warning-keys
        },
      ],
    });
    this.setState({ markers });

    if (3 === markers.length) {
      this.refs.toast.success(
        "Right click on the marker to remove it",
        "Also check the code!"
      );
    }
    this.refs.map.panTo(event.latLng);
  },

  _handle_marker_rightclick (index, event) {

     //All you modify is data, and the view is driven by data.
     //This is so called data-driven-development. (And yes, it's now in
     //web front end and even with google maps API.)

    var {markers} = this.state;
    markers.splice(index, 1);
    this.setState({ markers });
  },

  _render (props, state) {
    return <div style={{height: "100%"}} {...props}>
      <ToastContainer ref="toast" toastMessageFactory={React.createFactory(ToastMessage.jQuery)}/>
      <Map ref="map" style={{height: "100%"}} zoom={3} center={new google.maps.LatLng(-25.363882, 131.044922)} onClick={this._handle_map_click} />
      {state.markers.map(toMarker, this)}
    </div>;

    function toMarker (marker, index) {
      return <Marker
        position={marker.position}
        key={marker.key}
        onRightclick={this._handle_marker_rightclick.bind(this, index)} />;
    }
  },*/
    componentDidMount: function() {
        var component   = this;

        Actions.changePageTitle('SchoolBus Connect');

        SchoolBusService.getRoutes(
            AppStateStore.getSessionData().sessionToken,
            function (res) {
                if (res.body.ResultSet) {
                    //console.log('Response for getRoutes', JSON.stringify(res.body));
                    component.setState({
                        routes: res.body.ResultSet,
                        routeName: res.body.ResultSet[0].Name,
                        fromAddress: res.body.ResultSet[0].RoutePointResponseList[0].LocationResponse.Street1,
                        toAddress: res.body.ResultSet[0].RoutePointResponseList[res.body.ResultSet[0].RoutePointResponseList.length - 1].LocationResponse.Street1,
                        stops: res.body.ResultSet[0].RoutePointResponseList,
                        active: 0
                    });
                } else {
                    console.log('Error at getRoutes', res.text);
                }
            });
    },
    onRouteClick: function(currentRoute, i, event) {
        this.setState({
            routeName: currentRoute.Name,
            active: i
        });
        if (currentRoute.RoutePointResponseList[0] === undefined) {
            this.setState({
                fromAddress: 'Data not found',
                toAddress: 'Data not found',
                stops: 'No stops found',
            });
        } else {
            this.setState({
                fromAddress: currentRoute.RoutePointResponseList[0].LocationResponse.Street1,
                toAddress: currentRoute.RoutePointResponseList[currentRoute.RoutePointResponseList.length - 1].LocationResponse.Street1,
                stops: currentRoute.RoutePointResponseList
            });
        }
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
                        <div className="line1">{currentRoute.Name}</div>
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
            if (currentStop.IsEndingLocation === 0 && currentStop.IsStartingLocation === 0) {
                stopElements.push(
                <div>
                    <input type="text" className="textbox" value={this.state.stops[i].LocationResponse.Address}/>
                    <div className="remove-button">
                        <i className="fa fa-close"></i>
                    </div>
                </div>
                );
            }
        }
        console.log('stops', JSON.stringify(this.state.stops));
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
                        <div className="field center">
                            <button id="save-button" type="button" className="save-button"><i className="fa fa-check"></i></button>
                        </div>
                    </div>
                </div>
                <div className="map">
                    <img src='../static/img/maps_temp.png' />
                </div>
            </div>
        );
    }
});

/* Not sure how to integrate the follwoing code block
module.exports = React.createClass({
  mixins: [require("../ReactFutureMixin")],

  _render (props, state) {
    return <GettingStarted googleMapsApi={google.maps} {...props} />;
  }
});
*/

module.exports = Routes;
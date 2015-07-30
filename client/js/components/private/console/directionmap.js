/** @jsx React.DOM */
var React           = require('react');
var AppStateStore       = require('../../../stores/appstate'),
    SchoolBusService    = require('../../../services/schoolbusconnect');

var stepDisplay, timer;
var directionsDisplay;
var directionService = new google.maps.DirectionsService();
var sessionToken    = AppStateStore.getSessionData().sessionToken;

var ExampleGoogleMap = React.createClass({
    getDefaultProps: function () {
        return {
            initialZoom: 8,
            mapCenterLat: 39.177361,
            mapCenterLng: -77.266344,
            map: null,
            route: null,
            paths: []
        };
    },
    componentDidMount: function (rootNode) {
      this.props.paths = [];
      //console.log('componentDidMount: ' + this.props.route)
      // initializing map
      this.initializeMap();

      //this.setState({map: map});

    },
    componentDidUpdate: function(prevProps, prevState) {
      this.props.paths = [];
      //console.log('componentDidUpdate: ' + JSON.stringify(this.props.route));
      this.generateRoute();

      if(this.props.route != null && this.props.route.IntermediatePoints == null)
      {
        timer = setInterval(this.savePaths, 3000);
      }

    },
    savePaths: function(){
      this.props.route.IntermediatePoints = this.props.paths;
      var intermediateRoutes = [];
      for(var i = 0; i < this.props.route.IntermediatePoints.length; i++)
      {
        var path = this.props.route.IntermediatePoints[i];
        for(var j = 0; j < path.length; j++)
        {
          //console.log('PATHS: printPath - Latitude: ' + path[j].A + ' Longitude: ' + path[j].F);
          intermediateRoutes.push(path[j]);
          //break;
          //console.log(intermediateRoutes);
        }
      }
      //this.props.route.RoutePoints = intermediateRoutes;
      //console.log(this.state.stopData);
      var component = this;
      //this.state.routes.push();
      SchoolBusService.saveIntermediatePointsOnRoute(
          this.props.route.Id,
          JSON.stringify(intermediateRoutes),
          sessionToken,
          function(res) {
              if (res.body.Result) {
                  component.props.route.IntermediatePoints = JSON.stringify(intermediateRoutes);
                  //console.log('Response from savePaths', JSON.stringify(res.body));
                  /*component.setState({
                      toast: "Paths added successfully. Refresh page to see the new route."
                  });*/

                  //component.renderPointsOnRight(res.body.Result, component.state.routes.length-1);
              } else {
                  console.log('Error at savePaths', res.text);
                  component.setState({
                      toast: res.body.ErrorMessages[0].Text
                  });
              }
      });

      //console.log(JSON.stringify(intermediateRoutes));

      clearInterval(timer);
    },
    generateRoute: function(){
      var currentRoute = this.props.route;
      console.log('currentRoute', JSON.stringify(currentRoute));
      var wayPointList = [];
      this.initializeMap();

      var start, end, newStartPoint;

      if(currentRoute != null && currentRoute.RoutePointResponseList.length > 0){
        for(var i = 0; i < currentRoute.RoutePointResponseList.length; i++){
          var wayPoint = currentRoute.RoutePointResponseList[i];
          var stopOver = Boolean(wayPoint.IsStopOver);
          if(wayPoint.LocationResponse.Latitude != "0.0"){
            wayPointList.push({
              location: new google.maps.LatLng(wayPoint.LocationResponse.Latitude, wayPoint.LocationResponse.Longitude),
              stopover: true
            });
            // - overcome waypoint limitation
            // - checking maximum number of waypoints to draw the route
            if(wayPointList.length % 10 == 0){
              // drawing route
              this.drawRouteOnMap(wayPointList);
              // storing last point of the route as first point
              // to render next part of the route
              newStartPoint = wayPointList[wayPointList.length - 1];
              wayPointList = [];
              wayPointList.push(newStartPoint);
            }
          }
        }
        if(wayPointList.length > 1){
          this.drawRouteOnMap(wayPointList);
          wayPointList = [];
        }
      }
    },
    drawRouteOnMap: function(wayPointList){
      var startPoint = wayPointList[0].location;
      var endPoint = wayPointList[wayPointList.length - 1].location;
      wayPointList.splice(0, 1);
      wayPointList.splice(wayPointList.length - 1, 1);
      var request = {
        origin: startPoint,
        destination: endPoint,
        travelMode: google.maps.TravelMode.DRIVING
      };
      if(wayPointList.length > 0){
        request.waypoints = wayPointList;
      }
      directionService.route(request, this.directionResultCallback);
    },
    mapCenterLatLng: function () {
        var props = this.props;
        return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
    },
    render: function () {
        return (
          <div className="map-dropin" ref="map" style={{width: '380px', height: '400px'}}/>
          /*<div className='map-gic'></div>*/
        );
    },
    initializeMap: function(){
      directionsDisplay = new google.maps.DirectionsRenderer();
      var mapOptions = {
            center: this.mapCenterLatLng(),
            zoom: this.props.initialZoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            navigationControl: true,
            scaleControl: true,
            disableDoubleClickZoom: false,
            draggable: true,
            streetViewControl: true
        },
        map = new google.maps.Map(this.refs.map.getDOMNode(), mapOptions);
        directionsDisplay.setMap(map);

        this.props.map = map;
    },
    directionResultCallback: function(response, status){
    //console.log('directionResultCallback ' + status );
      if(status == google.maps.DirectionsStatus.OK){
        var directionRenderer = new google.maps.DirectionsRenderer();
        directionRenderer.setMap(this.props.map);
        directionRenderer.setOptions({
          suppressMarkers: true,
          polylineOptions: {
            strokeWeight: 7,
            strokeOpacity: 0.5,
            strokeColor: 'blue'
          }
        });
        //directionsDisplay.setDirections(response);
        directionRenderer.setDirections(response);
        this.showSteps(response);
      }
    },
    showSteps: function(directionResult){
      for(var i = 0; i < directionResult.routes.length; i++)
      {
        var route = directionResult.routes[i];
        for(var j = 0; j < route.legs.length; j++)
        {
          var leg = route.legs[j];
          for(var k = 0; k < leg.steps.length; k++)
          {
            var step = leg.steps[k];
            this.props.paths.push(step.path);
            /*for(var l = 0; l < step.path.length; l++){
              var marker = new google.maps.Marker({
                position: step.path[l],
                map: this.props.map,
                icon: 'http://test.apps.group.direct/images/gvc/stopoff.png'
              });
            }*/
          }
          //console.log(leg.start_location);

          var marker = new google.maps.Marker({
            position: leg.start_location,
            map: this.props.map,
            icon: 'http://test.apps.group.direct/images/gvc/stopoff.png'
          });
          this.attachInstructionText(marker, leg.start_address, this.props.map);
        }
        //for(var k = 0; k < route.legs[route.legs.length-1].steps.length; k++)
        //{
          //var step = route.legs[route.legs.length-1].steps[k];
          //this.props.paths.push(step.path);
          /*for(var l = 0; l < step.path.length; l++){
            var marker = new google.maps.Marker({
              position: step.path[l],
              map: this.props.map,
              icon: 'http://test.apps.group.direct/images/gvc/stopoff.png'
            });
          }*/
        //}
        var marker = new google.maps.Marker({
          position: route.legs[route.legs.length-1].end_location,
          map: this.props.map,
          icon: 'http://test.apps.group.direct/images/gvc/stopoff.png'
        });
        this.attachInstructionText(marker, route.legs[route.legs.length-1].end_address, this.props.map);
      }
    },
    attachInstructionText: function(marker, text, map){
      //console.log(text);
      var infowindow = new google.maps.InfoWindow({
          content: text
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });
    }

});

module.exports = ExampleGoogleMap;

  /*React.renderComponent(
      <ExampleGoogleMap />,$('body')[0]
  );*/
var React           = require('react');

var added = function(newArr, oldArr) {
    return newArr.filter(function(i) {return oldArr.indexOf(i) < 0;});
};

var removed = function(newArr, oldArr) {
    return oldArr.filter(function(i) {return newArr.indexOf(i) < 0;});
};

var Map = React.createClass({
    displayName: 'RouteMap',
    // React functions
    getDefaultProps: function() {
        return {
            latitude: 39.941,
            longitude: -75.18300,
            zoom: 12,
            markers: []
        };
    },
    componentDidMount: function() {
        var mapElement = this.refs.map.getDOMNode();
        var mapOptions = {
            center: {
                lat:    this.props.latitude,
                lng:    this.props.longitude
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom:   this.props.zoom
        };
        // Perform google maps map init
        var self = this;
        google.maps.event.addDomListener(window, 'load', function() {
            self.map = new google.maps.Map(mapElement, mapOptions);
            self.markerMap = {};
            marker = [];
            // Init markers
            self.props.markers.forEach(function(marker) {
                self.markerMap[marker.latitude + ',' + marker.longitude] = (new google.maps.Marker({
                    position: new google.maps.LatLng(marker.latitude, marker.longitude),
                    title: marker.title
                }));
                self.markerMap[marker.latitude + ',' + marker.longitude].setMap(self.map);
            });
            console.log(self.markerMap);
        });
    },
    componentDidUpdate: function(prevProps, prevState) {
        var addedMarkers    = added(this.props.markers, prevProps.markers),
            removedMarkers  = removed(this.props.markers, prevProps.markers),
            self            = this;
        addedMarkers.forEach(function(marker) {
            self.markerMap[marker.latitude + ',' + marker.longitude] = new google.maps.Marker({
                position: new google.maps.LatLng(marker.latitude, marker.longitude),
                title: marker.title
            });
            self.markerMap[marker.latitude + ',' + marker.longitude].setMap(self.map);
            console.log(self.markerMap);
        });
        removedMarkers.forEach(function(marker) {
            if (self.markerMap[marker.latitude + ',' + marker.longitude]) {
                self.markerMap[marker.latitude + ',' + marker.longitude].setMap(null);
                delete self.markerMap[marker.latitude + ',' + marker.longitude];
            }
        });
    },
    render: function() {
        return (
            <div className="map-dropin" ref="map" style={{width: '420px', height: '400px'}}/>
        );
    }
});

module.exports = Map;

/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../../util'),
    Actions         = require('../../../actions');

var Header          = require('./header'),
    //Inlude the tabs
     Routes         = require('./routes'),
     Drivers         = require('./drivers'),
     Vehicles         = require('./vehicles'),
     Students         = require('./students');

// React-router variables
var Link            = Router.Link;
var RouteHandler    = Router.RouteHandler;

var Console = React.createClass({
    mixins: [
        Router.State
    ],
    statics: {
        willTransitionTo: function(transition) {
            if (transition.path === '/console' || transition.path === '/console/') {
                transition.redirect('/console/routes');
            }
        }
    },
    componentDidMount: function() {
        var component = this;
    },
    componentWillUnmount: function() {
    },
    onTabClick: function() {
    },
    render: function() {
        // Get the route name
        var routeName = this.getRoutes().reverse()[0].name;

        return (
            <div id="console" className="page">
                <div id="private">
                    <Header />
                    <div id="content">
                        <div className="tabs">
                            <Link to="routes">Routes</Link>
                            <Link to="drivers">Drivers</Link>
                            <Link to="vehicles">Vehicles</Link>
                            <Link to="students">Students</Link>
                            {/*<Link to="notice">Bus Job setups</Link>
                            <Link to="notice">Bus Job runs</Link>*/}
                            <div className="separator"></div>
                            <Link to="notice">Settings</Link>
                            <Link to="notice">Downloads</Link>
                        </div>
                        <RouteHandler component="div" key={routeName}/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Console;

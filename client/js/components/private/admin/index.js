/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../../util'),
    Actions         = require('../../../actions');

var Header          = require('../header'),
    //Inlude the tabs
    Company         = require('./company');

// React-router variables
var Link            = Router.Link;
var RouteHandler    = Router.RouteHandler;

var Admin = React.createClass({
    mixins: [
        Router.State
    ],
    statics: {
        willTransitionTo: function(transition) {
            if (transition.path === '/admin' || transition.path === '/admin/') {
                transition.redirect('/admin/company');
            }
        }
    },
    getInitialState: function() {
        return {
        };
    },
    componentDidMount: function() {
    },
    componentWillUnmount: function() {
    },
    render: function() {
        // Get the route name
        var routeName = this.getRoutes().reverse()[0].name;

        return (
            <div id="private">
                <Header />
                <div id="account" className="page">
                    <div id="content">
                        <div className="tabs">
                            <Link to="company">Manage Company</Link>
                        </div>
                        <RouteHandler component="div" key={routeName}/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Admin;
/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions');

var Header          = require('./header');

// React-router variables
var Link            = Router.Link;

var About = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('About');
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div id="about" className="page">
                <Header />
                <div id="content">

                </div>
            </div>
        );
    }
});

module.exports = About;

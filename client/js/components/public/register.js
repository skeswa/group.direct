/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions');

var Header          = require('./header');

// React-router variables
var Link            = Router.Link;

var Register = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('Register');
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div id="register" className="page">
                <Header />
                <div id="content">
                    <div className="card"/>
                </div>
            </div>
        );
    }
});

module.exports = Register;

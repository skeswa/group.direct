/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Actions         = require('../../../actions');

// React-router variables
var Link            = Router.Link;

var Notice = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('Notice');
    },
    render: function() {
        return (
            <div className="right wide">
                <div className="notice">
                    <div className="big">
                        <i className="fa fa-frown-o"></i>
                    </div>
                    Upgrade is not available in <b>My Account</b><sup>BETA</sup>
                </div>
            </div>
        );
    }
});

module.exports = Notice;
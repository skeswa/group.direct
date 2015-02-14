/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Actions         = require('../../../actions');

var AuthMixin       = require('../../../mixins/auth');

// React-router variables
var Link            = Router.Link;

var Notice = React.createClass({
    mixins: [AuthMixin],
    componentDidMount: function() {
        Actions.changePageTitle('Notice');
    },
    render: function() {
        return (
            <div className="right wide">
                <div className="notice">
                    <div className="huge">
                        <i className="fa fa-frown-o"></i>
                    </div>
                    Upgrade is not available in <b>Group.Connect</b><sup>BETA</sup>
                </div>
            </div>
        );
    }
});

module.exports = Notice;

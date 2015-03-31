/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions');

var Header          = require('./header');

// React-router variables
var Link            = Router.Link;

var RequestExpired = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('Request expired');
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div id="terms" className="page">
                <Header />
                <div id="content">

                    <div className="huge">
                        <i className="fa fa-frown-o"></i>
                    </div>

                    <div className="single-column">
                        It looks like this password reset link can't be used anymore. This probably means that you sent us another password reset request; in that case you'll need to use the newer reset link.

                       <p>You can always request again <Link to='forgot'>here</Link>.</p>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = RequestExpired;

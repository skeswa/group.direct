/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions');

var Header          = require('./header');

// React-router variables
var Link            = Router.Link;

var Thankyou = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('Thank you');
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div id = "thankyou" className = "page" >
                <Header />
                <div id="content">
                    <div className="card">
                        <div className="icon gray shimmed">
                            <i className="fa fa-check"/>
                        </div>
                        <div className="title">Thank you! Your order has been received. You will receive an email and see your new services on your account once they have been provisioned.</div>
                        <div className="subtitle">Continue to your account</div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Thankyou;
/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions');

var Header          = require('./header');

// React-router variables
var Link            = Router.Link;

var R4R = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('Report For Results');
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div id="terms" className="page">
                <Header />
                <div id="content">

                    <div className="title">Report For Results</div>

                    <div className="single-column">
                        Participate in social reporting of issues.

                        <ul>
                            <li>File any issues in a collaborative dashboard so that you can see if it has already been filed and if so, add more information to the filing. </li>
                            <li>And then see results of your reporting by tracking the actions taken by responding organization and the people responsible for issue resolution. </li>
                            <li>Feel good about your participation as a citizen constituent or a customer by looking at the leadership dashboard of most involved customer and citizens. </li>
                            <li>Don’t stay on hold forever waiting for a customer support rep answer you, instead file your request to be contacted and then take the call or chat request at your convenience.</li>
                        </ul>

                        <p>As an organization get closer to your constituents and customers by providing them an opportunity to collaboratively file reports. Reward them for good feedback and get back to them as soon as possible given the customer support infrastructure you can afford.</p>
                        <p>ReportForResults allows you to do all of this. It is a component App of the GroupConnect Operational Communication and Collaboration suite, that allows crowd-sourced Incident Reporting.</p>
                        <p>In ReportForResults, users can create an incident or file a issue by specifying a description, and location. If there is an existing Report on the same issue, they can comment on the existing issue. They can request phone call-back or a Text Chat with a Responder.</p>
                        <p>ReportForResults is different from traditional HelpDesk or Call-Center products. It is designed for nimble responses back to any user at any given location.</p>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = R4R;

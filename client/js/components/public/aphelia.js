/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions');

var Header          = require('./header');

// React-router variables
var Link            = Router.Link;

var Aphelia = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('Aphelia');
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div id="terms" className="page">
                <Header />
                <div id="content">

                    <div className="title">Aphelia</div>

                    <div className="single-column">

                        <p>Manage your workforce better by allowing to track their jobs, alerts and calendar in one integrated App. In real-world Operations, you need a distributed system where people have control over their schedule and work-load, but at the same time are assisted by Dispatcher and Operators coordinating their actions. Field personnel to get to see what they have to do next and Dispatch Operators to get see who is the most loaded and distribute workload.</p>

                        <p>In Aphelia, Dispatchers schedule Jobs based on Calendar Availability, Geographic location and Expertise. And they can send automated or manual Alerts to users to take on Jobs. The App is the work-ticketing component of the GroupConnect Operational Communication and Collaboration suite and so from here users can jump into Job-related Chat Boards or Push-to-Talk Voice Conferences. In GroupConnect, Incidents filed with ReportForResults can trigger creation of Aphelia Jobs, and Aphelia Users can collaborate with each other using GroupVideoConnect Chat or Push-to-Talk functionality.</p>

                        <p>Aphelia can be used for private group Calendaring or Job scheduling, or can be used for Enterprise-grade functionality. The Group Communications is based on the Cisco Instant Connect Push-to-Talk communication framework and can easily scale up to Land-Mobile Radio communications.</p>

                        <p>You will need to be a registered user of GroupConnect to use Aphelia. You can register at <a href="http://group.direct">http://group.direct</a>. You can use Aphelia as a company-member or just within your own limited group of contacts.</p>

                        <p>Aphelia allows you to create jobs, assign them to different users and schedule them. You can also look at your own schedule and the group calendar to schedule new jobs. You can look up other users by expertise, location or availability.</p>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Aphelia;

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

                    <div className="title">About us</div>

                    <div className="row">
                        <div className="column1">
                            Group direct offers direct communications for groups to be connected. At the center of it, it allows group chat in the form of Audio PTT or Text. It then extends this basic group communication capability to a wider range of <a href="http://techthat.works/blog/human-centric-iot/">User-Centric Internet of Things</a> use-cases, enabled by the <a href="https://developer.cisco.com/site/cisco-instant-connect/discover/overview/" target="_blank">Cisco Instant Connect IoT connectivity ecosystem</a>.
                            <p>The initial GroupDirect suite includes:

                                <br/> - Task Scheduling (Aphelia),
                                <br/> - Crowd-reporting and Customer Relationship Management (R4R),
                                <br/> - Video Monitoring (GVC) and
                                <br/> - Group Communication (GVC, CIC).
                                </p>

                        </div>
                        <div className="column2">
                        The GroupDirect suite is primarily targeted to Companies or Agencies in different verticals, such as Public Safety, Hospitality, Education, Healthcare, Utilities and Services. But it can be used for private use as well, for managing communications within one's circles of friends, families and acquaintances.
                        <p>GroupDirect is built using Industry best-practices for scalability, reliability and performance. Hosted on Amazon AWS, it also utilizes Cisco infrastructure and software solution components. For more details, please contact us here.</p>
                        </div>
                   </div>
                </div>
            </div>
        );
    }
});

module.exports = About;
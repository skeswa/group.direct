/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions');

var Header          = require('./header');

// React-router variables
var Link            = Router.Link;

var GVC = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('Group Video Connect');
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div id="terms" className="page">
                <Header />
                <div id="content">

                    <div className="title">Group Video Connect</div>

                    <div className="single-column">
                        <p>Perform your day-to-day work tasks better through collaboration and instant communication with your peers and colleagues.  Locate and then reach out to the expert or to the person who can assist you. Then  chat with them, call them  or share video with them to achieve your work goals faster and more efficiently.</p>
                        <p>As a company or group of individuals, allow your workforce to perform at a higher level while you keep track and consume the collaboration and communication resources on an as-needed basis. </p>
                        <p>GroupVideoConnect, a component App of the GroupConnect Operational Communication and Collaboration suite, allows you to do this. . It allows Push-to-Talk and Video Collaboration between Field Pesonnel or Workforce members and Dispatch Operators. It also allows Text Chat and Group Audio PTT among a group of users. </p>
                        <p>For a better understanding of where GroupVideoConnect fits among different Communication solutions, you can refer to 'Operational Communications' described <a href="http://techthat.works/blog/carpeted-vs-non-carpeted-it-vs-ot-and-uc-vs-oc/">here</a>.</p>
                        <p>Functionalities available in GroupVideoConnect include:</p>
                            - Group Text Chat <br />
                            - Group PTT <br />
                            - Individual User Location <br />
                            - 1-on-1 Text Chat <br />
                            - 1-on-1 Call <br />
                            - Panic Alert <br />
                            - HD Video Viewing <br />
                            - Video Streaming <br />
                            - Integrated 3rd-party Video Conferencing (Jabber/ooVoo) <br />
                        <div className="graphics-holder">
                            <img src='../static/img/gvc1.png' />
                            <img src='../static/img/gvc2.png' />
                            <img src='../static/img/gvc3.png' />
                        </div>
                        <p>Some of the functionalities can be enabled through Technuf Services. Please contact us for customization and enhancement options.</p>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = GVC;

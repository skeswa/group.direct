/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions');

// React-router variables
var Link            = Router.Link;

var Splash = React.createClass({
    templates: {
        app: {
            make: function(logoUrl, title, features, androidUrl, iosUrl) {
                var featureElements = [];
                for (var i = 0; i < features.length; i++) {
                    featureElements.push(
                        <li key={i}>{features[i]}</li>
                    );
                }

                return (
                    <div className="app">
                        <div className="logo" style={{ backgroundImage: 'url(' + logoUrl + ')' }}/>
                        <div className="title">{title}</div>
                        <ul className="features">
                            {featureElements}
                        </ul>
                        <div className="get-the-app">Get the app</div>
                        <a className="get-for-ios" href={iosUrl}/>
                        <a className="get-for-android" href={androidUrl}/>
                    </div>
                );
            }
        }
    },
    componentDidMount: function() {
        Actions.changePageTitle();
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div id="splash" className="page">
                <div className="header">
                    <Link to="splash" className="logo">
                        <div className="profile-pic" onClick={this.onBiocomClick}>
                            <i className="fa fa-users"></i>
                        </div>
                        <div className="logo-text">
                            GroupConnect <sup>BETA</sup>
                        </div>
                </Link>
                    <div className="links">
                        <div className="link" data-reference="gptt">Verticals</div>
                        <div className="link" data-reference="apps">Apps</div>
                    </div>
                    <div className="nav">
                        <Link to="about">About Us</Link>
                        <div className="separator"></div>
                        <Link to="signin">Sign In</Link>
                        <Link className="button" to="signup">Sign Up</Link>
                    </div>
                </div>
                <section className="intro">
                    <div className="spotlight"/>
                    <div className="message">
                        <div className="title-wrapper">
                            <div className="title-centerer">
                                <div className="title">Apps for Instant Communications, Monitoring, Coordination &amp; Collaboration.</div>
                                <div className="subtitle">User-centric Internet of Things with Push-to-Talk, Sensors, Radios and Video</div>
                            </div>
                        </div>
                    </div>
                    <div className="scroll-down">
                        <div className="text">Scroll Down</div>
                        <i className="fa fa-chevron-down"/>
                    </div>
                </section>
                <section className="features">
                    <div className="title">Product Features</div>
                    <div className="subtitle">The features of our technology</div>
                    <div className="feature">
                        <div className="card">
                            <div className="icon green">
                                <i className="fa fa-bullhorn"/>
                            </div>
                            <div className="title">Group<br/>Push&#8209;to&#8209;Talk</div>
                            <div className="link button" data-reference="gptt">Learn More</div>
                        </div>
                    </div>
                    <div className="feature">
                        <div className="card">
                            <div className="icon blue">
                                <i className="fa fa-video-camera"/>
                            </div>
                            <div className="title">Real&#8209;time<br/>HD&nbsp;Video</div>
                            <div className="link button" data-reference="gptt">Learn More</div>
                        </div>
                    </div>
                    <div className="feature">
                        <div className="card">
                            <div className="icon gray shimmed">
                                <i className="fa fa-tasks"/>
                            </div>
                            <div className="title">Personal &amp; Group<br/>Schedule Management</div>
                            <div className="link button" data-reference="gptt">Learn More</div>
                        </div>
                    </div>
                    <div className="feature">
                        <div className="card">
                            <div className="icon orange">
                                <i className="fa fa-area-chart"/>
                            </div>
                            <div className="title">Sensor&#8209;based<br/>Health Monitoring</div>
                            <div className="link button" data-reference="gptt">Learn More</div>
                        </div>
                    </div>
                    <div className="feature">
                        <div className="card">
                            <div className="icon dark-green">
                                <i className="fa fa-warning"/>
                            </div>
                            <div className="title">Community<br/>Self&#8209;Reporting</div>
                            <div className="link button" data-reference="gptt">Learn More</div>
                        </div>
                    </div>
                </section>
                <section className="gptt green">
                    <div className="title">
                        <div className="icon">
                            <i className="fa fa-bullhorn"/>
                        </div>
                        <div className="text">Stay Connected: Group Push-to-talk</div>
                    </div>
                    <div className="row">
                        <div className="half">
                            {
                                this.templates.app.make(
                                    undefined,
                                    'GroupVideoConnect',
                                    [
                                        'Communicate with other users through real-time PTT'
                                    ],
                                    '#',
                                    '#'
                                )
                            }
                        </div>
                        <div className="half">
                            {
                                this.templates.app.make(
                                    undefined,
                                    'Cisco InstantConnect',
                                    [
                                        'Communicate with other users through real-time PTT'
                                    ],
                                    '#',
                                    '#'
                                )
                            }
                        </div>
                    </div>
                </section>
                <section className="gvc blue">
                    <div className="title">
                        <div className="icon">
                            <i className="fa fa-video-camera"/>
                        </div>
                        <div className="text">Stay in the Know: Real-time HD Video</div>
                    </div>
                    {
                        this.templates.app.make(
                            undefined,
                            'GroupVideoConnect',
                            [
                                'Communicate with other users through real-time PTT'
                            ],
                            '#',
                            '#'
                        )
                    }
                </section>
                <section className="aphelia gray">
                    <div className="title">
                        <div className="icon">
                            <i className="fa fa-tasks"/>
                        </div>
                        <div className="text">Organize &amp; Coordinate: Personal &amp; Group Task Scheduling</div>
                    </div>
                    {
                        this.templates.app.make(
                            undefined,
                            'Aphelia',
                            [
                                'Comprehensive dispatching & job managment system',
                                'Workforce automation for highly distributed mobile workforce'
                            ],
                            '#',
                            '#'
                        )
                    }
                </section>
                <section className="bioconnect orange">
                    <div className="title">
                        <div className="icon">
                            <i className="fa fa-area-chart"/>
                        </div>
                        <div className="text">Stay Safe: Monitor &amp; Alert-based Sensors</div>
                    </div>
                    {
                        this.templates.app.make(
                            undefined,
                            'BioConnect',
                            [
                                'Saving lives by wearable sensor-driven real-time monitoring, analysis and alerts'
                            ],
                            '#',
                            '#'
                        )
                    }
                </section>
                <section className="r4r dark-green">
                    <div className="title">
                        <div className="icon">
                            <i className="fa fa-warning"/>
                        </div>
                        <div className="text">Get Results on Issues: Community Self-Reporting</div>
                    </div>
                    {
                        this.templates.app.make(
                            undefined,
                            'ReportForResults',
                            [
                                'Communicate with other users through real-time PTT'
                            ],
                            '#',
                            '#'
                        )
                    }
                </section>
            </div>
        );
    }
});

module.exports = Splash;

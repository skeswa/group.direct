/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Header          = require('./header'),
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
        //skrollr.init();
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div id="splash" className="page">
                <Header />
                <section id="intro-slide" className="intro">
                    <div className="spotlight"/>
                    <div className="message">
                        <div className="title-wrapper">
                            <div
                                className="title-centerer"
                                data-center="bottom: 0px; opacity: 1; transform: scale(1);"
                                data-top="bottom: 200px; opacity: 0; transform: scale(1.1);"
                                data-anchor-target="#intro-slide .title">
                                <div className="title">Apps for Instant Communications, Monitoring, Coordination &amp; Collaboration.</div>
                                <div className="subtitle">User-centric Internet of Things with Push-to-Talk, Sensors, Radios and Video</div>
                                <div className="hedding2" data-center-top="opacity: 0;" data-center="opacity: 1;" data-anchor-target="#features-section">
                                    <a name="apps">Try for Free now – Limited Trials</a>
                                </div>
                                <div className="subtitle normal" data-center-top="opacity: 0;" data-center="opacity: 1;" data-anchor-target="#features-section">
                                    Get limited demo access by signing up <Link to='signup'>here</Link>
                                    <br />
                                    We provide hosted access for Cisco Instant Connect and other Ecosystem Apps. For full access, please <Link to="contact">contact us</Link>.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="scroll-down"
                        data-bottom="bottom: 0px; opacity: 1; transform: scale(1);"
                        data-top-bottom="bottom: 200px; opacity: 0; transform: scale(1.1);">
                        <div className="text">Scroll Down</div>
                        <i className="fa fa-chevron-down"/>
                    </div>
                </section>
                <section id="features-section" className="features videos">
                    <div
                        className="title"
                        data-center-top="opacity: 0;"
                        data-center="opacity: 1;"
                        data-anchor-target="#features-section">
                        <a name="verticals">Featured Videos</a>
                    </div>
                    <div
                        className="subtitle"
                        data-center-top="opacity: 0;"
                        data-center="opacity: 1;"
                        data-anchor-target="#features-section">
                        Getting to know the apps
                    </div>
                    <div
                        className="feature"
                        data-center-top="opacity: 0; top: 100px;"
                        data-center="opacity: 1; top: 0px;"
                        data-anchor-target="#features-section">
                        <div className="card">
                            <div>
                                <iframe width="470" height="295" src="https://www.youtube.com/embed/p5CN3BaEPA8" frameborder="0" allowfullscreen></iframe>
                            </div>
                            <div className="title" data-reference="gptt">Cisco Instant Connect on Sonim durable phones – Group Direct Apps in OT Communications</div>
                        </div>
                    </div>
                    <div
                        className="feature"
                        data-center-top="opacity: 0; top: 100px;"
                        data-center="opacity: 1; top: 0px;"
                        data-anchor-target="#features-section">
                        <div className="card">
                            <div>
                                <iframe width="470" height="295" src="https://www.youtube.com/embed/u_TPl-Joxg0" frameborder="0" allowfullscreen></iframe>
                            </div>
                            <div className="title" data-reference="gptt">GroupDirect Apps complement Cisco Instant Connect-powered App ecosystem for Utilities space</div>
                        </div>
                    </div>
                </section>
                <section id="features-section" className="features">
                    <div
                        className="title"
                        data-center-top="opacity: 0;"
                        data-center="opacity: 1;"
                        data-anchor-target="#features-section">
                        <a name="apps">Product Features</a>
                    </div>
                    <div
                        className="subtitle"
                        data-center-top="opacity: 0;"
                        data-center="opacity: 1;"
                        data-anchor-target="#features-section">
                        The features of our technology
                    </div>
                    <div
                        className="feature"
                        data-center-top="opacity: 0; top: 100px;"
                        data-center="opacity: 1; top: 0px;"
                        data-anchor-target="#features-section">
                        <div className="card">
                            <div className="icon green">
                                <i className="fa fa-bullhorn"/>
                            </div>
                            <div className="title">Group<br/>Push&#8209;to&#8209;Talk</div>
                            <div className="link button" data-reference="gptt">Learn More</div>
                        </div>
                    </div>
                    <div
                        className="feature"
                        data-center-top="opacity: 0; top: 100px;"
                        data-center="opacity: 1; top: 0px;"
                        data-anchor-target="#features-section">
                        <div className="card">
                            <div className="icon blue">
                                <i className="fa fa-video-camera"/>
                            </div>
                            <div className="title">Real&#8209;time<br/>HD&nbsp;Video</div>
                            <div className="link button" data-reference="gptt"><a href='gvc'>Learn More</a></div>
                        </div>
                    </div>
                    <div
                        className="feature"
                        data-center-top="opacity: 0; top: 100px;"
                        data-center="opacity: 1; top: 0px;"
                        data-anchor-target="#features-section">
                        <div className="card">
                            <div className="icon gray shimmed">
                                <i className="fa fa-tasks"/>
                            </div>
                            <div className="title">Personal &amp; Group<br/>Schedule Management</div>
                            <div className="link button" data-reference="gptt"><a href='aphelia'>Learn More</a></div>
                        </div>
                    </div>
                    <div
                        className="feature"
                        data-center-top="opacity: 0; top: 100px;"
                        data-center="opacity: 1; top: 0px;"
                        data-anchor-target="#features-section">
                        <div className="card">
                            <div className="icon orange">
                                <i className="fa fa-area-chart"/>
                            </div>
                            <div className="title">Sensor&#8209;based<br/>Health Monitoring</div>
                            <div className="link button" data-reference="gptt">Learn More</div>
                        </div>
                    </div>
                    <div
                        className="feature"
                        data-center-top="opacity: 0; top: 100px;"
                        data-center="opacity: 1; top: 0px;"
                        data-anchor-target="#features-section">
                        <div className="card">
                            <div className="icon dark-green">
                                <i className="fa fa-warning"/>
                            </div>
                            <div className="title">Community<br/>Self&#8209;Reporting</div>
                            <div className="link button" data-reference="gptt"><a href='r4r'>Learn More</a></div>
                        </div>
                    </div>
                </section>
                <section
                    className="gptt green"
                    data-center-top="height: 0px; padding-bottom: 0px;"
                    data-center="height: 430px; padding-bottom: 50px;">
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
                <section
                    className="gvc blue"
                    data-center-top="height: 0px; padding-bottom: 0px;"
                    data-center="height: 430px; padding-bottom: 50px;">
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
                <section
                    className="aphelia gray"
                    data-center-top="height: 0px; padding-bottom: 0px;"
                    data-center="height: 430px; padding-bottom: 50px;">
                    <div className="title">
                        <div className="icon">
                            <i className="fa fa-tasks"/>
                        </div>
                        <div className="text">Organize &amp; Coordinate: Personal &amp; Group Task Scheduling</div>
                    </div>
                    {
                        this.templates.app.make(
                            undefined,
                            'Aphelia Job Scheduler',
                            [
                                'Comprehensive job managment system',
                                'Workforce automation for highly distributed mobile workforce'
                            ],
                            '#',
                            '#'
                        )
                    }
                </section>
                <section
                    className="bioconnect orange"
                    data-center-top="height: 0px; padding-bottom: 0px;"
                    data-center="height: 430px; padding-bottom: 50px;">
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
                <section
                    className="r4r dark-green"
                    data-center-top="height: 0px; padding-bottom: 0px;"
                    data-center="height: 430px; padding-bottom: 50px;">
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
                {/*<section id="features-section" className="features">
                    <div
                        className="title"
                        data-center-top="opacity: 0;"
                        data-center="opacity: 1;"
                        data-anchor-target="#features-section">
                        <a name="apps">Try for Free now – Limited Trials</a>
                    </div>
                    <div
                        className="subtitle"
                        data-center-top="opacity: 0;"
                        data-center="opacity: 1;"
                        data-anchor-target="#features-section">
                        Get limited demo access by signing up <Link to='signup'>here</Link>
                    </div>
                    We provide hosted access for Cisco Instant Connect and other Ecosystem Apps. For full access, please <Link to="contact">contact us</Link>.
                </section>*/}
            </div>
        );
    }
});

module.exports = Splash;

/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions');

var Header          = require('./header');

// React-router variables
var Link            = Router.Link;

var Services = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('Services');
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div id="services" className="page">
                <Header />
                    <div id="content">
                        <div className="card">
                            <div className="title">Sign up for one or more services</div>
                            <div className="subtitle">Please select the services your company would be interested in</div>
                            <div className="box-holder">
                                <div className="boxes">
                                    <div className="icon gray shimmed">
                                        <i className="fa fa-headphones"/>
                                    </div>
                                    <div className="text">Group Push-to-Talk</div>
                                    <div className="roundedTwo">
                                      <input type="checkbox" value="None" id="roundedTwo" name="check" />
                                      <label for="roundedTwo"></label>
                                    </div>
                                </div>
                                <div className="boxes">
                                    <div className="icon gray shimmed">
                                        <i className="fa fa-video-camera"/>
                                    </div>

                                    <div className="text">Real-time HD Video</div>
                                    <div className="roundedTwo">
                                        <input type="checkbox" value="None" id="roundedTwo" name="check" />
                                        <label for="roundedTwo"></label>
                                    </div>
                                </div>
                                <div className="boxes">
                                    <div className="icon gray shimmed">
                                        <i className="fa fa-calendar"/>
                                    </div>

                                    <div className="text">Personal & Group Task Scheduling</div>
                                    <div className="roundedTwo">
                                        <input type="checkbox" value="None" id="roundedTwo" name="check" checked/>
                                        <label for="roundedTwo"></label>
                                    </div>
                                </div>
                                <div className="boxes">
                                    <div className="icon gray shimmed">
                                        <i className="fa fa-male"/>
                                    </div>

                                    <div className="text">Monitor & Alert based on Sensors</div>
                                    <div className="roundedTwo">
                                        <input type="checkbox" value="None" id="roundedTwo" name="check" />
                                        <label for="roundedTwo"></label>
                                    </div>
                                </div>
                                <div className="boxes">
                                    <div className="icon gray shimmed">
                                        <i className="fa fa-exclamation "/>
                                    </div>

                                    <div className="text">Community Self-Reporting</div>
                                    <div className="roundedTwo">
                                        <input type="checkbox" value="None" id="roundedTwo" name="check" checked />
                                        <label for="roundedTwo"></label>
                                    </div>
                                </div>
                            </div>
                            <div className="footer">
                                <div className="separator"/>

                                <div className="btn next">Next</div>
                                <div className="btn back">Back</div>
                                <div className="text"><b>3</b> services selected</div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
});

module.exports = Services;
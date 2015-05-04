/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Actions         = require('../../../actions'),
    AppStateStore   = require('../../../stores/appstate');

var AuthMixin       = require('../../../mixins/auth');

// React-router variables
var Link            = Router.Link;

// Include internal tabs
var Notice          = require('./notice');

var Apps = React.createClass({
    mixins: [AuthMixin],
    getInitialState: function() {
        return {
        };
    },
    componentDidMount: function() {
        Actions.changePageTitle('Apps');
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div className="tab-content">
                <div>
                    <div className="app-group">
                        <div className="subtitle">Base Apps:</div>
                        <div className="app-block">
                            <div className="profile-pic" >
                                <Link to="notice"><img src='../static/img/gvc.png' /></Link>
                            </div>
                            <div className="top-text-wrapper">
                                <div className="line1"><Link to="notice">Video Connect</Link></div>
                                <div className="line2">
                                    <span>Free</span>
                                    <span className="separator"></span>
                                    <span className="link">Upgrade License</span>
                                </div>
                            </div>
                        </div>
                        <div className="app-block">
                            <div className="profile-pic">
                                <Link to="notice"><img src='../static/img/gc.png' /></Link>
                            </div>
                            <div className="top-text-wrapper">
                                <div className="line1"><Link to="notice">Group Connect</Link></div>
                                <div className="line2">
                                    <span>Free</span>
                                    <span className="separator"></span>
                                    <span className="link">Upgrade License</span>
                                </div>
                            </div>
                        </div>
                        <div className="app-block">
                            <div className="profile-pic" >
                                <Link to="notice"><img src='../static/img/calendar.png' /></Link>
                            </div>
                            <div className="top-text-wrapper">
                                <div className="line1"><Link to="notice">Job Scheduler</Link></div>
                                <div className="line2">
                                    <span>Free</span>
                                    <span className="separator"></span>
                                    <span className="link" >Upgrade License</span>
                                </div>
                            </div>
                        </div>
                        <div className="app-block">
                            <div className="profile-pic">
                                <Link to="notice"><img src='../static/img/r4r.png' /></Link>
                            </div>
                            <div className="top-text-wrapper">
                                <div className="line1"><Link to="notice">Report For Results</Link></div>
                                <div className="line2">
                                    <span>Free</span>
                                    <span className="separator"></span>
                                    <span className="link">Upgrade License</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="app-group">
                        <div className="subtitle">Vertical Apps:</div>
                        <div className="app-block">
                            <div className="profile-pic" >
                                <Link to="notice"><img src='../static/img/field-connect.png' /></Link>
                            </div>
                            <div className="top-text-wrapper">
                                <div className="line1"><Link to="notice">Field Connect</Link></div>
                                <div className="line2">
                                    <span>Free</span>
                                    <span className="separator"></span>
                                    <span className="link" >Upgrade License</span>
                                </div>
                            </div>
                        </div>
                        <div className="app-block">
                            <div className="profile-pic" >
                                <Link to="routes"><img src='../static/img/sbc.png' /></Link>
                            </div>
                            <div className="top-text-wrapper">
                                <div className="line1"><Link to="routes"><b>School Bus Connect</b></Link></div>
                                <div className="line2">
                                    <span>Free</span>
                                    <span className="separator"></span>
                                    <span className="link">Upgrade License</span>
                                </div>
                            </div>
                        </div>
                        <div className="app-block">
                            <div className="profile-pic">
                                <Link to="notice"><img src='../static/img/campus.png'/></Link>
                            </div>
                            <div className="top-text-wrapper">
                                <div className="line1"><Link to="notice">Campus Connect</Link></div>
                                <div className="line2">
                                    <span>Free</span>
                                    <span className="separator"></span>
                                    <span className="link">Upgrade License</span>
                                </div>
                            </div>
                        </div>
                        <div className="app-block">
                            <div className="profile-pic">
                                <Link to="notice"><img src='../static/img/biocom.png' /></Link>
                            </div>
                            <div className="top-text-wrapper">
                                <div className="line1"><Link to="notice">Bio Connect</Link></div>
                                <div className="line2">
                                    <span>Free</span>
                                    <span className="separator"></span>
                                    <span className="link">Upgrade License</span>
                                </div>
                            </div>
                        </div>
                        <div className="app-block">
                            <div className="profile-pic">
                                 <Link to="notice"><img src='../static/img/holster.png' /></Link>
                            </div>
                            <div className="top-text-wrapper">
                                <div className="line1"><Link to="notice">Holster Connect</Link></div>
                                <div className="line2">
                                    <span>Free</span>
                                    <span className="separator"></span>
                                    <span className="link">Upgrade License</span>
                                </div>
                            </div>
                        </div>
                        <div className="app-block">
                            <div className="profile-pic">
                                 <Link to="notice"><img src='../static/img/factory.png' /></Link>
                            </div>
                            <div className="top-text-wrapper">
                                <div className="line1"><Link to="notice">Factory Connect</Link></div>
                                <div className="line2">
                                    <span>Free</span>
                                    <span className="separator"></span>
                                    <span className="link">Upgrade License</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Apps;
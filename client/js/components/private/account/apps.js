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
                                <Link to="notice"><img src='../static/img/Btn_Video.png' /></Link>
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
                                <Link to="notice"><img src='../static/img/Btn_Dispatch.png' /></Link>
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
                                <Link to="notice"><i className="fa fa-th-list"></i></Link>
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
                                <Link to="notice"><i className="fa fa-exclamation-triangle"></i></Link>
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
                                <Link to="notice"><i className="fa fa-users"></i></Link>
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
                                <Link to="routes"><img src='../static/img/Bus_Icon.png' /></Link>
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
                                <Link to="notice"><img src='../static/img/Aphelia_logo.png' /></Link>
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
                                <Link to="notice"><img src='../static/img/biocomalart_logo.png' /></Link>
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
                                 <Link to="notice"><i className="fa fa-user-md"></i></Link>
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
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Apps;
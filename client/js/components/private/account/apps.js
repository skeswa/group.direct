/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Actions         = require('../../../actions'),
    AppStateStore   = require('../../../stores/appstate'),
    ProfileService  = require('../../../services/profile');

var AuthMixin       = require('../../../mixins/auth');

// React-router variables
var Link            = Router.Link;

// Include internal tabs
var Notice          = require('./notice'),
    logos = [
        {appId: 4,  logoUrl: '../static/img/splash-icon.png',    androidUrl: '', consoleUrl:''},
        {appId: 7,  logoUrl: '../static/img/calendar.png', androidUrl: 'https://play.google.com/store/apps/details?id=com.technuf.aphelia.app.apheliaandroid', consoleUrl:''},
        {appId: 8,  logoUrl: '../static/img/biocom.png',    androidUrl: '', consoleUrl:''},
        {appId: 9,  logoUrl: '../static/img/gvc.png',       androidUrl: 'https://play.google.com/store/apps/details?id=com.technuf.vc.android', consoleUrl:''},
        {appId: 10, logoUrl: '../static/img/r4r.png',       androidUrl: 'https://play.google.com/store/apps/details?id=com.technuf.aphelia.app.testforresultandroid', consoleUrl:''},
        {appId: 11, logoUrl: '../static/img/sbc.png',       androidUrl: 'https://play.google.com/store/apps/details?id=com.technuf.android.schoolbusconnect', consoleUrl:'/console/routes'},
        {appId: 12, logoUrl: '../static/img/field-connect.png', androidUrl: 'https://play.google.com/store/apps/details?id=com.technuf.aphelia.app.fieldconnect', consoleUrl:''},
        {appId: 13, logoUrl: '../static/img/factory.png',   androidUrl: '', consoleUrl:''},
        {appId: 14, logoUrl: '../static/img/holster.png',   androidUrl: '', consoleUrl:''},
        {appId: 15, logoUrl: '../static/img/campus.png',    androidUrl: '', consoleUrl:''},
        {appId: 16, logoUrl: '../static/img/cic_logo.png',    androidUrl: '', consoleUrl:''}
    ];

var Apps = React.createClass({
    mixins: [AuthMixin],
    getInitialState: function() {
        return {
            apps: []
        };
    },
    componentDidMount: function() {
        Actions.changePageTitle('Apps');
        var component   = this,
            apps        = [];
        ProfileService.getApps(
            AppStateStore.getSessionData().companyId,
            AppStateStore.getSessionData().sessionToken,
            function(res) {
                if(res.body.ResultSet) {
                    var appStore = res.body.ResultSet;
                    for(var i=0; i<appStore.length; i++) {
                        for (var j=0; j<logos.length; j++) {
                            if(logos[j].appId == appStore[i].AppId) {
                                apps.push({
                                    appId: appStore[i].AppId,
                                    appName: appStore[i].Application.Name,
                                    logoUrl: logos[j].logoUrl,
                                    androidUrl: logos[j].androidUrl,
                                    consoleUrl: logos[j].consoleUrl
                                });
                                break;
                            }
                        }
                    }
                    component.setState({apps: apps});
                    console.log("Success at getApps", JSON.stringify(apps));
                } else {
                    console.log("Success at getApps", res.Text);
                }
        });

    },
    componentWillMount: function() {

    },
    render: function() {
        var appElements     = [],
            appDetails      = 'notice';
        console.log("apps at render", JSON.stringify(this.state.apps));

        for (var i=0; i<this.state.apps.length; i++) {
            if (this.state.apps[i].consoleUrl) {
                appDetails = this.state.apps[i].consoleUrl;
            } else {
                appDetails = 'notice';
            }
            appElements.push(
                <div className="app-block">
                    <div className="profile-pic" >
                        <Link to={appDetails}><img src={this.state.apps[i].logoUrl} /></Link>
                    </div>
                    <div className="top-text-wrapper">
                        <div className="line1"><Link to={appDetails}>{this.state.apps[i].appName}</Link></div>
                        <div className="line2">
                            <span>Basic</span>
                            <span className="separator"></span>
                            <Link to="billing" className="link">Upgrade License</Link>
                        </div>
                        <a className="get-for-android" href={this.state.apps[i].androidUrl} target="_blank"/>
                    </div>
                </div>
            );
        }
        //console.log("appElements", JSON.stringify(appElements));
        return (
            <div className="tab-content">
                <div>
                    <div className="app-group">
                        {/*<div className="subtitle">Base Apps:</div>*/}
                        {appElements}
                        {/*
                        <div className="app-block">
                            <div className="profile-pic" >
                                <Link to="notice"><img src='../static/img/gvc.png' /></Link>
                            </div>
                            <div className="top-text-wrapper">
                                <div className="line1"><Link to="notice">Video Connect</Link></div>
                                <div className="line2">
                                    <span>Free</span>
                                    <span className="separator"></span>
                                    <Link to="contact" className="link">Contact us</Link>
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
                                    <Link to="contact" className="link">Contact us</Link>
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
                                    <Link to="contact" className="link">Contact us</Link>
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
                                    <Link to="contact" className="link">Contact us</Link>
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
                                    <Link to="billing" className="link">Upgrade License</Link>
                                </div>
                            </div>
                        </div>
                        <div className="app-block">
                            <div className="profile-pic">
                                <Link to="routes"><img src='../static/img/sbc.png' /></Link>
                            </div>
                            <div className="top-text-wrapper">
                                <div className="line1"><Link to="routes"><b>School Bus Connect</b></Link></div>
                                <div className="line2">
                                    <span>Free</span>
                                    <span className="separator"></span>
                                    <Link to="contact" className="link">Contact us</Link>
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
                                    <Link to="contact" className="link">Contact us</Link>
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
                                    <Link to="contact" className="link">Contact us</Link>
                                </div>
                            </div>
                        </div>
                        <div className="app-block">
                            <div className="profile-pic">
                                 <Link to="notice"><img src='../static/img/holster.png' /></Link>
                            </div>
                            <div className="top-text-wrapper">
                                <div className="line1"><Link to="notice">Protect & Connect</Link></div>
                                <div className="line2">
                                    <span>Free</span>
                                    <span className="separator"></span>
                                    <Link to="billing" className="link">Upgrade License</Link>
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
                                    <Link to="contact" className="link">Contact us</Link>
                                </div>
                            </div>
                        </div>*/}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Apps;
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

var steps = [
    //First Step: Aphelia
    function (component) {
        return (
            <div className="right wide">
                    <div className="left">
                        <div className="subtitle">Aphelia App Settings</div>
                        <div className="field">
                            <Link to="routes">Aphelia School Bus Connect Admin Console</Link>
                            <div className="label">Send email</div>
                            <Link to="notice" className="button">Once an hour  <i className="fa fa-chevron-down"></i></Link>
                        </div>
                    </div>
                    <div className="right">
                        <div className="field">
                            <div><Link to="notice">Application Description</Link></div>
                            <div className="get-the-app">Get the app</div>
                            <a className="get-for-ios" href="#"/>
                            <a className="get-for-android" href="#"/>
                        </div>
                    </div>
                </div>
        );
    },
    //Second Step: GVC
    function (component) {
        return (
            <div className="right wide">
                    <div className="left">
                        <div className="subtitle">GVC App Settings</div>
                        <div className="field">
                            <div className="label">Send email</div>
                            <Link to="notice" className="button">Once an hour  <i className="fa fa-chevron-down"></i></Link>
                        </div>
                    </div>
                    <div className="right">
                        <div className="field">
                            <div><Link to="notice">Application Description</Link></div>
                            <div className="get-the-app">Get the app</div>
                            <a className="get-for-ios" href="#"/>
                            <a className="get-for-android" href="#"/>
                        </div>
                    </div>
                </div>
        );
    },
    //Third Step: Biocom
    function (component) {
        return (
            <div className="right wide">
                    <div className="left">
                        <div className="subtitle">Biocom App Settings</div>
                        <div className="field">
                            <div className="label">Send email</div>
                            <Link to="notice" className="button">Once an hour  <i className="fa fa-chevron-down"></i></Link>
                        </div>
                    </div>
                    <div className="right">
                        <div className="field">
                            <div><Link to="notice">Application Description</Link></div>
                            <div className="get-the-app">Get the app</div>
                            <a className="get-for-ios" href="#"/>
                            <a className="get-for-android" href="#"/>
                        </div>
                    </div>
                </div>
        );
    },
    //Fourth Step: R4R
    function (component) {
        return (
            <div className="right wide">
                    <div className="left">
                        <div className="subtitle">R4R App Settings</div>
                        <div className="field">
                            <div className="label">Send email</div>
                            <Link to="notice" className="button">Once an hour  <i className="fa fa-chevron-down"></i></Link>
                        </div>
                    </div>
                    <div className="right">
                        <div className="field">
                            <div><Link to="notice">Application Description</Link></div>
                            <div className="get-the-app">Get the app</div>
                            <a className="get-for-ios" href="#"/>
                            <a className="get-for-android" href="#"/>
                        </div>
                    </div>
                </div>
        );
    },
    //Fifth Step: CIC
    function (component) {
        return (
            <div className="right wide">
                    <div className="left">
                        <div className="subtitle">CIC App Settings</div>
                        <div className="field">
                            <div className="label">Send email</div>
                            <Link to="notice" className="button">Once an hour  <i className="fa fa-chevron-down"></i></Link>
                        </div>
                    </div>
                    <div className="right">
                        <div className="field">
                            <div><Link to="notice">Application Description</Link></div>
                            <div className="get-the-app">Get the app</div>
                            <a className="get-for-ios" href="#"/>
                            <a className="get-for-android" href="#"/>
                        </div>
                    </div>
                </div>
        );
    },
    // Sixth Step: Notice
    function(component) {
        return(
            <Notice />
        );
    }
];

var Apps = React.createClass({
    mixins: [AuthMixin],
    getInitialState: function() {
        return {
            step: 0,
            //sk: AppStateStore.getSessionData().sessionToken
        };
    },
    componentDidMount: function() {
        Actions.changePageTitle('Apps');
    },
    componentWillUnmount: function() {
    },
    onUpgradeClick: function() {
        this.setState({
            step: 5
        });
    },
    onApheliaClick: function() {
        this.setState({
            step: 0
        });
    },
    onGvcClick: function() {
        this.setState({
            step: 1
        });
    },
    onBiocomClick: function() {
        this.setState({
            step: 2
        });
    },
    onR4rClick: function() {
        this.setState({
            step: 3
        });
    },
    onCicClick: function() {
        this.setState({
            step: 4
        });
    },
    render: function() {
        return (
            <div className="tab-content">
                <div className="left narrow">
                    <div className={'row'+(this.state.step === 0 ? ' active' : '')}>
                        <div className="profile-pic" onClick={this.onApheliaClick} >
                            <img src='../static/img/Aphelia_logo.png' />
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1" onClick={this.onApheliaClick}>Aphelia</div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link" onClick={this.onUpgradeClick}>Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className={'row'+(this.state.step === 1 ? ' active' : '')}>
                        <div className="profile-pic" onClick={this.onGvcClick} >
                            <img src='../static/img/gvc_logo.png' />
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1" onClick={this.onGvcClick}>GroupVideoConnect</div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link" onClick={this.onUpgradeClick}>Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className={'row'+(this.state.step === 2 ? ' active' : '')}>
                        <div className="profile-pic" onClick={this.onBiocomClick}>
                            <img src='../static/img/biocomalart_logo.png' />
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1" onClick={this.onBiocomClick}>BioConnect</div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link" onClick={this.onUpgradeClick}>Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className={'row'+(this.state.step === 3 ? ' active' : '')}>
                        <div className="profile-pic" onClick={this.onR4rClick}>
                            <img src='../static/img/report_for_result.png' />
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1" onClick={this.onR4rClick}>ReportForResults</div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link" onClick={this.onUpgradeClick}>Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className={'row'+(this.state.step === 4 ? ' active' : '')}>
                        <div className="profile-pic" onClick={this.onCicClick}>
                            <img src='../static/img/cic_logo.png' />
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1" onClick={this.onCicClick}>CiscoInstantConnect</div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link" onClick={this.onUpgradeClick}>Upgrade License</span>
                            </div>
                        </div>
                    </div>
                </div>
                {(steps[this.state.step])(this)}
            </div>
        );
    }
});

module.exports = Apps;

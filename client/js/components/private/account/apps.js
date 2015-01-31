/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Actions         = require('../../../actions');

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
                            <div className="label">Send email</div>
                            <Link to="about" className="button">Once an hour  <i className="fa fa-chevron-down"></i></Link>
                        </div>
                    </div>
                    <div className="right">
                        <div className="subtitle">Console</div>
                        <div className="field">
                            <Link to="about" className="button big">Go to Application</Link>
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
                            <Link to="about" className="button">Once an hour  <i className="fa fa-chevron-down"></i></Link>
                        </div>
                    </div>
                    <div className="right">
                        <div className="subtitle">Console</div>
                        <div className="field">
                            <Link to="about" className="button big">Go to Application</Link>
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
                            <Link to="about" className="button">Once an hour  <i className="fa fa-chevron-down"></i></Link>
                        </div>
                    </div>
                    <div className="right">
                        <div className="subtitle">Console</div>
                        <div className="field">
                            <Link to="about" className="button big">Go to Application</Link>
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
                            <Link to="about" className="button">Once an hour  <i className="fa fa-chevron-down"></i></Link>
                        </div>
                    </div>
                    <div className="right">
                        <div className="subtitle">Console</div>
                        <div className="field">
                            <Link to="about" className="button big">Go to Application</Link>
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
                            <Link to="about" className="button">Once an hour  <i className="fa fa-chevron-down"></i></Link>
                        </div>
                    </div>
                    <div className="right">
                        <div className="subtitle">Console</div>
                        <div className="field">
                            <Link to="about" className="button big">Go to Application</Link>
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
    getInitialState: function() {
        return {
            step: 0
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
                            <i className="fa fa-puzzle-piece"></i>
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
                            <i className="fa fa-users"></i>
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
                            <i className="fa fa-shield"></i>
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
                            <i className="fa fa-empire"></i>
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
                            <i className="fa fa-phone-square"></i>
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
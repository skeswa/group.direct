/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Actions         = require('../../../actions');

// React-router variables
var Link            = Router.Link;

var Billing = React.createClass({
    getInitialState: function() {
        return {
            step: 6
        };
    },
    componentDidMount: function() {
        Actions.changePageTitle('Billing');
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
    onAccountClick: function() {
        this.setState({
            step: 6
        });
    },
    render: function() {
        return (
            <div className="tab-content">
                <div className="left narrow">
                    <div className={'row'+(this.state.step === 6 ? ' active' : '')} onClick={this.onAccountClick} >
                        <div className="profile-pic">
                            <i className="fa fa-usd"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">Account</div>
                            <div className="line2">
                                <span>Summary</span>
                            </div>
                        </div>
                    </div>
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
                <div className="right wide">
                    <div className="billing">
                        <div className="app-header"><i className="fa fa-chevron-down"></i> Aphelia</div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">License</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="3" type="text" className="textbox" /></div>
                            <span className="column2">Free License - $0/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="2" type="text" className="textbox" /></div>
                            <span className="column2">Free License - $5/month per user</span>
                            <span className="column3">$10.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">Add ons</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="3" type="text" className="textbox" /></div>
                            <span className="column2">PTT Chat on TalkGroups with Radio Interoperability - $10/month per user</span>
                            <span className="column3">$30.00</span>
                        </div>
                        <div className="row empty"></div>
                        <div className="app-header"><i className="fa fa-chevron-down"></i> Group Video Connect</div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">License</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="3" type="text" className="textbox" /></div>
                            <span className="column2">Free License - $0/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="2" type="text" className="textbox" /></div>
                            <span className="column2">Free License - $5/month per user</span>
                            <span className="column3">$10.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">Add ons</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="3" type="text" className="textbox" /></div>
                            <span className="column2">PTT Chat on TalkGroups with Radio Interoperability - $10/month per user</span>
                            <span className="column3">$30.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">Total</span>
                            <span className="column3 big">$80.00</span>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Billing;
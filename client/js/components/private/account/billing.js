/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Actions         = require('../../../actions');

var AuthMixin       = require('../../../mixins/auth');

// React-router variables
var Link            = Router.Link;

var Billing = React.createClass({
    mixins: [AuthMixin],
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
                            <a href="#aphelia"><i className="fa fa-puzzle-piece"></i></a>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1" onClick={this.onApheliaClick}><a href="#aphelia">Aphelia</a></div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link" onClick={this.onUpgradeClick}>Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className={'row'+(this.state.step === 1 ? ' active' : '')}>
                        <div className="profile-pic" onClick={this.onGvcClick} >
                            <a href="#gvc"><i className="fa fa-users"></i></a>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1" onClick={this.onGvcClick}><a href="#gvc">GroupVideoConnect</a></div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link" onClick={this.onUpgradeClick}>Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className={'row'+(this.state.step === 2 ? ' active' : '')}>
                        <div className="profile-pic" onClick={this.onBiocomClick}>
                            <a href="#biocom"><i className="fa fa-shield"></i></a>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1" onClick={this.onBiocomClick}><a href="#biocom">BioConnect</a></div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link" onClick={this.onUpgradeClick}>Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className={'row'+(this.state.step === 3 ? ' active' : '')}>
                        <div className="profile-pic" onClick={this.onR4rClick}>
                            <a href="#r4r"><i className="fa fa-empire"></i></a>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1" onClick={this.onR4rClick}><a href="#r4r">ReportForResults</a></div>
                            <div className="line2">
                                <span>Free</span>
                                <span className="separator"></span>
                                <span className="link" onClick={this.onUpgradeClick}>Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className={'row'+(this.state.step === 4 ? ' active' : '')}>
                        <div className="profile-pic" onClick={this.onCicClick}>
                            <a href="#cic"><i className="fa fa-phone-square"></i></a>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1" onClick={this.onCicClick}><a href="#cic">CiscoInstantConnect</a></div>
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
                        <div className="app-header"><a name="aphelia"><i className="fa fa-chevron-down"></i> Aphelia</a></div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">License</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="1" type="text" className="textbox" /></div>
                            <span className="column2">Free License - $0/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="0" type="text" className="textbox" /></div>
                            <span className="column2">Free License - $5/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">Add ons</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="0" type="text" className="textbox" /></div>
                            <span className="column2">PTT Chat on TalkGroups with Radio Interoperability - $10/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row empty"></div>

                        <div className="app-header"><a name="gvc"><i className="fa fa-chevron-down"></i> Group Video Connec</a></div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">License</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="1" type="text" className="textbox" /></div>
                            <span className="column2">Free License - $0/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="0" type="text" className="textbox" /></div>
                            <span className="column2">Free License - $5/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">Add ons</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="0" type="text" className="textbox" /></div>
                            <span className="column2">PTT Chat on TalkGroups with Radio Interoperability - $10/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>

                        <div className="app-header"><a name="biocom"><i className="fa fa-chevron-down"></i> Bio Connect</a></div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">License</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="1" type="text" className="textbox" /></div>
                            <span className="column2">Free License - $0/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="0" type="text" className="textbox" /></div>
                            <span className="column2">Free License - $5/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">Add ons</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="0" type="text" className="textbox" /></div>
                            <span className="column2">PTT Chat on TalkGroups with Radio Interoperability - $10/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>

                        <div className="app-header"><a name="r4r"><i className="fa fa-chevron-down"></i> Reports for Results</a></div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">License</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="1" type="text" className="textbox" /></div>
                            <span className="column2">Free License - $0/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="0" type="text" className="textbox" /></div>
                            <span className="column2">Free License - $5/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">Add ons</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="0" type="text" className="textbox" /></div>
                            <span className="column2">PTT Chat on TalkGroups with Radio Interoperability - $10/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>

                        <div className="app-header"><a name="cic"><i className="fa fa-chevron-down"></i> Cisco Instant Connect</a></div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">License</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="1" type="text" className="textbox" /></div>
                            <span className="column2">Free License - $0/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="0" type="text" className="textbox" /></div>
                            <span className="column2">Free License - $5/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">Add ons</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="0" type="text" className="textbox" /></div>
                            <span className="column2">PTT Chat on TalkGroups with Radio Interoperability - $10/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">Total</span>
                            <span className="column3 big">$0.00</span>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Billing;

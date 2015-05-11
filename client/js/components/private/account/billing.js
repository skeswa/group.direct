/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router'),
    Navigation      = require('react-router').Navigation;

var Actions         = require('../../../actions');

var AuthMixin       = require('../../../mixins/auth');

// React-router variables
var Link            = Router.Link;

var Billing = React.createClass({
    mixins: [AuthMixin],
    mixins: [Navigation],
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
        this.transitionTo('notice');
    },
    onGvcClick: function() {
        this.setState({
            step: 0
        });
    },
    onGcClick: function() {
        this.setState({
            step: 1
        });
    },
    onCalendarClick: function() {
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
        var apps = [
            {name: 'Video Connect', logo:'gvc'},
            {name: 'Group Connect', logo:'gc'},
            {name: 'Job Scheduler', logo:'calendar'},
            {name: 'Report For Results', logo:'r4r'},
            {name: 'Field Connect', logo:'field-connect'},
            {name: 'School Bus Connect', logo:'sbc'},
            {name: 'Campus Connect', logo:'campus'},
            {name: 'Bio Connect', logo:'biocom'},
            {name: 'Protect & Connect', logo:'holster'},
            {name: 'Factory Connect', logo:'factory'}
        ];
        var appElements = []
        for(var i=0; i<apps.length; i++){
            var url = '../static/img/'+(apps[i].logo)+'.png';
            appElements.push(
                <div className="row">
                    <div className="profile-pic">
                        <img src={url} />
                    </div>
                    <div className="top-text-wrapper">
                        <div className="line1">{apps[i].name}</div>
                        <div className="line2">
                            <span className={(i==4 || i==8 || i==5) ? 'show': 'hide'}>
                                <span>Basic</span>
                                <span className="separator"></span>
                            </span>
                            <a href={(i==4 || i==8) ? '#'+(apps[i].logo) : '/contact'} className="link">{(i==4 || i==8) ? 'Upgrade License' : 'Contact us'}</a>
                        </div>
                    </div>
                </div>
            );
        }
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
                    {appElements}
                    {/*<div className={'row'+(this.state.step === 1 ? ' active' : '')}>
                        <div className="profile-pic" onClick={this.onGcClick} >
                            <a href="#gc"><img src='../static/img/gc.png' /></a>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1" onClick={this.onGcClick}>Group Connect</div>
                            <div className="line2">
                                <span>Basic</span>
                                <span className="separator"></span>
                                <Link to="contact" className="link">Contact us</Link>
                            </div>
                        </div>
                    </div>
                    <div className={'row'+(this.state.step === 2 ? ' active' : '')}>
                        <div className="profile-pic" onClick={this.onCalendarClick}>
                            <a href="#calendar"><img src='../static/img/calendar.png' /></a>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1" onClick={this.onCalendarClick}>Job Scheduler</div>
                            <div className="line2">
                                <span>Basic</span>
                                <span className="separator"></span>
                                <Link to="contact" className="link">Contact us</Link>
                            </div>
                        </div>
                    </div>
                    <div className={'row'+(this.state.step === 3 ? ' active' : '')}>
                        <div className="profile-pic" onClick={this.onR4rClick}>
                            <a href="#r4r"><img src='../static/img/r4r.png' /></a>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1" onClick={this.onR4rClick}>Report For Results</div>
                            <div className="line2">
                                <span>Basic</span>
                                <span className="separator"></span>
                                <Link to="contact" className="link">Contact us</Link>
                            </div>
                        </div>
                    </div>
                    <div className={'row'+(this.state.step === 4 ? ' active' : '')}>
                        <div className="profile-pic" onClick={this.onFcClick}>
                            <a href="#fc"><img src='../static/img/field-connect.png' /></a>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1" onClick={this.onFcClick}><a href="#fc">Field Connect</a></div>
                            <div className="line2">
                                <span>Basic</span>
                                <span className="separator"></span>
                                <span className="link" onClick={this.onUpgradeClick}>Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className={'row'+(this.state.step === 4 ? ' active' : '')}>
                        <div className="profile-pic" onClick={this.onFcClick}>
                            <a href="#fc"><img src='../static/img/sbc.png' /></a>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1" onClick={this.onSbcClick}>School Bus Connect</div>
                            <div className="line2">
                                <span>Basic</span>
                                <span className="separator"></span>
                                <span className="link" onClick={this.onUpgradeClick}>Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className={'row'+(this.state.step === 4 ? ' active' : '')}>
                        <div className="profile-pic" onClick={this.onFcClick}>
                            <a href="#fc"><img src='../static/img/field-connect.png' /></a>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1" onClick={this.onFcClick}><a href="#fc">Field Connect</a></div>
                            <div className="line2">
                                <span>Basic</span>
                                <span className="separator"></span>
                                <span className="link" onClick={this.onUpgradeClick}>Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className={'row'+(this.state.step === 4 ? ' active' : '')}>
                        <div className="profile-pic" onClick={this.onFcClick}>
                            <a href="#fc"><img src='../static/img/field-connect.png' /></a>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1" onClick={this.onFcClick}><a href="#fc">Field Connect</a></div>
                            <div className="line2">
                                <span>Basic</span>
                                <span className="separator"></span>
                                <span className="link" onClick={this.onUpgradeClick}>Upgrade License</span>
                            </div>
                        </div>
                    </div>
                    <div className={'row'+(this.state.step === 4 ? ' active' : '')}>
                        <div className="profile-pic" onClick={this.onFcClick}>
                            <a href="#fc"><img src='../static/img/field-connect.png' /></a>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1" onClick={this.onFcClick}><a href="#fc">Field Connect</a></div>
                            <div className="line2">
                                <span>Basic</span>
                                <span className="separator"></span>
                                <Link to="contact" className="link">Contact us</Link>
                            </div>
                        </div>
                    </div>*/}
                </div>
                <div className="right wide">
                    <div className="billing">
                        <div className="app-header"><a name="field-connect"><i className="fa fa-chevron-down"></i> Field Connect</a></div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">License</span>
                        </div>
                        <div className="row">
                            <div className="column1 red"><input value="1" type="text" className="textbox" /></div>
                            <div className="column2">
                                <div className="name">Basic License - $0/month per user</div>
                                <div className="description">
                                    Description: This is the description of the services included in the basic license package.
                                </div>
                            </div>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="0" type="text" className="textbox" /></div>
                            <div className="column2">
                                <div className="name">Basic License - $5/month per user</div>
                                <div className="description">
                                    Description: This is the description of the services included in the basic license package.
                                </div>
                            </div>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">Add ons</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="0" type="text" className="textbox" /></div>
                            <div className="column2">
                                <div className="name">PTT Chat on TalkGroups with Radio Interoperability - $10/month per user</div>
                                <div className="description">
                                    Description: This is the description of the services included in the basic license package.
                                </div>
                            </div>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row empty"></div>

                        <div className="app-header"><a name="holster"><i className="fa fa-chevron-down"></i> Protect & Connect</a></div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">License</span>
                        </div>
                        <div className="row">
                            <div className="column1 red"><input value="1" type="text" className="textbox" /></div>
                            <div className="column2">
                                <div className="name">Basic License - $0/month per user</div>
                                <div className="description">
                                    Description: This is the description of the services included in the basic license package.
                                </div>
                            </div>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="0" type="text" className="textbox" /></div>
                            <div className="column2">
                                <div className="name">Basic License - $5/month per user</div>
                                <div className="description">
                                    Description: This is the description of the services included in the basic license package.
                                </div>
                            </div>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">Add ons</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="0" type="text" className="textbox" /></div>
                            <div className="column2">
                                <div className="name">PTT Chat on TalkGroups with Radio Interoperability - $10/month per user</div>
                                <div className="description">
                                    Description: This is the description of the services included in the basic license package.
                                </div>
                            </div>
                            <span className="column3">$0.00</span>
                        </div>


                        {/*<div className="app-header"><a name="biocom"><i className="fa fa-chevron-down"></i> Bio Connect</a></div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">License</span>
                        </div>
                        <div className="row">
                            <div className="column1 red"><input value="1" type="text" className="textbox" /></div>
                            <span className="column2">Basic License - $0/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="0" type="text" className="textbox" /></div>
                            <span className="column2">Basic License - $5/month per user</span>
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
                            <div className="column1 red"><input value="1" type="text" className="textbox" /></div>
                            <span className="column2">Basic License - $0/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="0" type="text" className="textbox" /></div>
                            <span className="column2">Basic License - $5/month per user</span>
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
                            <div className="column1 red"><input value="1" type="text" className="textbox" /></div>
                            <span className="column2">Basic License - $0/month per user</span>
                            <span className="column3">$0.00</span>
                        </div>
                        <div className="row">
                            <div className="column1"><input value="0" type="text" className="textbox" /></div>
                            <span className="column2">Basic License - $5/month per user</span>
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
                        </div>*/}

                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Billing;
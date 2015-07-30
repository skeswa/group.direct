/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router'),
    Navigation      = require('react-router').Navigation;

var Actions         = require('../../../actions');

var AuthMixin       = require('../../../mixins/auth'),
    AppStateStore   = require('../../../stores/appstate'),
    AccountService  = require('../../../services/account'),
    ProfileService  = require('../../../services/profile');

// React-router variables
var Link            = Router.Link;

var Billing = React.createClass({
    mixins: [AuthMixin],
    mixins: [Navigation],
    getInitialState: function() {
        return {
            toastMessage: undefined,
            fc: undefined,
            vc: undefined,
            sbc: undefined,
            cic: undefined,
            apps: []
        };
    },
    componentDidMount: function() {
        Actions.changePageTitle('Billing');
        var component = this;
        ProfileService.getApps(
            AppStateStore.getSessionData().companyId,
            AppStateStore.getSessionData().sessionToken,
            function(res) {
                if(res.body.ResultSet) {
                    var appStore = res.body.ResultSet;
                    for(var i=0; i<appStore.length; i++) {
                        switch (appStore[i].AppId) {
                            case 9:
                                component.setState({vc: 1});
                                component.state.apps.push(appStore[i].AppId);
                                break;
                            case 11:
                                component.setState({sbc: 1});
                                component.state.apps.push(appStore[i].AppId);
                                break;
                            case 12:
                                component.setState({fc: 1});
                                component.state.apps.push(appStore[i].AppId);
                                break;
                            case 16:
                                component.setState({cic: 1});
                                component.state.apps.push(appStore[i].AppId);
                                break;
                        }
                    }
                    console.log("Success at getApps", JSON.stringify(component.state.apps));
                } else {
                    console.log("Error at getApps", res.Text);
                }
            });
    },
    componentWillUnmount: function() {
    },
    onVc: function(event) {
        this.setState({
            vc: event.target.value
        });
    },
    onFc: function(event) {
        this.setState({
            fc: event.target.value
        });
    },
    onSbc: function(event) {
        this.setState({
            sbc: event.target.value
        });
    },
    onCic: function(event) {
        this.setState({
            cic: event.target.value
        });
    },
    onUpdateClick: function() {
        console.log("apps", JSON.stringify(this.state.apps));
        var apps = [
                {name: 'vc', id: 9},
                {name: 'sbc', id: 11},
                {name: 'fc', id: 12},
                {name: 'cic', id: 16}
            ];
        var match = 0;
        for (i=0; i<apps.length; i++) {
            console.log(apps[i].name, this.state[apps[i].name]);
            if (this.state[apps[i].name] == 1) {
                if (this.state.apps.length == 0) {
                    console.log("Here", this.state.apps.length);
                    this.state.apps.push(apps[i].id);
                    this.forceUpdate();
                    console.log("current apps", JSON.stringify(this.state.apps));
                } else {
                    for (j=0; j<this.state.apps.length; j++) {
                        if (this.state.apps[j] == apps[i].id) {
                            console.log("spliced", apps[i].name);
                            this.state.apps.splice(j, 1);
                            this.forceUpdate();
                            console.log("current apps", JSON.stringify(this.state.apps));
                            match = 1;
                        }
                    }
                    if (!match) {
                            console.log("pushed", apps[i].name);
                            this.state.apps.push(apps[i].id);
                            this.forceUpdate();
                            console.log("current apps", JSON.stringify(this.state.apps));
                    }
                match = 0;
                }
            }
        }
        var component = this;
        AccountService.associateApps(
            this.state.apps,
            AppStateStore.getSessionData().companyId,
            AppStateStore.getSessionData().sessionToken,
            function(res){
                if (res.body.Result) {
                    component.setState({toastMessage: "Updated Successfully"});
                    console.log("Updated Successfully");
                } else {
                    component.setState({toastMessage: "Somehting went wrong!"});
                    console.log('Error at associateApps', res.text);
                }
            });

        console.log("final apps", JSON.stringify(this.state.apps));
    },
    /*onUpgradeClick: function() {
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
    },*/
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
                </div>
                <div className="right wide">
                    <div className="billing">
                        <div className="app-header"><a name="field-connect"><i className="fa fa-chevron-down"></i> Field Connect</a></div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">License</span>
                        </div>
                        <div className="row">
                            <div className="column1 red"><input value={this.state.fc} type="text" className="textbox" onChange={this.onFc}/></div>
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

                        <div className="app-header"><a name="holster"><i className="fa fa-chevron-down"></i> Video Connect</a></div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">License</span>
                        </div>
                        <div className="row">
                            <div className="column1 red"><input value={this.state.vc} type="text" className="textbox" onChange={this.onVc}/></div>
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


                        <div className="app-header"><a name="biocom"><i className="fa fa-chevron-down"></i> School Bus Connect</a></div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">License</span>
                        </div>
                        <div className="row">
                            <div className="column1 red"><input value={this.state.sbc} type="text" className="textbox" onChange={this.onSbc}/></div>
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

                       {/* <div className="app-header"><a name="r4r"><i className="fa fa-chevron-down"></i> Reports for Results</a></div>
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
                        </div>*/}

                        <div className="app-header"><a name="cic"><i className="fa fa-chevron-down"></i> Cisco Instant Connect</a></div>
                        <div className="row">
                            <div className="column1"></div>
                            <span className="column2 caps">License</span>
                        </div>
                        <div className="row">
                            <div className="column1 red"><input value={this.state.cic} type="text" className="textbox" onChange={this.onCic} /></div>
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
                        </div>
                    </div>
                    <button id="update-button" onClick={this.onUpdateClick}>Update</button>
                    <div className={'flash' + (this.state.toastMessage ? ' visible' : '')}>
                        {this.state.toastMessage}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Billing;
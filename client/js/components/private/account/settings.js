/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Actions         = require('../../../actions');

var AuthMixin       = require('../../../mixins/auth');

// React-router variables
var Link            = Router.Link;

var Settings = React.createClass({
    mixins: [AuthMixin],
    getInitialState: function() {
        return {
            // userName: AppStateStore.getSessionData().userName,
            //firstName: AppStateStore.getSessionData().firstName,
            //lastName: AppStateStore.getSessionData().lastName
        };
    },
    componentDidMount: function() {
        Actions.changePageTitle('Settings');
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div className="tab-content">
                <div className="left wide">
                    <div className="subtitle">Password</div>
                    <div className="form">
                        <div className="field">
                            <div className="label">Current</div>
                            <input type="text" className="textbox" value={this.state.firstName} onChange={this.onFirstNameChanged}/>
                        </div>
                        <div className="field">
                            <div className="label">New</div>
                            <input type="text" className="textbox" value={this.state.lastName} onChange={this.onLastNameChanged}/>
                        </div>
                        <div className="field">
                            <div className="label">Confirm new</div>
                            <input type="text" className="textbox" value={this.state.email} onChange={this.onEmailChanged}/>
                        </div>
                        <div className="field btn">
                        <div className="label"></div>
                            <Link to="about" className="button">Save</Link>
                        </div>
                    </div>
                </div>
                <div className="right narrow">
                    <div className="subtitle">Notification</div>
                    <div className="field">
                        <div className="label">Send email</div>
                            <Link to="about" className="button">Once an hour  <i className="fa fa-chevron-down"></i> </Link>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Settings;

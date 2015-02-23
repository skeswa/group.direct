/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Actions         = require('../../../actions'),
    ProfileService  = require('../../../services/profile'),
    AppStateStore   = require('../../../stores/appstate'),
    Validator       = require('validator');

var AuthMixin       = require('../../../mixins/auth');

// React-router variables
var Link            = Router.Link;

var Settings = React.createClass({
    mixins: [AuthMixin],
    getInitialState: function() {
        return {
            toastMessage: undefined,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        };
    },
    componentDidMount: function() {
        Actions.changePageTitle('Settings');
    },
    componentWillUnmount: function() {
    },
    onCurrentChanged: function(event){
        this.setState({
            toastMessage: undefined,
            currentPassword: event.target.value
        });
    },
    onNewChanged: function(event){
        this.setState({
            toastMessage: undefined,
            newPassword: event.target.value
        });
    },
    onConfirmNewChanged: function(event){
        this.setState({
            toastMessage: undefined,
            confirmPassword: event.target.value
        });
    },
    onSaveClick: function() {
        var component = this;
        if (this.state.currentPassword == '' || this.state.newPassword == '' || this.state.confirmPassword == ''){
            this.setSate({
                toastMessage: 'All fields are required.'
            });
        } else if (this.state.newPassword != this.state.confirmPassword) {
            this.setSate({
                toastMessage: 'Passwords did not match.',
                confirmPassword: ''
            });
        } else if (!Validator.matches(this.state.newPassword, /((?=.*\d)(?=.*[a-z]).{6,20})/)) {
                this.setState({
                    toastMessage: 'Password must have one digit, lowercase letter and be between 6 and 20 characters long',
                    newPassword: '',
                    confirmPassword: ''
                });
                // Focus and clear the password box
                this.refs.newPassword.getDOMNode().focus();
                return;
        } else {
            ProfileService.updatePassword(
                AppStateStore.getSessionData().id,
                this.state.currentPassword,
                this.state.newPassword,
                AppStateStore.getSessionData().sessionToken,
                function (res) {
                    if(res.ok) {
                        //Everything went smoothly
                        if(res.body.Result) {
                            component.setState({
                                toastMessage: 'Password updated successfully.',
                                currentPassword: '',
                                newPassword: '',
                                confirmPassword: ''
                            });
                            console.log('Response from udpatePassword', JSON.stringify(res.body));
                        } else {
                            component.setState({
                                toastMessage: 'Current password is not correct.',
                                currentPassword: ''
                            });
                            this.refs.newPassword.getDOMNode().focus();
                            console.log('Response from updatePassword', res.body.InfoMessages[0].Text)
                        }
                    } else {
                        //Something went wrong
                        console.log('Error at udpatePassword', res.Text);
                    }
                });
        }
    },
    render: function() {
        return (
            <div className="tab-content">
                <div className="left wide">
                    <div className="subtitle">Password</div>
                    <div className="form">
                        <div className="field">
                            <div className="label">Current</div>
                            <input type="password" id="currentPassword" ref="currentPassword" className="textbox" value={this.state.currentPassword} onChange={this.onCurrentChanged}/>
                        </div>
                        <div className="field">
                            <div className="label">New</div>
                            <input type="password" id="newPassword" ref="newPassword" className="textbox" value={this.state.newPassword} onChange={this.onNewChanged}/>
                        </div>
                        <div className="field">
                            <div className="label">Confirm new</div>
                            <input type="password" className="textbox" id="confirmPassword" ref="confirmPassword" value={this.state.confirmPassword} onChange={this.onConfirmNewChanged}/>
                        </div>
                        <div className={'flash' + (this.state.toastMessage ? ' visible' : '')}>
                            {this.state.toastMessage}
                        </div>
                        <div className="field btn">
                        <div className="label"></div>
                            <button id="save-button" type="button" className="button" onClick={this.onSaveClick}>Save</button>
                        </div>
                    </div>
                </div>
                <div className="right narrow">
                    <div className="subtitle">Notification</div>
                    <div className="field">
                        <div className="label">Send email</div>
                            <Link to="notice" className="button">Once an hour  <i className="fa fa-chevron-down"></i> </Link>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Settings;

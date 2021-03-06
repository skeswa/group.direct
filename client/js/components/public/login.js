/** @jsx React.DOM */
var React       = require('react'),
    Router          = require('react-router');

var AuthService = require('../../services/auth'),
    ProfileService = require('../../services/profile'),
    Actions     = require('../../actions'),
    Navigation  = require('react-router').Navigation,

    Header      = require('./header');

// React-router variables
var Link            = Router.Link;

var Login = React.createClass({
    mixins: [Navigation],
    getInitialState: function() {
        return {
            toastMessage: undefined,
            userName: '',
            password: '',
            waiting: false
        };
    },
    componentDidMount: function() {
        Actions.changePageTitle('Log In');
    },
    onUserNameUpdated: function(event) {
        this.setState({
            userName: event.target.value
        });
    },
    onPasswordUpdated: function(event) {
        this.setState({
            password: event.target.value
        });
    },
    onSubmitClicked: function() {
        this.attemptLogin();
    },
    onPasswordKeyPress: function(event) {
        if (event.keyCode === 13) {
            // Enter was pressed - submit the form
            this.attemptLogin();
        }
    },
    attemptLogin: function() {
        if (this.state.waiting) return;
        else {
            if (this.state.userName.trim() === '') {
                this.setState({
                    toastMessage: 'Those aren\'t real credentials. Don\'t be silly.'
                });
                return;
            }
            // Start waiting
            this.setState({
                waiting: true,
                toastMessage: undefined
            });
            // Send the login request
            var component = this,
                sessionData = [];
            AuthService.login(this.state.userName, this.state.password, function(err, res) {
                if (err) {
                    // There was an issue with the connection
                    component.setState({
                        waiting: false,
                        password: '',
                        toastMessage:
                            'There was a problem connecting to the server. ' +
                            'Check your connection status and try again.'
                    });
                } else {
                    if (!res.body.Result) { //TODO: Implement (res.status === 401) {
                        // Bad credentials
                        component.setState({
                            waiting: false,
                            password: '',
                            toastMessage: 'The credentials you provided were invalid. Feel free to try again.'
                        }, function() {
                            // Focus and clear the password box
                            component.refs.password.getDOMNode().focus();
                        });
                        return;
                    } else if (res.status === 200) {
                        var self    = component,
                            timer   = null,
                            logoUrl = '../static/img/ic_aphelia.png';

                        sessionData.push({
                            id: res.body.Result.Id,
                            firstName: res.body.Result.FirstName,
                            lastName: res.body.Result.LastName,
                            contactNumber: res.body.Result.ContactNumber,
                            email: res.body.Result.Email,
                            addressId: res.body.Result.AddressId,
                            picture: res.body.Result.ProfilePicture,
                            sessionToken: res.body.Result.SessionToken,
                            userName: res.body.Result.UserName,
                            companyId: res.body.Result.CompanyId,
                            userTypeId: res.body.Result.UserTypeId,
                            companyName: '',
                            logoUrl: logoUrl,
                            roles: res.body.Result.AppRoles
                        });

                        // We have to declare that we're logged in now :)
                        //Actions.declareLoggedIn(sessionData[0]);
                        // console.log("2", JSON.stringify(sessionData));

                        ProfileService.getCompanyById(
                            res.body.Result.CompanyId,
                            res.body.Result.SessionToken,
                            function (res) {
                                if(res.body.Result) {
                                    sessionData[0].companyName = res.body.Result.Name;
                                    sessionData[0].logoUrl     = logoUrl;

                                    Actions.declareLoggedIn(sessionData[0]);
                                    console.log("Success at getCompanyById", JSON.stringify(sessionData));
                                timer = setTimeout(function() {
                                    if (sessionData[0].UserTypeId == 1) {
                                        component.transitionTo('company');
                                    } else {
                                        component.transitionTo('apps');
                                    }
                                }, 1);

                                } else {
                                    console.log("Error at getCompanyById", res.text);
                                }
                        });

                        // Move to the account screen
                        console.log('userId', res.body.Result.Id);
                        console.log("CompanyId", res.body.Result.CompanyId);
                        console.log('sessionToken', res.body.Result.SessionToken);

                    } else {
                        // Stop waiting
                        component.setState({
                            waiting: false,
                            toastMessage:
                                'There is was internal problem with the server. ' +
                                'If you don\'t mind, shoot us an email at if this keeps happening.'
                        });
                    }
                }
            });
        }
    },
    render: function() {
        return (
            <div id="login" className="page">
                <Header />
                <div className="spotlight"/>
                <div id="content">
                    <div className="card">
                        <div className="wrapper">
                            <h1>
                                <span className={this.state.waiting ? 'hidden' : ''}>Log In</span>
                                <i className={'fa fa-refresh fa-spin' + (this.state.waiting ? '' : ' hidden')}></i>
                            </h1>
                            <div className="divider"/>
                            <div className="form">
                                <div className="label">Username</div>
                                <input type="text" className="textbox" ref="username" id="username-textbox" value={this.state.userName} onChange={this.onUserNameUpdated} disabled={this.state.waiting}/>
                                <div className="label">Password</div>
                                <input type="password" className="textbox" ref="password" id="password-textbox" value={this.state.password} onChange={this.onPasswordUpdated} onKeyDown={this.onPasswordKeyPress} disabled={this.state.waiting}/>
                            </div>
                            <div className={'flash' + (this.state.toastMessage ? ' visible' : '')}>
                                {this.state.toastMessage}
                            </div>
                            <p>If you have forgotten your password, click <Link to="forgot" className="link">this link</Link>.</p>
                            <div className="divider"/>
                            <button id="login-button" onClick={this.onSubmitClicked} disabled={this.state.waiting}>Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Login;

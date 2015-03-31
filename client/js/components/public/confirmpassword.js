/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions'),
    Validator       = require('validator'),
    AuthService     = require('../../services/auth');


var Header          = require('./header');

// React-router variables
var Link            = Router.Link;

var url             = Util.url;

var steps = [
    // First Step
    function (component) {
        return(
            <div>
                <div className="form">
                    <div className="label">Password</div>
                    <input type="password" className="textbox" ref="password" id="password-textbox" value={component.state.password} onChange={component.onPasswordUpdated} disabled={component.state.waiting}/>
                    <div className="label">Confirm Password</div>
                    <input type="password" className="textbox" ref="confirm-password" id="confirm-password-textbox" value={component.state.confirmPassword} onChange={component.onConfirmPasswordUpdated} onKeyDown={component.onEnterKeyPress} disabled={component.state.waiting}/>
                    <div className={'flash' + (component.state.toastMessage ? ' visible' : '')}>
                        {component.state.toastMessage}
                    </div>
                </div>
                <div className="divider"/>
                <button id="login-button" onClick={component.onSubmitClicked} disabled={component.state.waiting}>Reset Password</button>
            </div>
        );
    },
    // Second Step
    function (component) {
        return (
            <div className="wrapper">You have successfully changed your password. <Link to="signin">Click here to go back to login page.</Link></div>
        );
    },
    // Third Step
    function (component) {
        return (
            <div className="wrapper">Something went wrong. Please try again later.</div>
        );
    }
];

var ConfirmPassword = React.createClass({
    mixins: [ Router.State ],
    getInitialState: function() {
        return {
            toastMessage: undefined,
            password: '',
            confirmPassword: '',
            waiting: false,
            step: 0
        };
    },
    componentDidMount: function() {
        Actions.changePageTitle('Confirm Password');
    },
    componentWillUnmount: function() {
    },
    onPasswordUpdated: function(event) {
        this.setState({
            toastMessage: undefined,
            password: event.target.value
        });
    },
    onConfirmPasswordUpdated: function(event) {
        this.setState({
            toastMessage: undefined,
            confirmPassword: event.target.value
        });
    },
    onEnterKeyPress: function(event) {
        if (event.keyCode === 13) {
            // Enter was pressed - submit the form
            this.submitRequest();
        }
    },
    onSubmitClicked: function() {
        this.submitRequest();
    },
    submitRequest: function() {
        //get token from query string
        var token = url.getParameterByName('token');
        var password = this.state.password;

        var component = this;

        //this.validatePassword();
        if (!Validator.matches(password, /((?=.*\d)(?=.*[a-z]).{6,20})/)) {
            this.setState({
                toastMessage: 'Password must have one digit, lowercase letter and be between 6 and 20 characters long',
                password: '',
                confirmPassword: ''
            });
            // Focus and clear the password box
            this.refs.password.getDOMNode().focus();
            return;
        } else if (this.state.confirmPassword != this.state.password) {
            this.setState({
                toastMessage: 'Passwords did not match.',
                confirmPassword: ''
            });
            return;
            // Focus and clear the password box
            //this.refs.confirm-password.getDOMNode().focus();
        } else {
            AuthService.resetPassword(
                token,
                password,
                function(res) {
                    if (res.ok) {
                        //everything went fine
                        if (res.body.Result) {
                            console.log("Response from resetPassword", JSON.stringify(res.body));
                            component.setState({
                                step: 1
                            });
                        } else {
                            //something went wrong
                            component.setState({
                                toastMessage: res.body.InfoMessages[0].Text
                            });
                        }
                    } else {
                        //something went wrong
                        component.setState({
                            step: 2
                        });
                    }
            });
        }
    },
    render: function() {
        return (
            <div id="confirm-password" className="page">
                <Header />
                <div className="spotlight"/>
                <div id="content">
                    <div className="card">
                        <div className="wrapper">
                            <h1>
                                <span className={this.state.waiting ? 'hidden' : ''}>Confirm Password</span>
                                <i className={'fa fa-refresh fa-spin' + (this.state.waiting ? '' : ' hidden')}></i>
                            </h1>
                            <div className="divider"/>
                            {(steps[this.state.step])(this)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ConfirmPassword;
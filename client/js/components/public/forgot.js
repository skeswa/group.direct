/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions'),
    AuthService     = require('../../services/auth'),
    Validator       = require('validator');

var Header          = require('./header');

// React-router variables
var Link            = Router.Link;

var steps = [
    // First Step
    function (component) {
        return(
            <div>
                <div>Enter your email address and we’ll send you a link to reset your password. <br /></div>

                <div className="form">
                    <div className="label">Email</div>
                    <input type="text" className="textbox" ref="email" id="email-textbox" value={component.state.email} onChange={component.onEmailUpdated} disabled={component.state.waiting}/>
                </div>
                <div className={'flash' + (component.state.toastMessage ? ' visible' : '')}>
                    {component.state.toastMessage}
                </div>
                <div className="divider"/>
                <button type="submit" id="request-password-button" onClick={component.onSubmitClicked} disabled={component.state.waiting}>Request new password</button>
            </div>
        );
    },
    // Third Step
    function (component) {
        return (
                <div className="wrapper">Help is on the way.</div>
        );
    }
];

var Forgot = React.createClass({
    getInitialState: function() {
        return {
            toastMessage: undefined,
            step: 0,
            email: '',
            waiting: false
        };
    },
    componentDidMount: function() {
        Actions.changePageTitle('Reset Password');
    },
    componentWillUnmount: function() {
    },
    onEmailUpdated: function(event) {
        this.setState({
            email: event.target.value,
            toastMessage: undefined
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
        var email = this.state.email;
        var component = this;

        if (!Validator.isEmail(email)) {
            this.setState({
                toastMessage: 'Must be a correctly formatted email address'
            });
        } else {
            AuthService.requestResetPassword(email, function(res) {
                if (res.ok) {
                    // This means everything went just fine
                    if (res.body.Result){
                        component.setState({
                            step: 1
                        });
                    } else {
                        component.setState({
                            toastMessage: res.body.InfoMessages[0].Text
                        });
                    }
                    console.log('Response from requestResetPassword: ', JSON.stringify(res.body));
                } else {
                    console.log('Error from requestResetPassword: ', res.text);
                }
            });
        }
    },
    render: function() {
        return (
            <div id="reset-password" className="page">
                <Header />
                <div className="spotlight"/>
                <div id="content">
                    <div className="card">
                        <div className="wrapper">
                            <h1>
                                <span className={this.state.waiting ? 'hidden' : ''}>Reset Password</span>
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

module.exports = Forgot;
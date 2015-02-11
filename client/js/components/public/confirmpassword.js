/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions');


var Header          = require('./header');

// React-router variables
var Link            = Router.Link;

var ConfirmPassword = React.createClass({
    mixins : [Router.Navigation],
    getInitialState: function() {
        return {
            toastMessage: undefined,
            password: '',
            confirmPassword: '',
            waiting: false
        };
    },
    componentDidMount: function() {
        Actions.changePageTitle('Confirm Password');
    },
    componentWillUnmount: function() {
    },
    onPasswordUpdated: function(event) {
        this.setState({
            password: event.target.value
        });
    },
    onConfirmPasswordUpdated: function(event) {
        this.setState({
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
        var email = this.state.email;
        var component = this;

        if (this.state.confirmPassword != this.state.password) {
            this.setState({
                toastMessage: 'Passwords did not match.',
                password: '',
                confirmPassword: ''
            });
            // Focus and clear the password box
            this.refs.password.getDOMNode().focus();
        } else {
            this.transitionTo('signin');
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
                            <div className="form">
                                <div className="label">Password</div>
                                <input type="password" className="textbox" ref="password" id="password-textbox" value={this.state.password} onChange={this.onPasswordUpdated} disabled={this.state.waiting}/>
                                <div className="label">Confirm Password</div>
                                <input type="password" className="textbox" ref="confirm-password" id="confirm-password-textbox" value={this.state.confirmPassword} onChange={this.onConfirmPasswordUpdated} onKeyDown={this.onEnterKeyPress} disabled={this.state.waiting}/>
                                <div className={'flash' + (this.state.toastMessage ? ' visible' : '')}>
                                    {this.state.toastMessage}
                                </div>
                            </div>
                            <div className="divider"/>
                            <button id="login-button" onClick={this.onSubmitClicked} disabled={this.state.waiting}>Reset Password</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ConfirmPassword;
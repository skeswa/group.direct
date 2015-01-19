/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions');

var Header          = require('./header');

// React-router variables
var Link            = Router.Link;

var steps = [
    // First Step
    (
        <div className="form">
            <div className="field left">
                <div className="label">First Name</div>
                <input type="text" className="textbox" value={this.state['firstName']} onChange={this.generateTextListener('firstName')}/>
            </div>
            <div className="field right">
                <div className="label">Last Name</div>
                <input type="text" className="textbox" value={this.state['lastName']} onChange={this.generateTextListener('lastName')}/>
            </div>
            <div className="field left">
                <div className="label">Username</div>
                <input type="text" className="textbox" value={this.state['userName']} onChange={this.generateTextListener('userName')}/>
            </div>
            <div className="field right">
                <div className="label">Email</div>
                <input type="email" className="textbox" value={this.state['email']} onChange={this.generateTextListener('email')}/>
            </div>
            <div className="field left">
                <div className="label">Password</div>
                <input type="password" className="textbox" value={this.state['password']} onChange={this.generateTextListener('password')}/>
            </div>
            <div className="field right">
                <div className="label">Confirm Password</div>
                <input type="password" className="textbox" value={this.state['confirmPassword']} onChange={this.generateTextListener('confirmPassword')}/>
            </div>
        </div>
    ),
    // Second Step
    (
        <div/>
    )
];

var Register = React.createClass({
    getInitialState: function() {
        return {
            toastMessage: undefined,
            userName: '',
            password: '',
            waiting: false
        };
    },
    componentDidMount: function() {
        Actions.changePageTitle('Register');
    },
    componentWillUnmount: function() {
    },
    generateTextListener: function(name) {
        return function(event) {
            var obj = {};
            obj[name] = event.target.value;
            this.setState(obj);
        };
    },
    render: function() {
        return (
            <div id="register" className="page">
                <Header />
                <div className="spotlight"/>
                <div id="content">
                    <div className="card">
                        <div className="wrapper">
                            <h1>
                                <span className={this.state.waiting ? 'hidden' : ''}>Quick Sign-Up</span>
                                <i className={'fa fa-refresh fa-spin' + (this.state.waiting ? '' : ' hidden')}></i>
                            </h1>
                            <div className="divider"/>
                            <div className="step-holder">
                                <div className="step one">
                                </div>
                                <div className="footer">
                                    <div className="divider"/>
                                    <button id="back-button" onClick={this.onSubmitClicked} disabled={this.state.waiting}>Back</button>
                                    <button id="next-button" onClick={this.onSubmitClicked} disabled={this.state.waiting}>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Register;

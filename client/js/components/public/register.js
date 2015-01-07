/** @jsx React.DOM */
var React       = require('react');

var Actions     = require('../../actions'),
    Dropdown    = require('../widgets/dropdown');

var Register = React.createClass({
    constants: {
        majors: {
            'is&t': 'Information Science & Technology',
            'cs': 'Computer Science',
            'cs&m': 'Computer Science & Mathematics',
            'ee': 'Electrical Engineering',
            'ce': 'Computer Engineering',
            'mis': 'Management Information Systems',
            'other': 'Other'
        },
        graduationYears: (function() {
            var years = {}, year = new Date().getFullYear();
            for (var i = 0; i < 8; i++) {
                years[year + i] = (year + i) + '';
            }
            return years;
        })(),
        partCount: 3
    },
    getInitialState: function() {
        return {
            toastMessage: undefined,
            userName: '',
            password: '',
            part: 0,
            waiting: false
        };
    },
    componentDidMount: function() {
        Actions.changePageTitle('Register');
    },
    generateTextListener: function(id) {
        var component = this;
        return function(event) {
            var delta = {};
            delta[id] = (event ? (event.target ? event.target.value : '') : '');
            component.setState(delta);
        };
    },
    generateDropdownListener: function(id) {
        var component = this;
        return function(newValue) {
            var delta = {};
            delta[id] = newValue;
            component.setState(delta);
        };
    },
    onSubmitClicked: function() {
    },
    onPasswordKeyPress: function(event) {
        if (event.keyCode === 13) {
            // Enter was pressed - submit the form
        }
    },
    render: function() {
        return (
            <div id="register" className="page">
                <div className="card">
                    <div className="wrapper">
                        <h1>
                            <span className={this.state.waiting ? 'hidden' : ''}>Register</span>
                            <i className={'fa fa-refresh fa-spin' + (this.state.waiting ? '' : ' hidden')}></i>
                        </h1>
                        <div className="divider"/>
                        <div className="form" style={{display: (this.state.part === 0 ? '' : ' hidden')}}>
                            <div className="field-group">
                                <div className="label">First Name</div>
                                <input
                                    type="text"
                                    value={this.state['firstName']}
                                    onChange={this.generateTextListener('firstName')}
                                    disabled={this.state.waiting} />
                            </div>
                            <div className="field-group">
                                <div className="label">Last Name</div>
                                <input
                                    type="text"
                                    value={this.state['lastName']}
                                    onChange={this.generateTextListener('lastName')}
                                    disabled={this.state.waiting} />
                            </div>
                            <div className="field-group">
                                <div className="label">Personal Email</div>
                                <input
                                    type="text"
                                    value={this.state['personalEmailAddress']}
                                    onChange={this.generateTextListener('personalEmailAddress')}
                                    disabled={this.state.waiting} />
                            </div>
                            <div className="field-group">
                                <div className="label">Temple Email</div>
                                <input
                                    type="text"
                                    value={this.state['templeEmailAddress']}
                                    onChange={this.generateTextListener('templeEmailAddress')}
                                    disabled={this.state.waiting} />
                            </div>
                            <div className="field-group">
                                <div className="label">Major</div>
                                <Dropdown
                                    map={this.constants.majors}
                                    value={this.state['major']}
                                    onChange={this.generateDropdownListener('major')}
                                    disabled={this.state.waiting} />
                            </div>
                            <div className="field-group">
                                <div className="label">Graduation Year</div>
                                <Dropdown
                                    map={this.constants.graduationYears}
                                    value={this.state['graduationYear']}
                                    onChange={this.generateDropdownListener('graduationYear')}
                                    disabled={this.state.waiting} />
                            </div>
                            <div className="field-group full">
                                <div className="label">Personal Bio</div>
                                <textarea
                                    rows="2"
                                    value={this.state['bio']}
                                    onChange={this.generateTextListener('bio')}
                                    disabled={this.state.waiting} />
                            </div>
                        </div>
                        <div className={'flash' + (this.state.toastMessage ? ' visible' : '')}>
                            {this.state.toastMessage}
                        </div>
                        <div className="divider"/>
                        <button
                            id="register-button"
                            className={(this.state.part === (this.constants.partCount - 1)) ? 'finish' : ''}
                            onClick={this.onSubmitClicked}
                            disabled={this.state.waiting}>{(this.state.part === (this.constants.partCount - 1)) ? 'Register' : 'Continue'}</button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Register;

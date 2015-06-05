/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Actions             = require('../../../actions'),
    AppStateStore       = require('../../../stores/appstate'),
    SchoolBusService    = require('../../../services/schoolbusconnect');

var AuthMixin       = require('../../../mixins/auth'),
    ExecutorMixin   = require('../../../mixins/executor');

// React-router variables
var Link            = Router.Link;

var students = [
    {}
];

var steps = [
    //0:view students
    function (component) {
        return (
            <div>
                <div className="row title">
                    <div className="grid narrow"></div>
                    <div className="grid">Name</div>
                    <div className="grid">Address</div>
                    <div className="grid">Class</div>
                    <div className="grid">Bus #</div>
                    <div className="grid">Time</div>
                    <div className="grid">Parents</div>
                </div>
                <div className="row">
                    <div className="grid narrow">
                        <div className="profile-pic">
                            <i className="fa fa-user"></i>
                        </div>
                    </div>
                    <div className="grid">Elon Musk</div>
                    <div className="grid wide">Pretoria, Gauteng, SA</div>
                    <div className="grid">5th Grade</div>
                    <div className="grid">2990</div>
                    <div className="grid">7:00am</div>
                    <div className="grid wide">Maye H., Errol Musk</div>
                </div>
                <div className="row">
                    <div className="grid narrow">
                        <div className="profile-pic">
                            <i className="fa fa-user"></i>
                        </div>
                    </div>
                    <div className="grid">Eron Muss</div>
                    <div className="grid wide">Pretoria, Gauteng, SA</div>
                    <div className="grid">5th Grade</div>
                    <div className="grid">2990</div>
                    <div className="grid">3:00pm</div>
                    <div className="grid wide">Maye H., Errol Muss</div>
                </div>
            </div>
        );
    },
    //1:add students
    function (component) {
        return (
            <div>
                <div className="left narrower">
                    <div className="profile-pic big">
                        <i className="fa fa-user"></i>
                    </div>
                    <div className="label small">Bus Stop</div>
                    <input type="text" className="textbox smaller"  onChange={this.onFirstNameChanged}/>

                    <div className="label small">School Bus ID</div>
                    <input type="text" className="textbox smaller"  onChange={this.onFirstNameChanged}/>

                    <div className="label small">Pick up</div>
                    <input type="text" className="textbox smaller"  onChange={this.onFirstNameChanged}/>

                    <div className="label small">Drop Off</div>
                    <input type="text" className="textbox smaller"  onChange={this.onFirstNameChanged}/>
                </div>
                <div className="form">
                    <div className="field">
                        <div className="label">First name</div>
                        <input type="text" className="textbox"  onChange={this.onFirstNameChanged}/>
                    </div>
                    <div className="field">
                        <div className="label">Student ID</div>
                        <input type="text" className="textbox" onChange={this.onEmailChanged}/>
                    </div>
                    <div className="field">
                        <div className="label">Grade</div>
                        <input type="text" className="textbox"  onChange={this.onLastNameChanged}/>
                    </div>
                    <div className="field">
                        <div className="label">Gender</div>
                        <input type="radio"  name="gender" value="male" /> Male
                        <input type="radio"  name="gender" value="female" /> Female
                    </div>
                    <div className="field">
                        <div className="label">Home Phone</div>
                        <input type="text" className="textbox" onChange={this.onPhoneChanged}/>
                    </div>
                    <div className="field">
                        <div className="label title">Address</div>
                        <input type="text" className="textbox narrow" placeholder="Street" onChange={this.onAddress1Changed}/>
                        <input type="text" className="textbox narrow" placeholder="Apt/Unit" onChange={this.onAddress2Changed}/>
                        <input type="text" className="textbox narrow" placeholder="City" onChange={this.onCityChanged}/>
                        <input type="text" className="textbox narrow" placeholder="State" onChange={this.onProvinceChanged}/>
                        <input type="text" className="textbox narrow" placeholder="Zip" onChange={this.onProvinceChanged}/>
                    </div>
                    <div className="field">
                        <div className="label title">Guardian</div>
                        <input type="text" className="textbox narrow" onChange={this.onAddress1Changed}/>
                        <input type="text" className="textbox small" onChange={this.onAddress2Changed}/>
                        <input type="text" className="textbox small" onChange={this.onCityChanged}/>
                        <input type="text" className="textbox small" onChange={this.onProvinceChanged}/>
                    </div>
                    <div className="field btn" >
                        <div className="label"></div>
                        <button type="submit" id="save-profile-button" className="button" onClick={this.onSubmitClick}>Save</button>
                        {/*<div className={'flash' + (component.state.toastMessage ? ' visible' : '')}>
                            {component.state.toastMessage}
                        </div>*/}
                    </div>
                </div>
            </div>
        );
    },
];

var Students = React.createClass({
    mixins: [
        AuthMixin,
        ExecutorMixin
    ],
    getInitialState: function() {
        return{
            step: 0
        }
    },
    componentDidMount: function() {
        var component   = this;
        Actions.changePageTitle('SchoolBus Connect');
    },
    onRouteClick: function(currentRoute, i, event) {
        this.setState({
        });
    },
    onAddClick: function(event) {
        console.log("ON ADD CLICK");
        this.setState({
            step: 1
        });
    },
    render: function() {
        return (
            <div className="tab-content">
                <div className="left narrow">
                    <input type="text" className="textbox" placeholder="Search students"/>
                    <div className="add-button" onClick={this.onAddClick}>
                        <i className="fa fa-plus"></i>
                    </div>
                </div>
                <div className="right wide">
                    {(steps[this.state.step])(this)}
                </div>
            </div>
        );
    }
});

module.exports = Students;
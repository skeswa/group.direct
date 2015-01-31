/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Actions         = require('../../../actions');

// React-router variables
var Link            = Router.Link;

var Profile = React.createClass({
    getInitialState: function() {
        return {
            //userName: AppStateStore.getSessionData().userName,
            //firstName: AppStateStore.getSessionData().firstName,
            //lastName: AppStateStore.getSessionData().lastName
        };
    },
    componentDidMount: function() {
        Actions.changePageTitle('Profile');
    },
    render: function() {
        return (
            <div className="tab-content">
                <div className="left">
                    <div className="subtitle">Personal Info</div>
                    <div className="form">
                        <div className="field">
                            <div className="label">Name</div>
                            <input type="text" className="textbox" value={this.state.firstName} onChange={this.onFirstNameChanged}/>
                        </div>
                        <div className="field">
                            <div className="label">Address 1</div>
                            <input type="text" className="textbox" value={this.state.lastName} onChange={this.onLastNameChanged}/>
                        </div>
                        <div className="field">
                            <div className="label">Address 2</div>
                            <input type="text" className="textbox" value={this.state.email} onChange={this.onEmailChanged}/>
                        </div>
                        <div className="field">
                             <div className="label">City/State/Zip</div>
                             <input type="text" className="textbox" value={this.state.userName} onChange={this.onUsernameChanged}/>
                        </div>
                        <div className="field">
                            <div className="label">Country</div>
                            <input type="password" className="textbox" value={this.state.password} onChange={this.onPasswordChanged}/>
                        </div>
                        <div className="field">
                            <div className="label">Email</div>
                            <input type="password" className="textbox" value={this.state.confirmPassword} onChange={this.onConfirmPasswordChanged}/>
                        </div>
                        <div className="field btn" >
                            <div className="label"></div>
                            <Link to="about" className="button">Save</Link>
                        </div>
                    </div>
                </div>
                <div className="right narrow">
                    <div className="subtitle">Company</div>
                    <div className="row">
                        <div className="profile-pic">
                            <i className="fa fa-university"></i>
                        </div>
                        <div className="top-text-wrapper">
                            <div className="line1">Group.Direct Demo Company</div>
                            <div className="line2 link">Edit info</div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="top-text-wrapper">
                            <div className="line1"><i className="fa fa-plus-square-o"></i>  Create or Join another company</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Profile;
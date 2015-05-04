/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var AuthService = require('../../services/auth'),
    AppStateStore   = require('../../stores/appstate'),
    Actions         = require('../../actions');

// React-router variables
var Link            = Router.Link;

var Header = React.createClass({
    mixins: [Router.Navigation],
    getInitialState: function() {
        return {
            firstName: AppStateStore.getSessionData().firstName,
            lastName: AppStateStore.getSessionData().lastName,
            sk: AppStateStore.getSessionData().sessionToken
        };
    },
    logout: function() {
        var self = this;
        AuthService.logout(AppStateStore.getSessionData().id, function(res) {
            if(res.body.Result) {
                console.log(self.state.firstName + " has logged out successfully.");
            } else {
                console.log("Error at logout", res.text);
            }
        });
        this.transitionTo('/signin');
        Actions.declareLoggedOut();
    },
    render: function() {
        var logoUrl     = '../static/img/ic_aphelia.png',
            companyName = 'GroupDirect';
        switch(AppStateStore.getSessionData().companyId) {
            case 13:
                logoUrl = '../static/img/HISD-logo.png';
                companyName = 'HISD';
                break;
            case 14:
                logoUrl = '../static/img/indexleft.gif';
                companyName = 'Sheba Telecom';
                break;
            case 15:
                logoUrl = '../static/img/Cisco_logo.png';
                companyName = 'Cisco Inc.';
                break;
            case 16:
                logoUrl = '../static/img/Aphelia_logo1.png';
                companyName = 'GD Demo';
                break;
            default:
                logoUrl = '../static/img/ic_aphelia.png';
                companyName = 'GroupDirect';

        }
        return (
            <div className="header-private">
                <Link to="splash" className="logo">
                    <div className="profile-pic">
<<<<<<< HEAD
                        <img src='../static/img/ic_aphelia.png' />
=======
                        <img src={logoUrl} />
>>>>>>> sbc-routes
                    </div>
                    <div className="logo-text">
                        {/*companyName*/}
                        GroupDirect <sup>BETA</sup>
                    </div>
                </Link>
                <div className="nav">
                    <div className="logout" onClick={this.logout}>Sign out</div>
                    <div className="separator"></div>
                    <a target="_blank" href={"http://apps.group.direct?sk=" + this.state.sk}>Application Console</a>
                    <div className="separator"></div>
                    <Link to="profile">{this.state.firstName + " " + this.state.lastName}</Link>
                </div>
            </div>
        );
    }
});

module.exports = Header;

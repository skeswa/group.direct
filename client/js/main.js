/** @jsx React.DOM */
var React   = require('react'),
    Router  = require('react-router');

// React-router variables
var Route           = Router.Route,
    RouteHandler    = Router.RouteHandler,
    DefaultRoute    = Router.DefaultRoute,
    NotFoundRoute   = Router.NotFoundRoute;

// Authentication related page components
var NotFound    = require('./components/404');
// Publicly accessible page components
var Public      = require('./components/public'),
    Splash      = require('./components/public/splash'),
    About       = require('./components/public/about'),
    Contact     = require('./components/public/contact'),
    Login       = require('./components/public/login'),
    Terms       = require('./components/public/terms'),
    Privacy     = require('./components/public/privacy'),
    Services    = require('./components/public/services'),
    Register    = require('./components/public/register'),
    Forgot      = require('./components/public/forgot'),
    ConfirmPassword = require('./components/public/confirmpassword')

    Account         = require('./components/private/account'),
    Profile         = require('./components/private/account/profile'),
    Connections     = require('./components/private/account/connections'),
    Settings        = require('./components/private/account/settings'),
    Apps            = require('./components/private/account/apps'),
    Billing         = require('./components/private/account/billing');

// Authentication-required page components
// TODO make the internal pages a thing

// Routes representing the frontend
var sitemap = (
    <Route handler={RouteHandler}>
        <Route name="public" path="/" handler={Public}>
            <Route name="about" handler={About}/>
            <Route name="signin" handler={Login}/>
            <Route name="signup" handler={Register}/>
            <Route name="contact" handler={Contact}/>
            <Route name="terms" handler={Terms}/>
            <Route name="privacy" handler={Privacy}/>
            <Route name="services" handler={Services}/>
            <Route name="forgot" handler={Forgot}/>
            <Route name="account" handler={Account}>
                <Route name="profile" handler={Profile}/>
                <Route name="connections" handler={Connections}/>
                <Route name="settings" handler={Settings}/>
                <Route name="apps" handler={Apps}/>
                <Route name="billing" handler={Billing}/>
            </Route>
            <Route name="confirmpassword" handler={ConfirmPassword}/>
            <DefaultRoute name="splash" handler={Splash}/>
        </Route>
        <NotFoundRoute name="404" handler={NotFound}/>
    </Route>
);

// Bind the routes to the DOM
Router.run(sitemap, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
});

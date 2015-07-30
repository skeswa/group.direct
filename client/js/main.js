/** @jsx React.DOM */
var React   = require('react'),
    Router  = require('react-router');

// React-router variables
var Route           = Router.Route,
    RouteHandler    = Router.RouteHandler,
    Redirect        = Router.Redirect,
    DefaultRoute    = Router.DefaultRoute,
    NotFoundRoute   = Router.NotFoundRoute;

// Authentication related page components
var NotFound    = require('./components/404');
// Publicly accessible page components
var Public      = require('./components/public'),
    Splash      = require('./components/public/splash'),
    Splash2      = require('./components/public/splash2'),
    About       = require('./components/public/about'),
    Contact     = require('./components/public/contact'),
    Login       = require('./components/public/login'),
    Terms       = require('./components/public/terms'),
    Aphelia     = require('./components/public/aphelia'),
    GVC       = require('./components/public/gvc'),
    R4R       = require('./components/public/r4r'),
    Privacy     = require('./components/public/privacy'),
    Services    = require('./components/public/services'),
    Register    = require('./components/public/register'),
    Forgot      = require('./components/public/forgot'),
    ConfirmPassword = require('./components/public/confirmpassword'),
    RequestExpired = require('./components/public/requestexpired'),

    Account         = require('./components/private/account'),
    Profile         = require('./components/private/account/profile'),
    Connections     = require('./components/private/account/connections'),
    Settings        = require('./components/private/account/settings'),
    Apps            = require('./components/private/account/apps'),
    Billing         = require('./components/private/account/billing'),
    Notice          = require('./components/private/account/notice'),

    Console         = require('./components/private/console'),
    Routes          = require('./components/private/console/routes'),
    Drivers         = require('./components/private/console/drivers'),
    Vehicles        = require('./components/private/console/vehicles'),
    Students        = require('./components/private/console/students'),

    Admin           = require('./components/private/admin'),
    Company         = require('./components/private/admin/company');
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
            <Route name="aphelia" handler={Aphelia}/>
            <Route name="gvc" handler={GVC}/>
            <Route name="r4r" handler={R4R}/>
            <Route name="terms" handler={Terms}/>
            <Route name="privacy" handler={Privacy}/>
            <Route name="services" handler={Services}/>
            <Route name="forgot" handler={Forgot}/>
            <Route name="confirmpassword" handler={ConfirmPassword}/>
            <Route name="requestexpired" handler={RequestExpired}/>
            <Route name="splash2" handler={Splash2}/>
            <DefaultRoute name="splash" handler={Splash}/>
        </Route>
        <Route name="account" handler={Account}>
            <Route name="profile" handler={Profile}/>
            <Route name="connections" handler={Connections}/>
            <Route name="settings" handler={Settings}/>
            <Route name="apps" handler={Apps}/>
            <Route name="billing" handler={Billing}/>
            <Route name="notice" handler={Notice}/>
            <Redirect from="*" to="apps" />
        </Route>
        <Route name="console" handler={Console}>
            <Route name="routes" handler={Routes}/>
            <Route name="drivers" handler={Drivers}/>
            <Route name="vehicles" handler={Vehicles}/>
            <Route name="students" handler={Students}/>
            <Redirect from="*" to="routes" />
        </Route>
        <Route name="admin" handler={Admin}>
            <Route name="company" handler={Company}/>
            <Redirect from="*" to="company" />
        </Route>
        <NotFoundRoute name="404" handler={NotFound}/>
    </Route>
);

// Bind the routes to the DOM
Router.run(sitemap, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
});

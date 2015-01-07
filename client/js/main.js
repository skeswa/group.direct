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
    Login       = require('./components/public/login'),
    Register    = require('./components/public/register');
// Authentication-required page components
// TODO make the internal pages a thing

// Routes representing the frontend
var sitemap = (
    <Route handler={RouteHandler}>
        <Route name="public" path="/" handler={Public}>
            <Route name="about" handler={About}/>
            <Route name="signin" handler={Login}/>
            <Route name="signup" handler={Register}/>
            <DefaultRoute name="splash" handler={Splash}/>
        </Route>
        <NotFoundRoute name="404" handler={NotFound}/>
    </Route>
);

// Bind the routes to the DOM
Router.run(sitemap, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
});

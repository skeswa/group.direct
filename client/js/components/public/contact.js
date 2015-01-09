/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions');

var Header          = require('./header');

// React-router variables
var Link            = Router.Link;

var Contact = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('Contact');
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div id="contact" className="page">
                <Header />
                <div className="form-holder">
                    <form id="contact_form" action="#" method="POST" enctype="multipart/form-data">
                        <div class="row">
                            <label for="name">Your name:</label><br />
                            <input id="name" class="input" name="name" type="text" value="" size="30" /><br />
                        </div>
                        <div class="row">
                            <label for="email">Your email:</label><br />
                            <input id="email" class="input" name="email" type="text" value="" size="30" /><br />
                        </div>
                        <div class="row">
                            <label for="message">Your message:</label><br />
                            <textarea id="message" class="input" name="message" rows="7" cols="30"></textarea><br />
                        </div>
                        <input id="submit_button" type="submit" value="Send email" />
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = Contact;
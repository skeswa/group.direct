var mandrill = require('mandrill-api/mandrill');

var log = require('./log'),
    smtpConfig = require('./smtp.json');

var mandrillClient = new mandrill.Mandrill(smtpConfig.pass);

module.exports = {
    send: function(toEmail, toName) {
        var message = {
            "html": "<p>Example HTML content</p>",
            "subject": "Hi Ali",
            "from_email": "noreply@group.direct",
            "from_name": "GroupDirect",
            "to": [{
                "email": toEmail,
                "name": toName,
                "type": "to"
            }],
            "headers": {
                "Reply-To": "noreply@group.direct"
            },
            "important": false
        };
        mandrillClient.messages.send({
            message: message,
            async: 'Async'
        });
    }
};
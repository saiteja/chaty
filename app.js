// Add your requirements
var restify = require('restify'); 
var builder = require('botbuilder'); 

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 4000, function() 
{
   console.log('%s listening to %s', server.name, server.url); 
});


// create chat bot
var connector = new builder.ChatConnector(
    {
        appId: process.env.MICROSOFT_APP_ID,
        appPassword: process.env.MICROSOFT_APP_PASSWORD
    }
);
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create bot settings
bot.dialog('/', function (session) {
    if (!session.userData.name) {
        session.beginDialog('/profile');
    } else {
        session.send('I am Groot', session.userData.name);
    }
});

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.beginDialog('/user');
        session.endDialog();
    }
]);

bot.dialog('/user', function(session) {
    session.send('Happy new year %s', session.userData.name);
});

server.get('/', restify.serveStatic({
    directory: __dirname,
    default: '/chat.html'
}));
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
        appId: 'chaty',
        appPassword: 'password'
    }
);
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create bot settings
bot.dialog('/', function (session) {
    session.send('Hello World');
})
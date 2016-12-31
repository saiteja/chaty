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
    session.send('Hello World');
});

server.get('/', restify.serveStatic({
    directory: __dirname,
    default: '/chat.html'
}));
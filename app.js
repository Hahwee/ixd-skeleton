
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
// Example route
// var user = require('./routes/user');

var app = express();

var fs = require('fs')

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
  res.render('index');
});
// Example route
// app.get('/users', user.list);


// app.get('/overview', function(req, res){
//     res.render('overview');
// });

app.get('/overview', index.overview);

// app.get('/chats', function(req, res){
//   res.render('chats');
// });
//for json rendering
app.get('/chats', index.chats);

app.get('/groups', function(req, res){
  res.render('groups');
});

// app.get('/profiles', function(req, res){
//   res.render('profiles');
// });

//for rendering dynamic json data on profiles page
app.get('/profiles', index.profiles);

//for json rendering
app.get('/home', index.home);

app.get('/mslider', function(req, res){
  res.render('mslider');
});

app.get('/open', function(req, res){
  res.render('openEntries');
});

app.get('/entry', function(req, res){
  res.render('entry');
});

app.post('/SendfbData', function(req, res){
  console.log(req.body);
  fs.writeFile("../ixd-skeleton/facebook.json", JSON.stringify(req.body), function(err){
    if(err){
      return console.log(err);
    }
  })

})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

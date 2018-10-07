var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var format = require('string-format')
var swig = require('swig');
var bodyParser = require('body-parser');

const URL_FORMAT = '/{game_hash}'
const BASE_URL = 'localhost:3000'
format.extend(String.prototype, {})

var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res) {
   res.render('index');
});

var port = process.env.PORT || 3000;

http.listen(port, function(){
  console.log('listening on *:', port);
});

// http://stackoverflow.com/a/1349426/4855984
function makeid() {
     var text = "";
     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

     for( var i=0; i < 5; i++ )
         text += possible.charAt(Math.floor(Math.random() * possible.length));

     return text;
}

// TODO: use namespaces
// TODO: emit to hosts only
io.on('connection', function(socket) {

  socket.on('newPreview', function() {
  });

  socket.on('newHost', function() {
    socket.on('onMove', function(data) {
      socket.broadcast.emit('move', data)
    });
  });
});

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
function makeRoomId() {
     var text = "";
     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

     for( var i=0; i < 5; i++ )
         text += possible.charAt(Math.floor(Math.random() * possible.length));

     return text;
}

io.on('connection', function(socket) {

  socket.on('roomId', function(roomId) {
    console.log(" * [" + roomId +  "] new participant");
    socket.room = roomId;
    socket.join(roomId);
  });

  socket.on('newPreview', function() {
    console.log(" * [" + socket.room +  "] participant registered as 'preview'")
  });

  socket.on('newHost', function() {
    console.log(" * [" + socket.room +  "] participant registered as 'host'")
    socket.on('onMove', function(data) {
      socket.broadcast.to(socket.room).emit('move', data)
    });
  });
});

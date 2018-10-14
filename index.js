var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('static'));

/**
 * Define pages
 */

app.get('/', function(req, res) {
   res.render('index');
});


/**
 * Run application on port 3000
 */

var port = process.env.PORT || 3000;

http.listen(port, function(){
  console.log('listening on *:', port);
});

/**
 * Handle socket interactions
 */

io.on('connection', function(socket) {

  socket.on('roomId', function(roomId) {
    console.log(" * [" + roomId +  "] new participant");
    socket.room = roomId;
    socket.join(roomId);
  });

  socket.on('newMirror', function() {
    console.log(" * [" + socket.room +  "] participant registered as 'mirror'")
  });

  socket.on('newHost', function() {
    console.log(" * [" + socket.room +  "] participant registered as 'host'")
    socket.on('onMove', function(data) {
      socket.broadcast.to(socket.room).emit('move', data)
    });
  });
});

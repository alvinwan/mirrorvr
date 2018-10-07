function Client() {

  var socket = io();
  var session;

  this.register = function(_session) {
    session = _session;
  }

  socket.on('connect', function() {
    console.log(' * Connection established');
  });

  socket.on('move', function(data) {
    session.movePlayer(
      data["playerId"],
      data["position"],
      data["rotation"]
    )
  })

  this.newPreview = function() {
    socket.emit('newPreview');
  }

  this.newHost = function() {
    socket.emit('newHost');
  }

  this.onMove = function(playerId, position, rotation) {
    socket.emit('onMove', {
      "playerId": playerId,
      "position": position,
      "rotation": rotation
    });
  }
}

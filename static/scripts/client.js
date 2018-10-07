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
    session.move(
      data["playerId"],
      data["position"],
      data["rotation"]
    )
  })

  this.move = function(playerId, position, rotation) {
    socket.emit('move', {
      "playerId": playerId,
      "position": position,
      "rotation": rotation
    });
  }
}

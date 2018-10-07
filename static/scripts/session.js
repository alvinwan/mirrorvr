console.log("Loaded session")
function Session() {

  var client = new Client();

  this.start = function() {
    client.register(this);
    client.newHost();
  }

  this.onMove = function(playerId, position, rotation) {
    client.onMove(playerId, position, rotation);
  }

  this.movePlayer = function(playerId, position, rotation) {
    console.log(playerId, position, rotation)
  }
}

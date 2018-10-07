function Session() {

  var client = new Client();
  var isHost = false;
  var isViewer = true;

  this.start = function() {
    client.register(this);
    if (mobilecheck()) {
      client.newHost();
      isHost = true;
      isViewer = false;
    } else {
      client.newPreview();
      isHost = false;
      isViewer = true;
    }
  }

  this.registerCamera = function(camera) {
    this.camera = camera
  }

  this.onMove = function(playerId, position, rotation) {
    if (isHost) {
      client.onMove(playerId, position, rotation);
    }
  }

  this.movePlayer = function(playerId, position, rotation) {
    if (isViewer) {
      this.camera.setAttribute('rotation', rotation);
      this.camera.setAttribute('position', position);
    }
  }
}

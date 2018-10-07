function Session() {

  var client = new Client();

  this.start = function() {
    client.register(this);
    if (mobilecheck()) {
      // start tracking all moves
    } else {
      // start logging all moves
    }
  }

  this.move = function(playerId, position, rotation) {
    console.log(playerId, position, rotation)
  }

  this.trackCamera = function() {
    AFRAME.registerComponent('camera-listener', {
      tick: function () {
        var cameraEl = this.el.sceneEl.camera.el;
        var position = cameraEl.getAttribute('position');
        var rotation = cameraEl.getAttribute('rotation');

        client.move(0, position, rotation)
      }
    });
  }
}

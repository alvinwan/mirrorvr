AFRAME.registerComponent('magic-rock', {
  init: function () {
    this.el.addEventListener('click', function (evt) {
      setTimeout(function() {
        var controlBox = document.querySelector('.house .control-box');
        controlBox.setAttribute('rotation', {x: 90, y: 0, z: 0});
        controlBox.setAttribute('position', {x: 0.25, y: -0.1, z: 0.5});
      }, 1000)
    });
  }
});

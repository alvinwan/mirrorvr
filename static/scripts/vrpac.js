AFRAME.registerComponent('trigger-click-on', {
  schema: {type: 'string'},

  init: function () {
    var identifier = this.data;
    console.log(' * Initializing click trigger for', identifier)
    this.el.addEventListener('click', function (evt) {
      console.log(" * Click on", identifier);
      setTimeout(function() {
        document.querySelector(identifier).click();
      }, 1000)
    });
  }
})


AFRAME.registerComponent('trigger-event-on', {
  schema: {type: 'string'},

  init: function () {
    var identifier = this.data;
    var event_name = this.el.attributes['trigger-event-name'].nodeValue;
    console.log(' * Initializing', event_name, 'trigger for', this.data)
    this.el.addEventListener('click', function (evt) {
      console.log(" * Click on", identifier, 'with event', event_name)
      setTimeout(function() {
        document.querySelector(identifier).emit(event_name);
      }, 1000)
    });
  }
})

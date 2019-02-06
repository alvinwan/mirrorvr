# MirrorVR

Ever wanted to see what's going on in your user's virtual reality headset? **MirrorVR** is a live mirror for your aframe virtual reality projects: whatever your user sees in a mobile phone virtual reality headset is reproduced across any desktop viewer.

created by [Alvin Wan](http://alvinwan.com)

To test the demo, just load [`http://mirrorvr.alvinwan.com/demo`](http://mirrorvr.alvinwan.com/demo) on both your **phone** and your **desktop**.

```
http://mirrorvr.alvinwan.com/demo
```

# Getting Started

> Note: MirrorVR currently only supports AFRAME projects.

To get started, include this in your webVR project, after the AFRAME import.

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js"></script>
<script src="https://cdn.jsdelivr.net/gh/alvinwan/mirrorvr@0.2.2/dist/mirrorvr.min.js"></script>
```

Then, add the `camera-listener` and `onload-init-mirrorvr` AFRAME components to your camera, like below:

```
<a-camera camera-listener onload-init-mirrorvr></a-camera>
```

That's it! Then, load your project on both your **phone** and your **desktop**. The script by default synchronizes the camera only, which suffices for the point-and-click adventure game featured above.

See the [demo's source code](https://github.com/alvinwan/mirrorvr/blob/master/static/demo/index.html).

# Configuration

To configure MirrorVR, manually initialize the `mirrorVR` object.

```
mirrorVR.init({

  /**
   * See the `Rooms` section below for details.
   **/
  roomId: 'myUniversalRoomName',

  /**
   * A NodeJS server is required to facilitate communication between the client
   * and the server. By default, MirrorJS uses and provides one at
   * https://mirrorvr.herokuapp.com/. Explicitly define a host variable to use
   * your own NodeJS server.
   **/
  host: 'https://myOwnServer.com/',

  /**
   * See the `State` section below for details.
   **/
  state: {
    position: {
      onNotify: function(data) {
        console.log('Position is ' + data.index);
      }
    }
  }
});
```

## Rooms

By default, every unique URL is a new "room". For example, if

- user A loads example.com on her phone, and
- user B loads example.com on his desktop, and
- user C loads example.com#hello on her desktop,

user B will mirror user A but user C will *not* mirror user A. To override this default, configure `roomId`.

```
mirrorVR.init({
  ...
  roomId: 'myUniversalRoomName',
  ...
});
```

## State

Need to synchronize more than the camera? MirrorVR uses a notification system:

1. First, the mobile device sends a notification with information e.g., current time.
2. Second, the desktop receives the notification with information, updating its local data structures and UI accordingly.

First, pick a name for this update. Here, we will use `time`.

Second, send a notification that state has changed. The first argument is the name you picked, and the second is state information.

```
mirrorVR.notify('time', new Date());
```

Then, amend your state configuration to include a handler for the desktop. The key `camera` below must match the arbitrary name we picked earlier, for `MirrorVR.notify`.

```
mirrorVR.init({
  state: {
    ...
    time: {
      onNotify: function(data) {
        console.log('Time is ' + data);
      }
    }
  }
});
```

Note to self: When deploying, `uglifyjs static/mirrorvr.js dist/mirrorvr.min.js`, and update the version number in `package.json`.

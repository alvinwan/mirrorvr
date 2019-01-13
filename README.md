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
<script src="https://cdn.jsdelivr.net/gh/alvinwan/mirrorvr@0.1.0/dist/mirrorvr.min.js"></script>
```

Then, add the `camera-listener` AFRAME component to your camera, like below:

```
<a-camera camera-listener></a-camera>
```

That's it! Then, load your project on both your **phone** and your **desktop**. The script by default synchronizes the camera only, which suffices for the point-and-click adventure game featured above.

See the [demo's source code](https://github.com/alvinwan/mirrorvr/blob/master/static/demo/index.html).

# Configuration

To configure MirrorVR, provide the following global object literal `mirrorvr` with optional arguments.

```
var mirrorvr = {

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
}
```

## Rooms

By default, every unique URL is a new "room". For example, if

- user A loads example.com on her phone, and
- user B loads example.com on his desktop, and
- user C loads example.com#hello on her desktop,

user B will mirror user A but user C will *not* mirror user A. To override this default, configure `roomId`.

```
var mirrorvr = {
  ...
  roomId: 'myUniversalRoomName',
  ...
}
```

## State

To synchronize state, define behavior when sending and receiving state information. Send information from the phone via the `MirrorVR.notify` function as follows. Here, we have picked an arbitrary name `camera` for this state.

```
MirrorVR.notify('position', {index: 0})
```

Then, amend your `mirrorvr` state configuration to include a handler for the desktop. The key `camera` below must match the arbitrary name we picked earlier, for `MirrorVR.notify`.

```
var mirrorvr = {
  state: {
    ...
    position: {
      onNotify: function(data) {
        console.log('Position is ' + data.index);
      }
    }
  }
}
```

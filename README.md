# locomotive-primus

Locomotive handlers for Primus WebSockets abstraction layer


## Installation

	$ npm install locomotive-primus
	
## How it works

This module works by exposing server in your locomotive app.
It becomes available in `this.server`.

Simple http or cluster, this implementation is included too, just swap the `primusLocomotive.boot.httpServer` to `primusLocomotive.boot.httpServerCluster`

The module boots primus using the provided options and `this.server` and then exposes primus globally in `this.primus`
	
## Quick Start

In your locomotive `server.js` file, use the following code.

```
var primusLocomotive = require(__dirname + '/app/helpers/primus/locomotive-primus');
...


app.phase(primusLocomotive.boot.httpServer(3000, '0.0.0.0'));
app.phase(primusLocomotive.boot.primusServer({
    primus: {
        primus configuration here
    },
    clientLocation: path.resolve(__dirname + '/public/js/libs/primus-client.js'),
    authorizeFunction: function() { return "your primus authorize function, or null if you don't need one"; },
    sparkHandler: function(spark) { return "your spark handler"; }
}));


```

## Misc

A more comprehensive documentation will be included later

## Credits

  - [Jared Hanson](http://github.com/jaredhanson) for his awesome work on Locomotive
  - [Mathieu Amiot](http://github.com/OtaK), author of this module
  
## License

Apache 2.0
var locomotivePrimus = {
    boot: {}
};

locomotivePrimus.boot.httpServer = function (port, options) {
    var http = require('http');

    if (typeof port === 'object')
    {
        options = port;
        port    = undefined;
    }

    options = options || {};
    port    = port || options.port || 3000;

    return function httpServer(done) {
        this.server = http.createServer(this.express);
        this.server.listen(port, function() {
            console.info('HTTP server listening on %d', addr.port);
            return done();
        });
    };
};

locomotivePrimus.boot.httpServerCluster = function(port, options) {
    var os = require('os');
    var http = require('http');
    var cluster = require('cluster');
    var sticky = require('sticky-session');
    var debug = require('debug')('locomotive');

    if (typeof port === 'object')
    {
        options = port;
        port    = undefined;
    }

    options = options || {};
    port    = port || options.port || 3000;

    var size = options.size || os.cpus().length;

    return function httpServerCluster(done) {
        this.server = http.createServer(this.express);
        if (!sticky.listen(this.server, port, { workers: size }))
        {
            this.server.once('listening', function() {
                console.info('[m] Creating HTTP server cluster with %d workers', size);
                return done();
            });
        }
        else
        {
            console.info('[w:%d] HTTP server listening on %d', cluster.worker.id, port);
            return done();
        }

    };
};

locomotivePrimus.boot.primusServer = function (Primus, options) {
    options = options || {};

    var primusOptions   = options.primus || { transformer: 'sockjs' };
    var clientLocation  = options.clientLocation || '/public/js/libs/primus-client.js';
    var authorizeFunc   = options.authorizeFunction || null;
    var sparkHandler    = options.sparkHandler || function () {};
    var disconnectionHandler = options.disconnectionHandler || function() {};

    return function primusServer() {
        this.primus = new Primus(this.server, primusOptions);
        this.primus.save(clientLocation);
        if (authorizeFunc !== null && typeof authorizeFunc === 'function')
            this.primus.authorize(authorizeFunc.bind(this));

        this.primus.on('connection', sparkHandler.bind(this));
        this.primus.on('disconnection', disconnectionHandler.bind(this));
    };
};

module.exports = locomotivePrimus;

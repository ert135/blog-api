//module dependencies
var application = require("./app");
var debug = require("debug")("express:server");
var http = require("http");
//create http server
var httpPort = normalizePort(process.env.BLOG_PORT || 8080);
var app = new application.App;
var httpServer = http.createServer(app.express);
//listen on provided ports
httpServer.listen(httpPort);
console.log('Listening on ', httpPort);
//add error handler
httpServer.on("error", onError);
//start listening on port
httpServer.on("listening", onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof httpPort === "string"
        ? "Pipe " + httpPort
        : "Port " + httpPort;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = httpServer.address();
    var bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    debug("Listening on " + bind);
}

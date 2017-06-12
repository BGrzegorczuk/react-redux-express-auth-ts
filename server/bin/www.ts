#!/usr/bin/env node
/**
 * SERVER
 */
import {app} from '../app';
import {Promise} from 'q';
import * as debugModule from 'debug';
import * as http from 'http';
import * as mongoose from 'mongoose';
import * as config from '../config.js';


let debug = debugModule('temp:server');
let port = normalizePort(process.env.PORT || config.SERVER_PORT);

/* DB SETUP */

// use q promises
global.Promise = Promise;
(mongoose as any).Promise = global.Promise;

const MONGODB_CONNECTION = `mongodb://${config.DB_HOST}/${config.DB_NAME}`;
mongoose.connect(MONGODB_CONNECTION).then(
    () => null,
    (err: any) => { console.log('mongoose.connect err', err); }
);


/* APP SETUP */
app.set('port', port);


/* SERVER SETUP */

let server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: string): string | number | boolean {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: {syscall: string, code: string}) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
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
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : `${addr.address}:${addr.port}`;
    debug('Listening on ' + bind);
    console.log('Listening on ' + bind);
}

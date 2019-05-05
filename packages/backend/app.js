const { createServer } = require('http');
// const { createServer } = require('https');
const fs = require('fs');
const path = require('path');
const cluster = require('cluster');
const createListener = require('./express');
const numCPUs = require('os').cpus().length;
const { logger } = require(path.resolve('logger'));

/**
 * Application
 */
const listener = createListener();

/**
 * routes, session
 */
require('./routes/api')(listener);
require('./routes/routes')(listener);

/**
 * Server
 */
// const hskey = fs.readFileSync(path.resolve('keys', 'app-key.pem'));
// const hscert = fs.readFileSync(path.resolve('keys', 'app-cert.pem'));

const httpsOptions = {
  // key: hskey,
  // cert: hscert,
};

if (process.env.NODE_ENV === 'production' && cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // createServer(httpsOptions, listener).listen(listener.get('port'), () => {
  createServer(listener).listen(listener.get('port'), () => {
    logger.info(
      `Express HTTPS server listening on port ${listener.get('port')}`,
    );
  });
}

// Javascript demo
// Execute it with "node index.js"

const myfavouritelogger = require('./lib/myfavouritelogger').default;

const logger = myfavouritelogger();

logger.info('Hello World!');
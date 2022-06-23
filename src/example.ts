import myfavouritelogger from './myfavouritelogger';

const logger = myfavouritelogger();

setTimeout(() => logger.info('Hola'), 0);
setTimeout(() => logger.error('Hola'), 1000);
setTimeout(() => logger.warn('Hola'), 2000);
setTimeout(() => logger.debug('Hola'), 3000);

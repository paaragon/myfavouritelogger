import myfavouritelogger from './myfavouritelogger';

const logger = myfavouritelogger(undefined, new Date(2021, 10, 7, 14, 0, 0));

logger.info('hola caracola');
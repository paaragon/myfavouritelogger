import myfavouritelogger from '../src/myfavouritelogger';

describe('Console logging default behaviour', () => {
    global.console = {
        log: jest.fn(),
        info: jest.fn(),
        error: jest.fn(),
    } as any;

    const logger = myfavouritelogger({ colors: false }, new Date(2021, 10, 7, 14, 0, 0));

    test('Print info with default log format', () => {
        logger.info('Hello World!');
        expect(global.console.log).toHaveBeenCalledWith('2021-11-07 13:00:00+00:00 [info] Hello World!');
    });

    test('Print error with default log format', () => {
        logger.error('Fatal error');
        expect(global.console.log).toHaveBeenCalledWith('2021-11-07 13:00:00+00:00 [error] Fatal error');
    });

    test('Print warn with default log format', () => {
        logger.warn('Warning');
        expect(global.console.log).toHaveBeenCalledWith('2021-11-07 13:00:00+00:00 [warn] Warning');
    });
});
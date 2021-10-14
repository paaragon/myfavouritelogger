import moment from 'moment';
import myfavouritelogger from '../src/myfavouritelogger';

describe('Console logging custom behaviour', () => {
    global.console = {
        log: jest.fn(),
        info: jest.fn(),
        error: jest.fn(),
    } as any;

    const logger = myfavouritelogger({ colors: false }, moment('2021-11-07 14:00:00+00:00', 'YYYY-MM-DD HH:m:ssZ').utc().toDate());

    test('Print info with sublog format', () => {
        const subLog = logger.child({ name: 'sublog' });
        subLog.info('Hello World!')
        expect(global.console.log).toHaveBeenCalledWith('2021-11-07 14:00:00+00:00 [info] [sublog] Hello World!');
    });
});
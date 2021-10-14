import fs from 'fs';
import moment from 'moment';
import myfavouritelogger from '../src/myfavouritelogger';

const logPathFormat = `${__dirname}/logs/application-%DATE%.log`;
const getLogPath = () => {
    const date = moment().format('YYYY-MM-DD');
    return logPathFormat.replace('%DATE%', date);
}

describe('File logging', () => {
    global.console = {
        log: jest.fn(),
        info: jest.fn(),
        error: jest.fn(),
    } as any;

    const logger = myfavouritelogger({
        colors: false,
        file: {
            path: logPathFormat
        }
    }, moment('2021-11-07 14:00:00+00:00', 'YYYY-MM-DD HH:m:ssZ').utc().toDate());

    beforeEach(() => {
        eraseFile();
    });

    test('Print info with default log format', done => {
        logger.info('Hello World!');
        setTimeout(() => {
            try {
                let lastLine: string;
                while (!lastLine) {
                    lastLine = getFileLastLine();
                }
                expect(lastLine).toBe('2021-11-07 14:00:00+00:00 [info] Hello World!');
                done();
            } catch (e) {
                done(e);
            }
        }, 10);
    });
});

function eraseFile() {
    const path = getLogPath();
    fs.writeFileSync(path, '');
}

function getFileLastLine(): string {
    const path = getLogPath();
    const content = fs.readFileSync(path).toString();
    const lines = content.split('\n');
    return lines[lines.length - 2];
}
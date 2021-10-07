# myfavouritelogger

[![Build Status](https://app.travis-ci.com/paaragon/myfavouritelogger.svg?branch=main)](https://app.travis-ci.com/paaragon/myfavouritelogger)

This is my favourite logger and it will be yours.

## Why use it?

1. You want to write cool console logs (colors, dates...).
2. You want to write file logs with daily rotation and size control.
3. You know how to use Winston logger but you don't like how it looks out of the box.
4. You like colors.
5. You like customization.
6. You like log levels.
7. You like custom print formats.
8. You don't want to programm all this.

## How to use it?

```javascript
import myfavouritelogger from 'myfavouritelogger';

const logger = myfavouritelogger();

logger.info('Hello world!');
logger.error('Hello world!');
logger.warn('Hello world!');
```

## How to customize it?

```javascript
import myfavouritelogger from 'myfavouritelogger';

const logger = myfavouritelogger({
    printFormat: (str: string, info: TransformableInfo) => {
        if (info.level) {
            str += mapLevelColor(info.level, `[${info.level}] `);
        }

        if (info.name) {
            str += `[${info.name}] `.green;
        }

        str += `${info.message}`;

        return str;
    },
    file: {
        path: './logs/application-%DATE%.access.log',
        maxSize: '20m',
        maxFiles: '14d',
        zippedArchive: true,
        pathDatePattern: 'YYYY-MM-DD',
    },
    console: true,
    level: 'debug';
    colors: true;
    dateFormat: 'YYYY-MM-DD HH:mm:ssZ';
});

logger.info('Hello world!');
logger.error('Hello world!');
logger.warn('Hello world!');
```

### Options

| Option               | Type                                             | Default                | Description                                                                                                                                                                                   |
| -------------------- | ------------------------------------------------ | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| printFormat          | (str: string, info: TransformableInfo) => string | (see below table)      | Function to override the print format. `str` is the original string to print. `info` is the [winston object with context info](https://github.com/winstonjs/logform#info-objects)             |
| file.path            | string                                           | No default             | Path where the log file will be written. The file name can contains  %DATE% keyword for daily rotation. If this option is not present, no file will be generated                              |
| file.maxSize         | string\|number                                   | '20m'                  | Indicates the max size for the log file. If it reached the maximum, the file will rotate                                                                                                      |
| file.maxFiles        | string\|number                                   | '14d'                  | Indicates the maximum number of files to store. If the files rotates to reach this number, the older files will be deleted                                                                    |
| file.zippedArchive   | boolean                                          | false                  | Indicates if the rotated files will be zipped or not                                                                                                                                          |
| file.pathDatePattern | string                                           | 'YYYY-MM-DD'           | If you have set a file path, this option will define the format date for the file name *(check [momentjs formats](https://momentjs.com/docs/#/displaying/format/) for complete documentation)* |
| console              | boolean                                          | true                   | Indicates if the logs will be printed n the console                                                                                                                                           |
| level                | 'info'\|'warning'\|'error'\|'debug'              | info                   | The log level                                                                                                                                                                                 |
| colors               | boolean                                          | true                   | If true, the logs will show beautiful colors                                                                                                                                                  |
| dateFormat           | string                                           | 'YYYY-MM-DD HH:mm:ssZ' | Each log line will display the date. This option defines de date format *(check [momentjs formats](https://momentjs.com/docs/#/displaying/format/) for complete documentation)*                |

#### Default printFormat

```javascript
function defaultPrint(this: any, str: string, info: TransformableInfo): string {
    if (info.level) {
        str += mapLevelColor(info.level, `[${info.level}] `);
    }
    if (info.name) {
        str += `[${info.name}] `.green;
    }

    str += `${info.message}`;

    return str;
}
```
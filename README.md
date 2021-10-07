# myfavouritelogger

This is my favourite logger and it will be yours.

## Why use it?

1. You want to write cool console logs (colors, dates...).
2. You want to write file logs with daily rotation and size control.
3. You know how to use Winston logger but you don't like how it look out of the box.
4. You like colors.
5. You like customization.
6. You like log levels.
7. You like custom print formats.
8. You don't want to programm all this.

## How to use it?

```
import myfavouritelogger from 'myfavouritelogger';

const logger = myfavouritelogger();

logger.info('Hello world!');
logger.error('Hello world!');
logger.warn('Hello world!');
```

## How to customize it?

```
import myfavouritelogger from 'myfavouritelogger';

const logger = myfavouritelogger({
    printFormat: (str: string, info: TransformableInfo) => {
        // you can change the string as you need
        // str: the string you want to manipulate and print
        // info: winston logger info object

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
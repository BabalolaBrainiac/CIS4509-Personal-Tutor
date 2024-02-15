import * as c from 'winston';
import {WinstonUtils} from "../constants/main.constants";

export const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};

export const format = c.format.combine(
    c.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
    c.format.colorize({all: true}),
    c.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

c.addColors(WinstonUtils.logColors);

export const transports = [
    new c.transports.Console(),
    new c.transports.File({
        filename: 'logs/error.log',
        level: 'error',
    }),
    new c.transports.File({filename: 'logs/all.log'}),
    new c.transports.File({
        filename: 'logs/events.log',
        level: 'events',
    }),
];

export const Logger = c.createLogger({
    level: level(),
    levels: WinstonUtils.logLevels,
    format,
    transports,
    defaultMeta: {service: 'Mono'},
    exceptionHandlers: [
        new c.transports.Console({
            format: c.format.simple(),
        }),
        new c.transports.File({filename: 'exceptions.log'}),
    ],
    rejectionHandlers: [
        new c.transports.Console({
            format: c.format.simple(),
        }),
        new c.transports.File({filename: 'rejections.log'}),
    ],
});

import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import moment from 'moment';
import winston from 'winston';
import { IRes, logType } from './interfaces/IRes';

@Injectable()
export class LoggerService {
    private readonly dirname: string = './log';
    private readonly logTypes: logType[] = ['info', 'error', 'debug'];
    private logger: winston.Logger;

    private getOptions(): winston.LoggerOptions {
        const { combine, timestamp, printf } = winston.format;
        const logFormat = printf(({ level, message, timestamp }) => {
            const time = moment(timestamp).format('hh:mm DD.MM.YYYY');
            return `${time} ${level}: ${message}`;
        });
        const format = combine(timestamp(), logFormat);
        const dirname = this.dirname;
        const transports = this.logTypes.map(
            (type) =>
                new winston.transports.File({
                    dirname,
                    filename: `${type}.log`,
                    level: type,
                }),
        );
        return {
            format,
            transports,
        };
    }

    private log(level: logType, message: string): IRes {
        try {
            this.logger.log({
                level,
                message,
            });
            return {
                status: 'success',
                message: '',
            };
        } catch (e) {
            throw new RpcException('500');
        }
    }

    constructor() {
        const options = this.getOptions();
        this.logger = winston.createLogger(options);
        this.info('testMessage');
    }

    public info(message: string): IRes {
        return this.log('info', message);
    }

    public error(message: string): IRes {
        return this.log('error', message);
    }

    public debug(message: string): IRes {
        return this.log('debug', message);
    }
}

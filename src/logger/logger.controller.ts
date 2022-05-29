import {
    Controller,
    Inject,
    UseFilters,
    UseInterceptors,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoggerService } from './logger.service';
import { LogExceptionFilter } from './filters/log-exception.filter';
import { IRes } from './interfaces/IRes';
import { JsonInterceptor } from './interceptors/json.interceptor';

@Controller()
export class LoggerController {
    constructor(
        @Inject(LoggerService) private readonly loggerService: LoggerService,
    ) {}

    @MessagePattern('info')
    @UseFilters(new LogExceptionFilter())
    @UseInterceptors(JsonInterceptor)
    public info(@Payload() message: string): IRes {
        console.log('message', message);
        return this.loggerService.info(message);
    }

    @MessagePattern('error')
    @UseFilters(new LogExceptionFilter())
    @UseInterceptors(JsonInterceptor)
    public error(@Payload() message: string): IRes {
        console.log('message', message);
        return this.loggerService.error(message);
    }

    @MessagePattern('debug')
    @UseFilters(new LogExceptionFilter())
    @UseInterceptors(JsonInterceptor)
    public debug(@Payload() message: string): IRes {
        console.log('message', message);
        return this.loggerService.debug(message);
    }
}

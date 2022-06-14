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
@UseFilters(new LogExceptionFilter())
@UseInterceptors(JsonInterceptor)
export class LoggerController {
    constructor(
        @Inject(LoggerService) private readonly loggerService: LoggerService,
    ) {}

    @MessagePattern('info')
    public info(@Payload() message: string): IRes {
        return this.loggerService.info(message);
    }

    @MessagePattern('error')
    public error(@Payload() message: string): IRes {
        return this.loggerService.error(message);
    }

    @MessagePattern('warn')
    public warn(@Payload() message: string): IRes {
        return this.loggerService.warn(message);
    }

    @MessagePattern('debug')
    public debug(@Payload() message: string): IRes {
        return this.loggerService.debug(message);
    }
}

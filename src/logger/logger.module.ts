import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';

@Module({
    imports: [],
    controllers: [LoggerController],
    providers: [LoggerService],
})
export class LoggerModule {}

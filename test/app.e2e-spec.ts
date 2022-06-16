import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';
import { ClientsModule, Transport, ClientProxy } from '@nestjs/microservices';
import { AppModule } from '../src/app.module';
import { getOptions } from '../src/main';
import { Observable } from 'rxjs';
import { IRes } from '../src/logger/interfaces/IRes';

describe('AppController (e2e)', () => {
    let app: INestMicroservice;
    let client: ClientProxy;
    const loggerService = 'logger_service';

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
                ClientsModule.register([
                    {
                        name: loggerService,
                        transport: Transport.RMQ,
                        options: {
                            urls: ['amqp://user:BGNdWquZ@localhost:5672'],
                            queue: 'logger',
                            queueOptions: {
                                durable: true,
                            },
                        },
                    },
                ]),
            ],
        }).compile();

        const options = await getOptions();
        app = moduleFixture.createNestMicroservice(options);
        await app.init();

        client = app.get(loggerService);
        await client.connect();
    });
    afterAll(async () => {
        await app.close();
        await client.close();
    });

    it('should return success message', (done) => {
        const response: Observable<string> = client.send('info', 'test');
        response.subscribe((data) => {
            expect(typeof data).toEqual('string');
            const res = JSON.parse(data) as IRes;
            expect(res.hasOwnProperty('status')).toEqual(true);
            expect(res.hasOwnProperty('message')).toEqual(true);
            expect(res.status).toEqual('success');
            expect(res.message).toEqual('');
            done();
        });
    });

    it('should return success message', (done) => {
        const response: Observable<string> = client.send('error', 'test');
        response.subscribe((data) => {
            expect(typeof data).toEqual('string');
            const res = JSON.parse(data) as IRes;
            expect(res.hasOwnProperty('status')).toEqual(true);
            expect(res.hasOwnProperty('message')).toEqual(true);
            expect(res.status).toEqual('success');
            expect(res.message).toEqual('');
            done();
        });
    });

    it('should return success message', (done) => {
        const response: Observable<string> = client.send('debug', 'test');
        response.subscribe((data) => {
            expect(typeof data).toEqual('string');
            const res = JSON.parse(data) as IRes;
            expect(res.hasOwnProperty('status')).toEqual(true);
            expect(res.hasOwnProperty('message')).toEqual(true);
            expect(res.status).toEqual('success');
            expect(res.message).toEqual('');
            done();
        });
    });
});

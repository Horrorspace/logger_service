import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { IErrorRes } from '../interfaces/IErrorRes';
import { IError } from '../interfaces/IError';
import { statuses } from '../enums/statuses.enum';

@Catch(RpcException)
export class LogExceptionFilter implements RpcExceptionFilter<RpcException> {
    catch(exception: RpcException): Observable<any> {
        const error = exception.getError() as IError;
        const message = error.code;
        const res: IErrorRes = {
            message,
            status: statuses.error,
        };
        const resStr = JSON.stringify(res);
        console.error(error.reason);
        return of(resStr);
    }
}

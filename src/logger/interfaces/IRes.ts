import { IStatus } from './IStatus';
import { logs } from '../enums/logs.enum';

export type logType = `${logs}`;

export interface IRes extends IStatus {
    message: string;
}

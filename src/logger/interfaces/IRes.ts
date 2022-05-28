type status = 'success' | 'error';

export type logType = 'info' | 'error' | 'debug';

export interface IRes {
    status: status;
    message: string;
}

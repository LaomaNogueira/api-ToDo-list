import { StatusError } from '../errors/statusError';

class StatusErrorHandler {

    static handle(newError: any, error: any): StatusError {

        if (!error.status) {
            error.status = 500;
            error.message = 'Internal Server Error';
            error.name = 'ServerError';
        }

        return error;
    }

}

export { StatusErrorHandler };

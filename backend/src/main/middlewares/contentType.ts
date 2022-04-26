import { NextFunction, Request, Response } from 'express';

function contentType(req: Request, res: Response, next: NextFunction): void {
    res.contentType('json');
    next();
}

export { contentType };

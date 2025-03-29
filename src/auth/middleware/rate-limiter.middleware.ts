/* {
    rate limit for login auth guard
} */

import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

export class RateLimitMiddleware implements NestMiddleware{
    private limiter = rateLimit({
        windowMs : 1 * 60 * 100, //1min for testing -> change to 15 min
        max:5, //maximum 5 req per 15 min
        message:{
            statusCode:429,
            message:'Too many login attemps.Please try again later'
        },
    });

    //Middleware uses req,res and next
    use(req: Request, res: Response, next: NextFunction) {
       this.limiter(req,res,next); 
    }
}
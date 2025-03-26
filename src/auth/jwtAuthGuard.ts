

///this for guarding sensitive nedpoints for attacks

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(private jwtService:JwtService){}
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        console.log("Cookies:", request.cookies);
        const token = request.cookies?.auth_token;
        if(!token){
            throw new UnauthorizedException('AUthorization token is missing')
        }

        try {
            const decoded = this.jwtService.verify(token);
                request.user = decoded;

                return true;
            
        } catch (error) {
            throw new UnauthorizedException('Invalid token')
        }
    }
}
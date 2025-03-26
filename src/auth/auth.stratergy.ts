import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";



@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy){
    constructor(private ConfigService : ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: ConfigService.get<string>('JWT_SECRET_KEY') || 'JWT_SECRET_KEY'
        });
    }

    async  validate(payload:any){
        return {userId : payload.userId}
    }
}
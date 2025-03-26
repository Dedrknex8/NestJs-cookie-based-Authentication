import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

//this will make use of passport Authguard functionallity
@Injectable()
export class jwtAuthGuard extends AuthGuard('jwt'){}
import { Body, Controller, Get, Injectable, Post, Req,Res, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request,Response } from 'express';
import { JwtAuthGuard } from './jwtAuthGuard';
import { jwtAuthGuard } from './jwt-auth.guard';
@Injectable()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post('register')
    async register(@Body() registerDto:RegisterDto){
        return this.authService.registerUser(registerDto)
    }
   
    @Post('login')
    async login(@Body() loginDto:LoginDto,@Res() res:Response){
        return this.authService.loginUser(loginDto,res);
    }
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req:Request) {
    return { message: 'This is a protected route', user: req.user };
    }

     //logout functionality
     @Post('logout')
     async logout(@Res() res:Response){
         res.clearCookie('auth_token');
         return res.json({message : 'Logout sucess fully'});
     }
}

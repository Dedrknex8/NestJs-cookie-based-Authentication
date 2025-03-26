import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs'
import { error, log } from 'node:console';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { response,Response} from 'express'
import { ConfigModule, ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(private prisma : PrismaService,
        private jwtService : JwtService,
        private ConfigService : ConfigService
    ){}

    async registerUser(registerDto:RegisterDto){
        console.log("Received Data:", registerDto); // Debuggin
        try{
        const { email, password } = registerDto;


        //check if userAlready exists
        const existingUser = await this.prisma.user.findUnique({
            where: { email }
        });

        if(existingUser){
            throw new ConflictException('User already exits before, Try login in with this email')
        }

        //if not exits before then hash the pass

        const hashedPassword = await bcrypt.hash(password,10);

        const newnlyCreatedUser = await this.prisma.user.create({
            data:{
                email,
                password:hashedPassword
            }
        })
        //remmove the password form the return objected

        const {password:_,...result} = newnlyCreatedUser
        return result;
    }catch(erro){
        console.log(`${erro}`)
        throw new UnauthorizedException('something wwent wrong')
    }
    };

    //login user

    async loginUser(loginDto: LoginDto,res:Response){
        try {
            const {email,password}  = loginDto;
            const findUser = await this.prisma.user.findUnique({
                where : { email }
            });

            if(!findUser){
                throw new NotFoundException(`User with this email iud cannot be found `)
            }

            //check userpassword with password given

            const checkCredentials = await bcrypt.compare(password,findUser.password)

            if(!checkCredentials){
                throw new UnauthorizedException(`Wrong credential for user `)
            }

            //if password is correct then genreate a token for user
            const token = this.jwtService.sign({userId : findUser.id});
            
            //when token geneated used as cookie for http only session as header

            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: true, // Set `true` in production (HTTPS)
                sameSite: 'none',
                maxAge: 24 * 60 * 60 * 1000,
                domain: 'localhost', // 1 day expiration\
                path : '/'
            });
            

            const {password:_,...result} = findUser

            return res.json({ message: 'Login successful', user: result });

        } catch (error) {
            throw new InternalServerErrorException('Something went wrong',error)
        }
    }
    


}

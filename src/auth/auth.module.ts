import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports : [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports : [ConfigModule],
      useFactory : async(ConfigService: ConfigService)=>({
        secret : ConfigService.get<string>('JWT_SECRET_KEY') || 'JWT_SECRET_KEY',
        signOptions: {expiresIn: '1h'}
      }),
       inject: [ConfigService]
    }),
    ConfigModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports : [JwtModule,PassportModule]
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { PrismaModule } from './prisma/prisma.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports  :[
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    PrismaModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

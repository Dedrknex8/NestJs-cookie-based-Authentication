import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
@Global()
@Module({
  providers: [PrismaService],
  //make sure that prisma service is exported for global use
  exports : [PrismaService]
})
export class PrismaModule {}

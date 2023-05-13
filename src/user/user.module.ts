import { Module } from '@nestjs/common';

import { UserService } from '@/src/user/user.service';
import providers from '@/src/user/user.providers';
import { UserController } from '@/src/user/user.controller';
import { CaslModule } from '@/src/casl/casl.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CaslModule,
    JwtModule
  ],
  providers: [UserService, ...providers],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }
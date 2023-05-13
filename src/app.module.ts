import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@/src/user/user.module';
import { AuthModule } from '@/src/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    AuthModule
  ],
  providers: [],
})
export class AppModule { }

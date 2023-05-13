import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@/src/user/user.module';
import { AuthService } from '@/src/auth/auth.service';
import { JwtStrategy } from '@/src/auth/jwt.strategy';
import { AuthController } from '@/src/auth/auth.controller';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  controllers: [AuthController],
})

export class AuthModule { }
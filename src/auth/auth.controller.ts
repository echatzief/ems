import { Controller, Post, Body, UseGuards, HttpCode } from "@nestjs/common";
import { AuthService } from "@/src/auth/auth.service";
import { UserDto } from "@/src/user/dto/user.dto";
import { IsAlreadyUserCreated } from "@/src/user/helpers/user.helpers";
import { UserLoginDto } from "@/src/user/dto/user.login.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(200)
  @Post('login')
  async login(@Body() user: UserLoginDto) {
    return await this.authService.login(user);
  }

  @HttpCode(201)
  @UseGuards(IsAlreadyUserCreated)
  @Post('register')
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }
}
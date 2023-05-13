import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { AuthService } from "@/src/auth/auth.service";
import { UserDto } from "@/src/user/dto/user.dto";
import { IsAlreadyUserCreated } from "@/src/user/helpers/user.helpers";
import { UserLoginDto } from "@/src/user/dto/user.login.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() user: UserLoginDto) {
    return await this.authService.login(user);
  }

  @UseGuards(IsAlreadyUserCreated)
  @Post('register')
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }
}
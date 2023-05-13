import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from '@/src/user/dto/user.login.dto';
import { hashPassword } from '@/src/user/helpers/user.helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  public async login(user: UserLoginDto) {
    const isValidUser = await this.validate(user.email, user.password)
    if (!isValidUser) {
      throw new UnauthorizedException("Please provide proper user credentials")
    }
    const token = await this.generateToken(user);
    return { ...user, token };
  }


  async validate(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      return false;
    }
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return false;
    }
    return true;
  }


  public async create(user) {
    const pass = await hashPassword(user.password);
    const newUser = await this.userService.create({ ...user, password: pass });
    const { password, ...result } = newUser['dataValues'];
    return { ...result };
  }


  public async generateToken(user) {
    const token = await this.jwtService.signAsync(user, {
      secret: process.env.JWT_KEY,
      expiresIn: process.env.TOKEN_EXPIRATION
    });
    return token;
  }

  public async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
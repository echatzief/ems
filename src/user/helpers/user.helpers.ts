import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserService } from "@/src/user/user.service";
import { Observable } from "rxjs";
import * as bcrypt from 'bcrypt';

@Injectable()
export class IsAlreadyUserCreated implements CanActivate {
  constructor(private readonly userService: UserService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const userExist = await this.userService.findOneByEmail(request.body.email);
    if (userExist) {
      throw new BadRequestException('This email already exist');
    }
    return true;
  }
}

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
}
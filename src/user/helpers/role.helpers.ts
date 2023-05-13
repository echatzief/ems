import { AppAbility, CaslAbilityFactory } from "@/src/casl/casl-ability.factory";
import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "@/src/user/user.service";

interface IRoleHandler {
  handle(ability: AppAbility): boolean;
}

interface IPayload {
  email: string;
  password: string;
}

type RoleHandlerCallback = (ability: AppAbility) => boolean;

export type RoleHandler = IRoleHandler | RoleHandlerCallback;

export const CHECK_ROLES_KEY = 'check_roles';
export const CheckRoles = (...handlers: RoleHandler[]) => SetMetadata(CHECK_ROLES_KEY, handlers);

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private caslAbilityFactory: CaslAbilityFactory,
    private userService: UserService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<RoleHandler[]>(
        CHECK_ROLES_KEY,
        context.getHandler(),
      ) || [];

    const request = context.switchToHttp().getRequest();

    if (request && request.headers && request.headers.authorization) {
      const parts = request.headers.authorization.split(" ")
      if (parts && parts[1]) {
        const payload: IPayload = await this.jwtService.decode(parts[1]) as IPayload;
        if (payload.email) {
          const user = await this.userService.findOneByEmail(payload.email);
          if (!user) {
            throw new UnauthorizedException('You are not authorized to access that resource');
          }
          const ability = this.caslAbilityFactory.createForUser(user);
          return policyHandlers.every((handler) =>
            this.execPolicyHandler(handler, ability),
          );
        }
      }
    }
    throw new UnauthorizedException('You are not authorized to access that resource');
  }

  private execPolicyHandler(handler: RoleHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
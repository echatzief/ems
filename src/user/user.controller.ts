import { Controller, Post, Body, UseGuards, Get, Param, Patch, Put, Delete, Query, forwardRef, Inject } from "@nestjs/common";
import { UserService } from "@/src/user/user.service";
import { AuthGuard } from '@nestjs/passport';
import { User } from "@/src/user/user.entity";
import { IsAlreadyUserCreated } from "@/src/user/helpers/user.helpers";
import { UserDto } from "@/src/user/dto/user.dto";
import { UserPutDto } from "@/src/user/dto/user.put.dto";
import { hashPassword } from "@/src/user/helpers/user.helpers";
import { CheckRoles, RoleGuard } from "@/src/user/helpers/role.helpers";
import { AppAbility } from "@/src/casl/casl-ability.factory";
import { Action } from "@/src/enums/action.enum";


@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RoleGuard)
  @CheckRoles((ability: AppAbility) => ability.can(Action.READ, User))
  @Get('/all')
  async getUsers(): Promise<Array<User>> {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RoleGuard)
  @CheckRoles((ability: AppAbility) => ability.can(Action.READ, User))
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.findOneById(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RoleGuard)
  @CheckRoles((ability: AppAbility) => ability.can(Action.CREATE, User))
  @UseGuards(IsAlreadyUserCreated)
  @Post()
  async createUser(@Body() user: UserDto) {
    const pass = await hashPassword(user.password);
    return await this.userService.create({ ...user, password: pass });
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RoleGuard)
  @CheckRoles((ability: AppAbility) => ability.can(Action.DELETE, User))
  @Delete('/:id')
  async deleteUserById(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteOneById(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RoleGuard)
  @CheckRoles((ability: AppAbility) => ability.can(Action.UPDATE, User))
  @UseGuards(IsAlreadyUserCreated)
  @Put('/:id/')
  updateUser(@Param('id') id: string, @Body() user: UserPutDto): Promise<User> {
    return this.userService.update(id, user);
  }

}
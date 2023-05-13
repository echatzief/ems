import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from '@/src/config';
import { User } from "@/src/user/user.entity";
import { UserDto } from "@/src/user/dto/user.dto";
import { UserPutDto } from "@/src/user/dto/user.put.dto";

@Injectable()
export class UserService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findAll(): Promise<Array<User>> {
    return await this.userRepository.findAll();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async deleteOneById(id: number): Promise<void> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new BadRequestException("You can't delete a user that doesn't exist")
    }
    await this.userRepository.destroy<User>({ where: { id: id } });
  }

  async update(id: string, user: UserPutDto): Promise<User> {  
    await this.userRepository.update<User>(user, { where: { id: id } });
    return await this.findOneById(+id);
  }
}
import { Test } from "@nestjs/testing";
import { UserController } from "@/src/user/user.controller";
import { UserService } from "@/src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { CaslAbilityFactory } from "@/src/casl/casl-ability.factory";
import UserRepository from '@/src/user/user.providers';
import { UserDto } from "./dto/user.dto";

describe('User', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        JwtService,
        CaslAbilityFactory,
        ...UserRepository,
      ],
      controllers: [UserController],
    }).compile();
    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });


  it('UserService should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('UserController should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('Should return all users', async () => {
    const users = [
      {
        "id": 1,
        "email": "test123@gmail.com",
        "password": "$2b$10$D7VHdriHyRAE62V5kDYMxerKOspsUmFKQFe4HHkw.Mfbe6WdSH.jC",
        "firstName": "123",
        "lastName": "1234",
        "role": "Admin",
        "createdAt": "2023-05-13T08:36:27.130Z",
        "updatedAt": "2023-05-13T08:36:27.130Z"
      },
      {
        "id": 3,
        "email": "test@gmail.com",
        "password": "$2b$10$EFJVCyCgUcAk2844Tgtipe89kwTGHD6S1nc715ZdfG0neAi2b5tqC",
        "firstName": "123",
        "lastName": "1234",
        "role": "Admin",
        "createdAt": "2023-05-13T09:12:35.108Z",
        "updatedAt": "2023-05-13T09:12:35.108Z"
      },
      {
        "id": 5,
        "email": "test33333@gmail.com",
        "password": "$2b$10$VNPTdUKOSVx2YSUo1ulyuO3c1FGT/7xuvFfGuejo4kTWJPAx3zp1y",
        "firstName": "123",
        "lastName": "1234",
        "role": "Admin",
        "createdAt": "2023-05-13T09:31:13.491Z",
        "updatedAt": "2023-05-13T09:31:13.491Z"
      },
      {
        "id": 4,
        "email": "test3344@gmail.com",
        "password": "1234",
        "firstName": "123",
        "lastName": "1234",
        "role": "Admin",
        "createdAt": "2023-05-13T09:14:30.182Z",
        "updatedAt": "2023-05-13T09:31:37.236Z"
      }
    ];
    jest.spyOn(userService, 'findAll').mockImplementation(() => Promise.resolve(users as any));
    expect(await userController.getUsers()).toStrictEqual(users);
  });

  it('Should return a user', async () => {
    const user = {
      "id": 4,
      "email": "test3344@gmail.com",
      "password": "1234",
      "firstName": "123",
      "lastName": "1234",
      "role": "Admin",
      "createdAt": "2023-05-13T09:14:30.182Z",
      "updatedAt": "2023-05-13T09:31:37.236Z"
    };
    jest.spyOn(userService, 'findOneById').mockImplementation(() => Promise.resolve(user as any));
    expect(await userController.getUserById("4")).toStrictEqual(user);
  });

  it('Should create a user', async () => {
    const payload: UserDto = {
      "id": "",
      "email": "test3344@gmail.com",
      "password": "1234",
      "firstName": "123",
      "lastName": "1234",
      "role": "Admin",
    }
    const user = {
      "id": 4,
      "email": "test3344@gmail.com",
      "password": "1234",
      "firstName": "123",
      "lastName": "1234",
      "role": "Admin",
      "createdAt": "2023-05-13T09:14:30.182Z",
      "updatedAt": "2023-05-13T09:31:37.236Z"
    };
    jest.spyOn(userService, 'create').mockImplementation(() => Promise.resolve(user as any));
    expect(await userController.createUser(payload)).toStrictEqual(user);
  });

});
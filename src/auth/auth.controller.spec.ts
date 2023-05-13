
import { Test } from '@nestjs/testing';
import { AuthController } from '@/src/auth/auth.controller';
import { AuthService } from '@/src/auth/auth.service';
import { UserService } from '@/src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import userRepository from '@/src/user/user.providers';
import { UnauthorizedException } from '@nestjs/common';

describe('Auth', () => {
  let authContoller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtService,
        ...userRepository,
      ],
      controllers: [AuthController],
    }).compile();
    authService = moduleRef.get<AuthService>(AuthService);
    authContoller = moduleRef.get<AuthController>(AuthController);
  });


  it('AuthService should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('AuthController should be defined', () => {
    expect(authContoller).toBeDefined();
  });


  it('Should return unauthorized response', async () => {
    const credentials = {
      email: 'test@gmail.com',
      password: '123456'
    }
    jest.spyOn(authService, 'validate').mockImplementation(() => Promise.resolve(false as any));
    await expect(authService.login(credentials)).rejects.toEqual(new UnauthorizedException("Please provide proper user credentials"));
  });

  it('Should login', async () => {
    const credentials = {
      email: 'test@gmail.com',
      password: '123456'
    }
    const token = '$2b$10$VNPTdUKOSVx2YSUo1ulyuO3c1FGT/7xuvFfGuejo4kTWJPAx3zp1y';
    jest.spyOn(authService, 'validate').mockImplementation(() => Promise.resolve(true as any));
    jest.spyOn(authService, 'generateToken').mockImplementation(() => Promise.resolve(token as any));
    expect(await authService.login(credentials)).toStrictEqual({ ...credentials, token });
  });

  it('Should register a user', async () => {
    const payload = {
      "email": "test33333@gmail.com",
      "password": "1234",
      "firstName": "123",
      "lastName": "1234",
      "role": "Admin"
    }
    const user = {
      "id": 5,
      "email": "test33333@gmail.com",
      "password": "$2b$10$VNPTdUKOSVx2YSUo1ulyuO3c1FGT/7xuvFfGuejo4kTWJPAx3zp1y",
      "firstName": "123",
      "lastName": "1234",
      "role": "Admin",
      "updatedAt": "2023-05-13T09:31:13.491Z",
      "createdAt": "2023-05-13T09:31:13.491Z"
    }
    jest.spyOn(authService, 'create').mockImplementation(() => Promise.resolve(user as any));
    expect(await authService.create(payload)).toStrictEqual(user);
  });

});
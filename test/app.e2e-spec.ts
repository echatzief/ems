import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/src/app.module';

describe('EMS e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404);
  });

  it('POST /auth/login (Unauthorized)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        "email": "te11st@gmail.com",
        "password": "1234"
      })
      .expect(401);
  });

  it('POST /auth/register', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        "email": "test@gmail.com",
        "password": "1234",
        "firstName": "123",
        "lastName": "1234",
        "role": "Admin"
      })
      .expect(201);
  });

  it('POST /auth/register (Duplicate user)', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        "email": "test@gmail.com",
        "password": "1234",
        "firstName": "123",
        "lastName": "1234",
        "role": "Admin"
      })
      .expect(400);
  });

  it('POST /auth/login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        "email": "test@gmail.com",
        "password": "1234"
      })
      .expect(200);
  });
});

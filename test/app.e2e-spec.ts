import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { Movie } from '../src/movies/entities/movie.entity';

describe('Pruebas E2E de la API', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('MoviesController (e2e)', () => {
    it('GET /movies -> debe retornar 200 y un array', async () => {
      // Usamos 'as unknown as string' para evitar el warning de 'any' unsafe
      const res = await request(app.getHttpServer() as unknown as string).get(
        '/movies',
      );

      expect(res.status).toBe(200);

      const body = res.body as Movie[];
      expect(Array.isArray(body)).toBe(true);

      if (body.length > 0) {
        expect(body[0]).toHaveProperty('id');
        expect(body[0]).toHaveProperty('title');
      }
    });
  });

  describe('AppController (e2e)', () => {
    it('GET / -> debe retornar Hello World!', () => {
      return request(app.getHttpServer() as unknown as string)
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });
  });
});

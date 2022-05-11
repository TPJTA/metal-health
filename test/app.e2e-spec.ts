import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/server/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createArticleId: number;
  let emialId: number;
  let testingId: number;
  let questionID: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/analyse (GET)', () => {
    return request(app.getHttpServer()).get('/api/analyse').expect(200);
  });

  it('/api/analyse/detail (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/analyse/detail')
      .query({ type: 'visite' })
      .expect(200);
  });

  it('/api/analyse/testing (GET)', () => {
    return request(app.getHttpServer()).get('/api/analyse/testing').expect(200);
  });

  it('/api/analyse/testing/result (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/analyse/testing/result')
      .query({ id: 1 })
      .expect(200);
  });

  it('/api/aritice (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/aritice')
      .query({ id: 1 })
      .expect(200);
  });

  it('/api/aritice/list (GET)', () => {
    return request(app.getHttpServer()).get('/api/aritice/list').expect(200);
  });

  it('/api/aritice (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/aritice')
      .send({
        content: 'test conte',
        title: 'test title',
        cover: '/img/test.png',
      })
      .expect(201);
    createArticleId = res.body.data.id;
  });

  it('/api/aritice (PUT)', () => {
    return request(app.getHttpServer())
      .put('/api/aritice')
      .send({
        id: createArticleId,
        content: 'test conte1',
        title: 'test title1',
        cover: '/img/test.png1',
      })
      .expect(200);
  });

  it('/api/aritice (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/api/aritice')
      .send({
        id: createArticleId,
      })
      .expect(200);
  });

  it('/api/inbox (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/inbox')
      .send({
        email: '785277659@qq.com',
        content: 'test content',
      })
      .expect(201);
  });

  it('/api/inbox/list (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/inbox/list')
      .query({ isAns: 0 })
      .expect(200);
    emialId = res.body.data.splice(-1)[0].id;
  });

  it('/api/inbox/sent (POST)', async () => {
    await request(app.getHttpServer())
      .post('/api/inbox/sent')
      .send({
        id: emialId,
        ans: 'test ans',
      })
      .expect(201);
  });

  it('/api/testing (GET)', async () => {
    await request(app.getHttpServer())
      .get('/api/testing')
      .query({
        id: 1,
      })
      .expect(200);
  });

  it('/api/testing/question (GET)', async () => {
    await request(app.getHttpServer())
      .get('/api/testing/question')
      .query({
        id: 1,
      })
      .expect(200);
  });

  it('/api/testing/result (GET)', async () => {
    await request(app.getHttpServer())
      .get('/api/testing/result')
      .query({
        id: 1,
        score: 0,
      })
      .expect(200);
  });

  it('/api/testing/list (GET)', async () => {
    await request(app.getHttpServer()).get('/api/testing/list').expect(200);
  });

  it('/api/testing/allList (GET)', async () => {
    await request(app.getHttpServer()).get('/api/testing/allList').expect(200);
  });

  it('/api/testing (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/testing')
      .send({
        name: 'test name',
        desc: 'test desc',
        type: 0,
        questions: [
          {
            title: 'test title1',
            answers: [
              {
                title: 'test test1',
                score: 0,
              },
            ],
          },
        ],
        cover: '/test/1.png',
        resultStr: 'test result',
        results: [{ desc: 'aaa', score: 0 }],
      })
      .expect(201);
    testingId = res.body.data.id;
  });

  it('/api/testing/question (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/testing/question')
      .send({
        id: testingId,
        question: {
          title: 'test title2',
          answers: [
            {
              title: 'test test1',
              score: 0,
            },
          ],
        },
      })
      .expect(201);
    questionID = res.body.data.id;
  });

  it('/api/testing/question (DETELE)', async () => {
    await request(app.getHttpServer())
      .delete('/api/testing/question')
      .send({
        id: questionID,
      })
      .expect(200);
  });

  it('/api/testing/result (PUT)', async () => {
    const res = await request(app.getHttpServer())
      .put('/api/testing/result')
      .send({
        id: testingId,
        results: [{ desc: 'aaa', score: 0 }],
      })
      .expect(200);
  });

  it('/api/testing (DETELE)', async () => {
    const res = await request(app.getHttpServer())
      .delete('/api/testing')
      .send({
        id: testingId,
      })
      .expect(200);
  });

  afterAll(() => {
    app.close();
  });
});

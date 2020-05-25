import { RolesGuard } from './roles.guard';
import * as request from 'supertest';

const app = 'http://localhost:3000';

describe('RolesGuard', () => {
  it('should be defined', () => {
    expect(new RolesGuard()).toBeDefined();
  });
});

describe('test Guard', () => {
  it('test permission', () => {
    request(app)
      .get('comments/getComments')
      .expect('Content-Type', /json/)
      .expect(200)
      .end();
  });
});

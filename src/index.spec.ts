import {doKYC} from './index';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import {payload} from '../test/data/customers';
const request = require('supertest');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.all('/', doKYC);

const baseURL = '/';

describe('Mandatory field validation ', () => {
  it('should throw bad request if empty object passed ', async () => {
    const {statusCode} = await request(app).post(baseURL).send({});
    expect(statusCode).toBe(400);
  });

  it('should throw bad request if dateofBirth is missing', async () => {
    const {statusCode, body} = await request(app)
      .post(baseURL)
      .send(payload.withoutDate);
    expect(statusCode).toBe(400);

    expect(body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          property: 'birthDate',
        }),
      ])
    );
  });

  it('should throw bad request if invalid date format is present', async () => {
    const {statusCode, body} = await request(app)
      .post(baseURL)
      .send(payload.invalidBirthDate);
    expect(statusCode).toBe(400);

    expect(body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          property: 'birthDate',
        }),
      ])
    );
  });

  it('should throw bad request if firstname and lastname is missing', async () => {
    const {statusCode, body} = await request(app)
      .post(baseURL)
      .send(payload.withoutFirstNameLastName);
    expect(statusCode).toBe(400);

    expect(body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          property: 'firstName',
        }),
        expect.objectContaining({
          property: 'lastName',
        }),
      ])
    );
  });

  it('should throw bad request if licenseNumber is missing', async () => {
    const {statusCode, body} = await request(app)
      .post(baseURL)
      .send(payload.withoutFirstNameLastName);
    expect(statusCode).toBe(400);

    expect(body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          property: 'firstName',
        }),
        expect.objectContaining({
          property: 'lastName',
        }),
      ])
    );
  });

  it('should throw bad request if state of issue is missing', async () => {
    const {statusCode, body} = await request(app)
      .post(baseURL)
      .send(payload.withoutStateOfIssue);
    expect(statusCode).toBe(400);

    expect(body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          property: 'stateOfIssue',
        }),
      ])
    );
  });

  it('should throw bad request if expiry date is missing', async () => {
    const {statusCode, body} = await request(app)
      .post(baseURL)
      .send(payload.withoutExpiryDate);
    expect(statusCode).toBe(400);

    expect(body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          property: 'expiryDate',
        }),
      ])
    );
  });

  it('should throw bad request if state of issue is missing', async () => {
    const {statusCode, body} = await request(app)
      .post(baseURL)
      .send(payload.invalidStateOfIssue);
    expect(statusCode).toBe(400);

    expect(body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          property: 'stateOfIssue',
        }),
      ])
    );
  });
});

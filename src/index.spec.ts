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

describe('Perform KYC', () => {
  it('should successfully perform KYC for valid data ', async () => {
    const {statusCode, body} = await request(app)
      .post(baseURL)
      .send(payload.validKYCRequest);
    expect(statusCode).toBe(200);
    // expect(body.data).toHaveProperty('kycResult');
  });
});

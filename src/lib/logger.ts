'use strict';
// Common logger
import * as bunyan from 'bunyan';

const name = process.env.APP_NAME ? process.env.APP_NAME : 'assignment';

const configs = {
  name: name,
  type: 'stream',
  stream: process.stdout,
  level: bunyan.TRACE,
};

export const logger = bunyan.createLogger(configs);

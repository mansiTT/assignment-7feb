'use strict';

import HttpException from './http.exception';

class VerifyDocumentError extends HttpException {
  public message: string;
  constructor(message: string, code?: number) {
    super(message, code ? code : 500, {});
    this.code = code ? code : 500;
    this.message = message;
  }
}

export default VerifyDocumentError;

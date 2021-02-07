'use strict';

import HttpException from './http.exception';

// Custom Exception handler for error response from third party api service
class VerifyDocumentError extends HttpException {
  public message: string;
  constructor(message: string, code?: number) {
    super(message, code ? code : 500, {});
    this.code = code ? code : 500;
    this.message = message;
  }
}

export default VerifyDocumentError;

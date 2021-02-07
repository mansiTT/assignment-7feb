'use strict';

class HttpException extends Error {
  public message: string;
  public code: number;
  public body: any;
  constructor(message: string, code: number, body: any) {
    super(message);
    this.message = message;
    this.code = code;
    this.body = body;
  }
}

export default HttpException;

export default class APIResponse {
  code: string;
  data: any;
  isError: boolean;
  customMsg: string;

  constructor(code: string, data: any, isError: boolean, customMsg: string) {
    this.code = code;
    this.data = data;
    this.isError = isError;
    this.customMsg = customMsg;
  }

  generateBody() {
    return {
      errorStatus: this.isError,
      message: this.customMsg,
      code: this.code,
    };
  }
}

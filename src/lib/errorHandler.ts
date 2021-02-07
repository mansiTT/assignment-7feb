import HttpException from '../exception/http.exception';
import APIResponse from '../util/api-response';

/**
 * Common error handler which will handle and map the response to equivalent HTTP error's
 * @param httpException: HTTPException
 * @returns apiResponse:APIResponse
 */
export function errorHandler(httpException: HttpException) {
  switch (httpException.code) {
    case 400:
      return new APIResponse(
        'BAD_REQUEST',
        httpException.body,
        true,
        httpException.message
      ).generateBody();
    case 404:
      return new APIResponse(
        '400',
        httpException.body,
        true,
        httpException.message
      ).generateBody();
    default:
      return new APIResponse(
        '500',
        httpException.body,
        true,
        httpException.message
      ).generateBody();
  }
}

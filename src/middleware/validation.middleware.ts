import {ValidationError, validateOrReject} from 'class-validator';
import HttpException from '../exception/http.exception';
import {logger} from '../lib/logger';

/**
 * Common request validtion class
 * @param body
 */
export async function reqValidation(body: any) {
  logger.trace('Enter :: request validation');
  try {
    logger.debug('request validation input ', body);
    await validateOrReject(body);
    logger.info('request validation success ', body);
    return;
  } catch (errors) {
    logger.error('request validation error ', errors);
    const validationErrors = errors.map((error: ValidationError) =>
      errorBuilder(error)
    );
    throw new HttpException('BAD_REQUEST', 400, validationErrors);
  }
}

/**
 * Format the error response by extracting the property and contraint object
 */
function errorBuilder(error: ValidationError) {
  const constraints = error.constraints;
  if (constraints) {
    return {
      property: error.property,
      error: Object.values(constraints).join(','),
    };
  } else return null;
}

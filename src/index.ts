import {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';
import {errorHandler} from './lib/errorHandler';
import {logger} from './lib/logger';
import {reqValidation} from './middleware/validation.middleware';
import {UserKycRequest} from './dto/user-kyc-req.dto';
import {plainToClass} from 'class-transformer';

/**
 * Function to perform customer KYC with third party system
 * @param req 
 * @param res 
 */
export const doKYC: HttpFunction = async (req, res) => {
  logger.trace('Enter :: doKYC');
  logger.debug('request data :: ', req.body);
  try {
    const userKycRequest = plainToClass(UserKycRequest, req.body);
    await reqValidation(userKycRequest);

    res.send('success');
  } catch (err) {
    const errDtls = errorHandler(err);
    res.status(err.code ? err.code : 500).send(errDtls);
  }
};

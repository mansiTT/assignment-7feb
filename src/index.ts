import {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';
import {errorHandler} from './lib/errorHandler';
import {logger} from './lib/logger';
import {reqValidation} from './middleware/validation.middleware';
import {UserKycRequest} from './dto/user-kyc-req.dto';
import {plainToClass} from 'class-transformer';
import {performThirdPartyKYCVerifcation} from './doKyc';
import {msgCons} from './util/constants/msg.constant';
import APIResponse from './util/api-response';

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
    // Perform request validaiton, this can be added as the middleware
    await reqValidation(userKycRequest);
    // Perform actual KYC verification with third party api
    const result = await performThirdPartyKYCVerifcation(userKycRequest);
    res
      .status(200)
      .send(
        new APIResponse(
          msgCons.MSG_SUCCESS_KYC,
          result,
          false,
          'Success'
        ).generateBody()
      );
  } catch (err) {
    logger.error('Error while performing kyc ', err);
    const errDtls = errorHandler(err);
    res.status(err.code ? err.code : 500).send(errDtls);
  }
};

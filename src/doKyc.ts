import {logger} from './lib/logger';
import {UserKycRequest} from './dto/user-kyc-req.dto';
import {KYCAPIRequest} from './dto/kyc-api-req.dto';
import {UserKycResponse} from './dto/user-kyc.res.dto';
import {callPostWS} from './util/common';
import {KYCAPIResponse} from './dto/kyc-api-res.dto';
import VerifyDocumentError from './exception/verify-doc.exception';
import {msgCons} from './util/constants/msg.constant';

/**
 * Perform kyc verification with third party
 * @param userKycDto:UserKycRequest
 * @returns userKycResponse: UserKycResponse
 */
export async function performThirdPartyKYCVerifcation(
  userKycDto: UserKycRequest
): Promise<UserKycResponse> {
  logger.trace('Entered into doKYC');
  //
  const header = {
    headers: {
      Authorization: `Bearer ${process.env.secret}`,
    },
  };
  const url = `${process.env.driverlicenceURL}`;
  // Make a call to third party api for kyc verification
  const response = await callPostWS(
    url,
    header,
    kycAPIRequestBuilder(userKycDto)
  );
  logger.debug('raw response from third party api', response);
  logger.trace('Exit :: performThirdPartyKYCVerifcation');
  return kycAPIResponseBuilder(response);
}

function kycAPIRequestBuilder(userKycDto: UserKycRequest): KYCAPIRequest {
  logger.trace('Enter :: kycAPIRequestBuilder');
  const kycAPIReq = new KYCAPIRequest();
  kycAPIReq.birthDate = userKycDto.birthDate;
  kycAPIReq.givenName = userKycDto.firstName;
  kycAPIReq.middleName = userKycDto.middleName;
  kycAPIReq.familyName = userKycDto.lastName;
  kycAPIReq.licenceNumber = userKycDto.licenceNumber;
  kycAPIReq.expiryDate = userKycDto.expiryDate;
  kycAPIReq.stateOfIssue = userKycDto.stateOfIssue;
  logger.debug('formatted api request = ', kycAPIReq);
  logger.trace('Exit :: kycAPIRequestBuilder');
  return kycAPIReq;
}

function kycAPIResponseBuilder(response: KYCAPIResponse): UserKycResponse {
  logger.trace('Enter :: kycAPIResponseBuilder');
  const userResponse = new UserKycResponse();
  switch (response.verificationResultCode) {
    case 'Y':
      userResponse.kycResult = true;
      break;
    case 'N':
      userResponse.kycResult = false;
      break;
    case 'D':
      throw new VerifyDocumentError(msgCons.MSG_DOC_ERROR);
    case 'S':
      throw new VerifyDocumentError(msgCons.MSG_SERVER_ERROR);
    default:
  }
  logger.debug('formatted api responnse = ', userResponse);
  logger.trace('Exit :: kycAPIResponseBuilder');
  return userResponse;
}

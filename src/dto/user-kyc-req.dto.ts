'use strict';

import { IsDateString, IsString, IsOptional, MaxLength, MinLength, IsEnum } from 'class-validator'
import { msgCons } from '../util/constants/msg.constant';
import { StateOfIssue } from '../enum/state-of-issue.enum';

export class UserKycRequest {

    @IsDateString()
    birthDate: Date;

    @IsString()
    @MaxLength(100, {
        message: msgCons.MSG_VALID_LENGTH,
    })
    firstName: string;

    @IsString()
    @IsOptional()
    @MaxLength(100, {
        message: msgCons.MSG_VALID_LENGTH,
    })
    middleName?: string;

    @IsString()
    @MinLength(1)
    @MaxLength(100, {
        message: msgCons.MSG_VALID_LENGTH,
    })
    lastName: string;

    @IsString()
    licenseNumber: string;

    @IsDateString()
    expiryDate: string;

    @IsEnum(StateOfIssue)
    stateOfIssue: StateOfIssue;

}
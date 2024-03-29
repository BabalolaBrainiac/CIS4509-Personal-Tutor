import {extname} from 'path';
import {FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, UnsupportedMediaTypeException,} from '@nestjs/common';
import {ApplicationConfiguration} from "../config/application-configuration";

export const WinstonUtils = {
    logColors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'white',
    },
    logLevels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
    },
};

export enum LOG_OPERATION_STATUS {
    SUCCESSFUL = 'SUCCESSFUL',
    FAILED = 'FAILED',
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    DATA_FETCHED = 'DATA_FETCHED',
    DATA_FETCHED_FAILED = 'DATA_FETCHED_FAILED',
    WARNING = 'WARNING_LOG',
    DEBUG = 'DEBUG_LOG',
    HTTP = 'HTTP_LOG',
}

export const SALT_ROUNDS = 10;


export const JWT_TOKEN_EXPIRY = {
    CUSTOMER_SIGNIN_TOKEN_EXPIRY:
        ApplicationConfiguration.JWT_SIGNIN_TOKEN_EXPIRY || 60 * 60,
    ADMIN_USER_SIGNIN_TOKEN_EXPIRY:
        ApplicationConfiguration.ADMIN_USER_SIGNIN_TOKEN_EXPIRY || 60 * 60,
    PASSWORD_RESET: ApplicationConfiguration.PASSWORD_RESET_EXPIRY,
    PAYLOAD_TOKEN_EXPIRY: ApplicationConfiguration.PAYLOAD_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY:
        ApplicationConfiguration.JWT_REFRESH_TOKEN_EXPIRATION_TIME || 60 * 60,
};

export enum TOKEN_TYPE {
    CUSTOMER_LOGIN = 'CUSTOMER_LOGIN',
    ADMIN_USER_LOGIN = 'ADMIN_USER_LOGIN',
    PASSWORD_RESET = 'PASSWORD_RESET',
    INVALID_TOKEN_TYPE = 'INVALID_TOKEN_TYPE',
    CUSTOMER_LOGIN_REFRESH_TOKEN = 'CUSTOMER_LOGIN_REFRESH_TOKEN',
}

export const JWT_ISSUER = ApplicationConfiguration.JWT_ISSUER || 'PersonalTutor-Backend';

export const PASSWORD_REGEX =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const PASSWORD_MESSAGE =
    'Password should have 1 upper case, lowcase letter along with a number and special character.';

export type USER_ROLES = {
    STUDENT: 'STUDENT';
    TUTOR: 'TUTOR';
    ADMIN: "ADMIN"
};
export const cookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    secure: true,
};

export const filename = (req, file, cb) => {
    const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    cb(null, `${randomName}${extname(file.originalname)}`);
};

export const fileValidators = [
    new MaxFileSizeValidator({maxSize: 1024 * 1024 * 10}),
    new FileTypeValidator({fileType: '.(png|jpeg|jpg)'}),
];

export const ParseFileOptions: ParseFilePipe = new ParseFilePipe({
    validators: fileValidators,
    fileIsRequired: true,
});

export const ImageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        const err = new UnsupportedMediaTypeException(
            'Only image files are supported',
        );
        return callback(err, false);
    }
    callback(null, true);
};

export enum USER_ROLE  {
    TUTOR = "TUTOR",
    STUDENT = "STUDENT",
    ADMIN = "ADMIN"
}

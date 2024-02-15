import {config} from 'dotenv';
import * as env from 'env-var';

config();
export const ApplicationConfiguration = {
    APPLICATION_ENVIRONMENT: env
        .get('APPLICATION_ENVIRONMENT')
        .required()
        .asString(),
    APPLICATION_BASE: env.get('APPLICATION_BASE').required().asString(),
    APPLICATION_PORT: env.get('APPLICATION_PORT').required().asPortNumber(),
    DB_HOST: env.get('DB_HOST').required().asString(),
    DB_PORT: env.get('DB_PORT').required().asPortNumber(),
    DB_USER: env.get('DB_USER').asString(),
    DB_PASSWORD: env.get('DB_PASSWORD').asString(),
    DB: env.get('DB').required().asString(),
    JWT_SECRET_KEY: env.get('JWT_SECRET_KEY').required().asString(),
    JWT_REFRESH_SECRET_KEY: env
        .get('JWT_REFRESH_SECRET_KEY')
        .required()
        .asString(),
    JWT_LOGIN_EXPIRY: env.get('JWT_LOGIN_EXPIRY').required().asString(),
    JWT_REFRESH_TOKEN_EXPIRATION_TIME: env
        .get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')
        .required()
        .asInt(),
    ADMIN_USER_TOKEN_EXPIRY: env
        .get('ADMIN_USER_TOKEN_EXPIRY')
        .required()
        .asInt(),
    ADMIN_USER_LOGIN_TOKEN: env
        .get('ADMIN_USER_LOGIN_TOKEN')
        .required()
        .asString(),

    PASSWORD_RESET_TOKEN_SECRET: env
        .get('PASSWORD_RESET_TOKEN_SECRET')
        .required()
        .asString(),
    JWT_SIGNIN_TOKEN_EXPIRY: env
        .get('JWT_SIGNIN_TOKEN_EXPIRY')
        .required()
        .asInt(),
    ADMIN_USER_SIGNIN_TOKEN_EXPIRY: env
        .get('ADMIN_USER_SIGNIN_TOKEN_EXPIRY')
        .required()
        .asInt(),
    PASSWORD_RESET_EXPIRY: env.get('PASSWORD_RESET_EXPIRY').required().asInt(),
    PAYLOAD_TOKEN_EXPIRY: env.get('PAYLOAD_TOKEN_EXPIRY').required().asInt(),
    JWT_ISSUER: env.get('JWT_ISSUER').required().asString(),
    SESSION_SECRET: env.get('SESSION_SECRET').required().asString(),
    REQUEST_SESSION_EXP: env.get('REQUEST_SESSION_EXP').required().asInt(),
    MONGODB_CONNECTION_STRING: env
        .get('MONGODB_CONNECTION_STRING')
        .required()
        .asString(),
    PAYLOAD_ENCRYPTION_SECRET: env
        .get('PAYLOAD_ENCRYPTION_SECRET')
        .required()
        .asString(),


};

//Helper Configurations

/AdminTokenHelper/;
const getTokenFromRequest = (req: any) => {
    return req.headers['x-csrf-token'];
};
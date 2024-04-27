import { compare, hash } from 'bcrypt';
// import {strongPaswordGenerator} from 'strong-password-generator'

const strongPaswordGenerator = require('strong-password-generator');

export const PasswordHelper = {
    async encryptPassword(password: string): Promise<string> {
        return await hash(password.trim(), 10).then(function (hash: string) {
            return hash.trim();
        });
    },

    async decryptPassword(password: string, hash: string): Promise<boolean> {
        return await compare(password, hash).then(function (res: any) {
            return res;
        });
    },

    async generateUniquePassword(): Promise<string> {
        const defaultPasswordConfig = {
            base: 'RANDOM',
            length: {
                min: 12,
                max: 17,
            },
            capsLetters: {
                min: 3,
                max: 5,
            },

            numerals: {
                min: 2,
                max: 6,
            },
            spacialCharactors: {
                includes: ['@', '&', '#'],
                min: 3,
                max: 0,
            },
            spaces: {
                allow: false,
                min: 0,
                max: 0,
            },
        };

        return strongPaswordGenerator.generatePassword(defaultPasswordConfig);
    },
};

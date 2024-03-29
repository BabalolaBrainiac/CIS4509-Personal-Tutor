import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { ApplicationConfiguration } from './application-configuration';
import { UserEntity } from 'src/user/entities/user.entity';

export const typeOrmCustomerAsyncConfig:
    | TypeOrmModuleAsyncOptions
    | ConnectionOptions = {
    useFactory: async (): Promise<TypeOrmModuleOptions | ConnectionOptions> => {
        return {
            type: 'mongodb',
            url: ApplicationConfiguration.MONGODB_CONNECTION_STRING,
            ssl: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoLoadEntities: true,
            // useCreateIndex: true,
            entities: [
                UserEntity,
            ],
            synchronize: true, //This should be set to false when in production
            logging: true,
            extra: {
                max: 10, // Maximum number of connections in the pool
                idleTimeoutMillis: 30000, // 30 seconds
            },
        };
        //
        // return {
        //     type: 'mongodb',
        //     url: ApplicationConfiguration.MONGODB_CONNECTION_STRING,
        //     database: ApplicationConfiguration.MONGODB_DATABASE,
        //     entities: [
        //         __dirname + '/**/*.entity{.ts,.js}',
        //     ],
        //     ssl: true,
        //     useUnifiedTopology: true,
        //     useNewUrlParser: true,
        // }

        // type: 'postgres',
        // host: ApplicationConfiguration.DB_HOST,
        // port: ApplicationConfiguration.DB_PORT,
        // username: ApplicationConfiguration.DB_USER,
        // password: ApplicationConfiguration.DB_PASSWORD,
        // database: ApplicationConfiguration.DB,
        // connectTimeoutMS: 30000, // 30 seconds
        // migrations: ['packages/migrations/*.{ts,js}'],
        // migrationsTableName: 'typeorm_migrations',
        // migrationsRun: true,
    },
};

export default typeOrmCustomerAsyncConfig;

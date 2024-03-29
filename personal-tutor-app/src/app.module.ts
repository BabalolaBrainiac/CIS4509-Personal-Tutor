import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ScheduleModule} from './schedule/schedule.module';
import {TutorModule} from './tutor/tutor.module';
import {AdminModule} from './admin/admin.module';
import {UserModule} from './user/user.module';
import {MongooseModule} from '@nestjs/mongoose';
import {ApplicationConfiguration} from "./config/application-configuration";
import {WinstonModule} from 'nest-winston';
import * as c from 'winston';
import {format, level, transports} from "./config/logger.config";
import {WinstonUtils} from "./constants/main.constants";
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmCustomerAsyncConfig from './config/typeorm.config';


@Module({
    imports: [UserModule, AdminModule, TutorModule, ScheduleModule,
        TypeOrmModule.forRootAsync(typeOrmCustomerAsyncConfig),
        WinstonModule.forRoot({
            level: level(),
            levels: WinstonUtils.logLevels,
            format,
            transports,
            defaultMeta: {service: '#### SERVICE-NAME ####'},
            exceptionHandlers: [
                new c.transports.Console({
                    format: c.format.json(),
                }),
                new c.transports.File({filename: 'exceptions.log'}),
            ],
            rejectionHandlers: [
                new c.transports.Console({
                    format: c.format.json(),
                }),
                new c.transports.File({filename: 'rejections.log'}),
            ],
        }),

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

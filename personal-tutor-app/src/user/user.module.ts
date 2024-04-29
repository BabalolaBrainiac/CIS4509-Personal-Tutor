import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStratagy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStratagy: 'jwt' }),
    JwtModule.register({
      secret: 'thisisasecret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UserRepository, UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtStratagy],
  exports: [JwtStratagy, PassportModule],
})
export class UserModule {}

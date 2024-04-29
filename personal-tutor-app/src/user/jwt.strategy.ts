import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class JwtStratagy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super({
        secretOrKey: "thisisasecret",
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

    })
  }

  async validate(payload): Promise<UserEntity>{
    const user = await this.userRepository.getUserByEmail(payload.email)
    if (!user){
        throw new UnauthorizedException()
    }

    return user

  }
}

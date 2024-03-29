import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: MongoRepository<UserEntity>,

    ) {}

    async createCustomer(student: any): Promise<UserEntity> {
        return await this.userRepository.save(student);
    }
}
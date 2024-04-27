import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_ROLE } from 'src/constants/main.constants';
import { UpdateUserDto } from './dto/update-user.dto';
import {mongoIdToString, stringToMongoId } from 'src/helpers/mongo-id.helper';

export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: MongoRepository<UserEntity>,

    ) {}

    async createStudent(student: CreateUserDto): Promise<UserEntity> {
        return await this.userRepository.save(student);
    }

    async createTutor(tutor: CreateUserDto): Promise<UserEntity> {
        tutor.role = USER_ROLE.TUTOR
        return await this.userRepository.save(tutor);
    }

    async createAdmin(admin: CreateUserDto): Promise<UserEntity> {
        admin.role = USER_ROLE.ADMIN
        return await this.userRepository.save(admin);
    }

    async getAllUsersByRole(role: USER_ROLE): Promise<UserEntity[]> {
        return await this.userRepository.find({role});
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async getSingleUser(_id: string): Promise<UserEntity> {
        return await this.userRepository.findOne({where: {_id: stringToMongoId(_id)}});
    }

    async updateUser(_id: string, updateUserDto: UpdateUserDto): Promise<void> {
         await this.userRepository.updateOne(
            {
                _id: stringToMongoId(_id),
            },
            {
                $set: updateUserDto,
            },
        );
    }

    async removeUser(_id: string): Promise<void> {
         await this.userRepository.deleteOne({where: {_id: stringToMongoId(_id)}});
    }

    async returnStudentTutor(email: string, tutorId: string): Promise<UserEntity> {
        return await this.userRepository.findOne({where: {email: email, personalTutor: stringToMongoId(tutorId)}});
    }

    async returnTutorsAvailableToBeAssigned(department: string, studentId: string): Promise<UserEntity> {
        const random = Math.floor(Math.random() * await this.userRepository.count())

        const res = await this.userRepository.find({where: {role: USER_ROLE.TUTOR, department, students: length > 0 && length < 10 }});
        const tutor = res[random - 1]
        
        tutor.students.push(stringToMongoId(studentId))

        const updated = await this.userRepository.updateOne(
            {
                _id: tutor._id,
            },
            {
                $set: {
                    tutor
                }
            },
        );
        
        return tutor
    }
}
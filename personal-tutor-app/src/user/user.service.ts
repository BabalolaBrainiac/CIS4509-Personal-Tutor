import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { USER_ROLE } from 'src/constants/main.constants';
import { PasswordHelper } from 'src/helpers/password-helper';
import {mongoIdToString, stringToMongoId } from 'src/helpers/mongo-id.helper';
import { ObjectId } from 'typeorm';

@Injectable()
export class UserService {

  private readonly userRepository : UserRepository
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {

    var newUserId = new ObjectId()
    PasswordHelper.encryptPassword(createUserDto.password)

    if(createUserDto.role == USER_ROLE.STUDENT) {
      
      createUserDto._id = newUserId

      const tutor = await this.returnRandomAvailablePersonalTutor(createUserDto.department, newUserId.toString())
      
      createUserDto.personalTutor = tutor._id
      //Create function to assign personal tutor
    }
    return await this.userRepository.createStudent(createUserDto);
  }

  async findAll() {
    return await this.userRepository.getAllUsers()
  }

  async findAllByRole(role: USER_ROLE) {
    return await this.userRepository.getAllUsersByRole(role)
  }

  findOne(id: string) {
    return this.userRepository.getSingleUser(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUser(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.removeUser(id);
  }

  async returnRandomAvailablePersonalTutor(department: string, studentId: string): Promise<UserEntity> {

    return await this.userRepository.returnTutorsAvailableToBeAssigned(department, studentId)
  }
}

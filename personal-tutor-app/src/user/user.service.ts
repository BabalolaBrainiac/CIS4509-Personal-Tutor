import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { USER_ROLE } from 'src/constants/main.constants';
import { PasswordHelper } from 'src/helpers/password-helper';
import { mongoIdToString, stringToMongoId } from 'src/helpers/mongo-id.helper';
import { ObjectId } from 'mongodb';
// import { ObjectId } from 'typeorm';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { GetUser } from './get-user.decorator';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    console.log('_+_+___+_+__+__+_+_+_+_+_+__++__+_+_+_+_+_+');
    console.log(GetUser());
    var newUserId = new ObjectId();
    PasswordHelper.encryptPassword(createUserDto.password);

    if (createUserDto.role == USER_ROLE.STUDENT) {
      createUserDto._id = newUserId;

      const tutor = await this.returnRandomAvailablePersonalTutor(
        createUserDto.department,
        newUserId.toString()
      );

      createUserDto.personalTutor = tutor._id;
      //Create function to assign personal tutor
    }
    return await this.userRepository.createStudent(createUserDto);
  }

  async createAdmin(createUserDto: CreateUserDto): Promise<UserEntity> {
    let userId = new ObjectId();
    PasswordHelper.encryptPassword(createUserDto.password);
    createUserDto._id = userId;

    let user = await this.userRepository.createAdmin(createUserDto);
    return user;
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    let user = await this.userRepository.getUserByEmail(signInDto.email);
    console.log(user);
    if ((user && signInDto.password, user.password)) {
      const payload = { id: user._id, email: user.email, role: user.role };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid login credentials');
    }
  }

  async findAll() {
    return await this.userRepository.getAllUsers();
  }

  async findAllByRole(role: USER_ROLE) {
    return await this.userRepository.getAllUsersByRole(role);
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

  async returnRandomAvailablePersonalTutor(
    department: string,
    studentId: string,
  ): Promise<UserEntity> {
    return await this.userRepository.returnTutorsAvailableToBeAssigned(
      department,
      studentId
    );
  }
}

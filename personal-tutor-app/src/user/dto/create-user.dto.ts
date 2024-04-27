import { ObjectId } from "typeorm";
import {
    IsArray,
    IsBoolean,
    IsDate,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsUUID,
    Matches,
} from 'class-validator';
import {PASSWORD_MESSAGE, PASSWORD_REGEX, USER_ROLE } from "src/constants/main.constants";

export class CreateUserDto {
    @IsOptional()
    _id: ObjectId;
    
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsOptional()
    @IsPhoneNumber()
    phoneNumber: string;
    
    @IsNotEmpty()
    @IsEnum(USER_ROLE)
    role: USER_ROLE;

    @IsNotEmpty()
    @Matches(PASSWORD_REGEX, { message: PASSWORD_MESSAGE })
    password: string;

 
    @IsOptional()
    students: [];

    @IsOptional()
    personalTutor: ObjectId;

    @IsOptional()
    department: string;
}

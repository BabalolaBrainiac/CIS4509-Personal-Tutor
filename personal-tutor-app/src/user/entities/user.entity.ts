import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import 'reflect-metadata';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ObjectId,
    ObjectIdColumn,
    OneToMany,
    UpdateDateColumn,
} from 'typeorm';
import { USER_ROLE } from 'src/constants/main.constants';

const uuid = require('uuid').v4;

@Entity('user')
export class UserEntity {

    @ObjectIdColumn()
    _id: ObjectId;

    @ApiPropertyOptional({
        description: 'first name',
        nullable: true,
        example: 'Test First Name',
    })
    @Column('varchar', { unique: false, nullable: true })
    firstName: string;

    @ApiPropertyOptional({
        description: 'Last name',
        nullable: true,
        example: 'Test Last Name',
    })
    @Column('varchar', { unique: false, nullable: true })
    lastName: string;

    @ApiProperty({
        description: ' email',
        nullable: false,
        example: 'test@tutorial.com',
    })
    @Column('varchar', { unique: true, nullable: true })
    email: string;

    @ApiPropertyOptional({
        description: ' Phone Number',
        nullable: true,
        example: '12345678',
    })
    @Column('varchar', { unique: false, nullable: true })
    phoneNumber: string;

    @ApiPropertyOptional({
        description: ' Role',
        nullable: true,
        example: '12345678',
    })
    @Column('enum', { unique: false, nullable: false })
    role: USER_ROLE;

    @ApiPropertyOptional({
        description: 'Password',
        nullable: true,
        example: 'Password',
    })
    @Column('varchar', { unique: false, nullable: true })
    password: string;

    @ApiPropertyOptional({
        description: 'Password',
        nullable: true,
        example: 'Password',
    })
    @Column('array', { nullable: true })
    students: ObjectId[];

    @Column('varchar', { nullable: true })
    personalTutor: ObjectId;

    @Column('varchar', { nullable: true })
    department: string;
    
}

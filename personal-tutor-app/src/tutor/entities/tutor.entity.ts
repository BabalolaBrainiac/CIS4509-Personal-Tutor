import {ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { USER_ROLE } from "src/constants/main.constants";
import {Column, Entity, ObjectIdColumn } from "typeorm";
import { Types } from 'mongoose';


@Entity('tutor')
export class Tutor {
    @ObjectIdColumn()
    _id: Types.ObjectId;

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
        description: ' Phone Number',
        nullable: true,
        example: '12345678',
    })
    @Column('array', { nullable: true })
    students: [];

    @ApiPropertyOptional({
        description: 'Students Role',
        nullable: true,
        example: '12345678',
    })
    @Column('enum', { unique: false, nullable: false })
    role: USER_ROLE;
}

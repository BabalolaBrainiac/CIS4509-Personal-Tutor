import { ApiPropertyOptional } from "@nestjs/swagger";
import {Column, ObjectId, ObjectIdColumn } from "typeorm";

export class Meeting {

    @ObjectIdColumn()
    _id: ObjectId;

    @ApiPropertyOptional({
        description: 'meeting date and time',
        nullable: true,
        example: 'Test First Name',
    })
    @Column('datetime')
    date: Date;

    @Column('varchar')
    meetingTitle: ObjectId;

    @Column('varchar')
    studentId: ObjectId;

    @Column('varchar')
    tutorId: ObjectId;

    @Column('varchar', {nullable: true})
    recommendations: string;

    @Column('varchar', {nullable: true})
    studentFeedback: string;

    @Column('bool', {nullable: true})
    isGroup: Boolean;

}

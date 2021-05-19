import {IsBoolean, IsInt, IsString, MinLength} from 'class-validator';

export class AddMemberRequest {

    @IsInt()
    groupid: number;

    @IsBoolean()
    iscenter: boolean;

    @IsString()
    @MinLength(10)
    member: string;

    @IsInt()
    networkid: number;

    @IsInt()
    type: number;
}

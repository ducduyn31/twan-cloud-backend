import {IsInt, IsString, MinLength} from 'class-validator';

export class RemoveMemberRequest {
    @IsString()
    @MinLength(10)
    member: string;

    @IsInt()
    networkid: number;
}

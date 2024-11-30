import { ApiProperty } from '@nestjs/swagger';
import { Matches, MinLength, IsString } from 'class-validator';

const MIN_LOGIN_LENGTH = 4;
const MIN_PASSWORD_LENGTH = 4;
const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/; 
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 

export class CreateUserDto {
    @ApiProperty({ example: 'username', description: 'User name for registration' })
    @IsString()
    @MinLength(MIN_LOGIN_LENGTH, {
        message: `Username must be at least ${MIN_LOGIN_LENGTH} characters long.`,
    })
    @Matches(USERNAME_REGEX, {
        message: 'Username can only contain alphanumeric characters and underscores.',
    })
    username: string;

    @ApiProperty({ example: 'password', description: 'Password for registration' })
    @IsString()
    @MinLength(MIN_PASSWORD_LENGTH, {
        message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
    })
    @Matches(PASSWORD_REGEX, {
        message: 'Password must contain at least 1 uppercase letter, 1 digit, and 1 special character.',
    })
    password: string;
}

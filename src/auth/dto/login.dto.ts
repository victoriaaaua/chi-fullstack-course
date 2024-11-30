import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'username', description: 'Unique username' })
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @ApiProperty({ example: 'password', description: 'Password for user authentication' })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

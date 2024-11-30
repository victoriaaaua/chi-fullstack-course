import { IsString } from 'class-validator';

export class NewPostDto {
    @IsString()
    message: string;

    @IsString()
    user: string;
}

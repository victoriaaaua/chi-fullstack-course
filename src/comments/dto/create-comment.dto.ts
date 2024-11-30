import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty({description: "The text of comment"})
    @IsNotEmpty()
    @IsString()
    text: string;
}
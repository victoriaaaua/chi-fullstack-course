import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength } from "class-validator";

export class CreateExhibitDto {
  @ApiProperty({
    example: 'filename',
    description: 'Image URL'
  })
  imageUrl: string;

  @ApiProperty({
    example: 'description',
    description: 'Image descriptiom'
  })
  @MaxLength(2000, { message: 'Description must not be more 2000 characters long' })
  description: string;

}
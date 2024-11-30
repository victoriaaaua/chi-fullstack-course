import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryExhibitsDto {
    @ApiProperty({
        description: 'Page number for pagination',
        required: false,
        example: 1,
    })
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10)) 
    @IsInt({ message: 'Page must be an integer number' })
    @Min(1, { message: 'Page must not be less than 1' })
    page?: number = 1;

    @ApiProperty({
        description: 'Number of exhibits per page',
        required: false,
        example: 10,
    })
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10)) 
    @IsInt({ message: 'Limit must be an integer number' })
    @Min(1, { message: 'Limit must not be less than 1' })
    @Max(100, { message: 'Limit must not be greater than 100' })
    limit?: number = 10;
}

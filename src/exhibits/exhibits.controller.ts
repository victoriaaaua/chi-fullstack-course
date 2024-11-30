import { Controller, Post, UploadedFile, UseGuards, UseInterceptors, Request, Body, Query, Get, Res, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExhibitsService } from './exhibits.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { QueryExhibitsDto } from './dto/query-exhibit.dto';
import { plainToInstance } from 'class-transformer';
import { Exhibit } from './exhibit.entity';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';


@ApiTags('exhibits')
@Controller('api/exhibits')
export class ExhibitsController {
    constructor(private readonly exhibitsService: ExhibitsService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new exhibit' })
    @ApiResponse({
        status: 201,
        description: 'Exhibit created successfully.'
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid input data or missing fields.'
    })
    @ApiBearerAuth('access-token')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary'
                },
                description: {
                    type: 'string'
                },
            }
        }
    })

    @UseInterceptors(FileInterceptor('image'))
    async createExhibit(
        @UploadedFile() file: Express.Multer.File,
        @Body() createExhibitDto: CreateExhibitDto,
        @Request() req
    ) {
        if (!file) {
            throw new BadRequestException('An image file is required to create an exhibit.');
        }

        if (!createExhibitDto.description || createExhibitDto.description.trim() === '') {
            throw new BadRequestException('Description is required and cannot be empty.');
        }

        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new BadRequestException(
                'Unsupported file type. Please upload JPEG, PNG, or GIF images only.'
            );
        }

        const maxFileSizeMB = 5;
        if (file.size > maxFileSizeMB * 1024 * 1024) {
            throw new BadRequestException(
                `File size exceeds ${maxFileSizeMB} MB limit. Please upload a smaller file.`
            );
        }


        return this.exhibitsService.createExhibit(file, createExhibitDto.description, req.user.id);
    }

    @Get()
    @ApiOperation({ summary: "Show all exhibits" })
    @ApiResponse({
        status: 200,
        description: 'Successfully showed the list of exhibits.'
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid query parameters provided.'
    })
    async getAllExhibits(@Query() query: QueryExhibitsDto) {
        const { page = 1, limit = 10 } = query;

        const exhibits = await this.exhibitsService.getAllExhibits(page, limit);

        return {
            ...exhibits,
            data: plainToInstance(Exhibit, exhibits.data, { excludeExtraneousValues: true })
        }
    }

    @Get('static/:filename')
    @ApiOperation({ summary: 'Show exhibit by url' })
    async getImage(@Param('filename') filename: string, @Res() res: Response) {
        const filePath = path.resolve(__dirname, '../../uploads', filename);
        
        try {
            await fs.promises.access(filePath, fs.constants.F_OK);
        } catch (error) {
            throw new NotFoundException('Image not found');
        }

        return res.sendFile(filePath);
    }


    @Get('post/:id')
    @ApiOperation({ summary: 'Show exhibit details by ID' })
    @ApiResponse({
        status: 200,
        description: 'Successfully showed exhibit information.',
    })
    @ApiResponse({
        status: 404,
        description: 'Exhibit not found.',
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid exhibit ID format.',
    })
    async getExhibitById(@Param('id') id: string) {

        const correctId = Number(id);
        if (isNaN(correctId) || correctId <= 0) {
            throw new BadRequestException('Exhibit ID must be a positive number.');
        }

        const exhibit = await this.exhibitsService.getExhibitById(correctId);
        if (!exhibit) {
            throw new NotFoundException(`Exhibit with ID ${correctId} not found.`);
        }

        return plainToInstance(Exhibit, exhibit, { excludeExtraneousValues: true });
    }


    @Get('my-posts')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Show exhibits of the current user' })
    @ApiResponse({
        status: 200,
        description: 'List of exhibits created by the current user.',
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid pagination parameters.',
    })
    async getUserExhibits(
        @Request() req,
        @Query() query: QueryExhibitsDto,
    ) {
       const { page = 1, limit = 10 } = query;

        const exhibits = await this.exhibitsService.getUserExhibit(req.user.id, page, limit);

        return {
            ...exhibits,
            data: plainToInstance(Exhibit, exhibits.data, { excludeExtraneousValues: true }),
        };
    }


    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: "Deleting of exhibit by ID" })
    @ApiResponse({
        status: 200,
        description: "Exhibit deleted successfully"
    })
    @ApiResponse({
        status: 404,
        description: "Exhibit not found"
    })

    async removeExhibit(@Param('id') id: number, @Request() req) {
        return this.exhibitsService.removeExhibit(id, req.user.id);
    }

}

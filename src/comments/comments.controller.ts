import { BadRequestException, Body, Controller, Param, Post, UseGuards, Request, Query, Get, Delete, Res, HttpStatus } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from './comment.entity';

@ApiTags('comments')
@Controller('api/exhibits/:exhibitId/comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new comment' })
    @ApiResponse({
        status: 201,
        description: 'Comment sent successfully.'
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid input data or missing fields.'
    })
    @ApiBearerAuth('access-token')
    async createComment(
        @Param('exhibitId') exhibitId: number,
        @Body() createCommentDto: CreateCommentDto,
        @Request() req,
    ) {
        const userId = req.user.id;

        if (!createCommentDto.text) {
            throw new BadRequestException("Text is reuired!");
        }

        const comment = this.commentsService.createComment(exhibitId, createCommentDto, userId);
        return plainToInstance(Comment, comment, { excludeExtraneousValues: true });
    }

    @Get()
    @ApiOperation({ summary: "Show all comments" })
    @ApiResponse({
        status: 200,
        description: 'Successfully showed the list of comments.'
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid query parameters provided.'
    })
    async getAllComments(@Param('exhibitId') exhibitId: number) {
        const comments = await this.commentsService.getAllComments(exhibitId);
        return plainToInstance(Comment, comments, {excludeExtraneousValues: true})
    }


    @UseGuards(JwtAuthGuard)
    @Delete(':commentId')
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: "Deleting of comment by ID" })
    @ApiResponse({
        status: 200,
        description: "Comment deleted successfully"
    })
    @ApiResponse({
        status: 404,
        description: "Comment not found"
    })

    async deleteComment(@Param('commentId') commentId: number, @Request() req, @Res() res) {
        const userId = req.user.id;
        await this.commentsService.deleteComment(commentId, userId);

        return res.status(HttpStatus.OK).json({
            message: "Comment deleted successfully",
            id: commentId,
        });
    }
}




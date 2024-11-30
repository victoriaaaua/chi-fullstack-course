import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../users/user.entity';
import { Exhibit } from '../exhibits/exhibit.entity';
import { Comment } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(Exhibit)
        private exhibitsRepository: Repository<Exhibit>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>,
    ) { }

    async createComment(exhibitId: number, createCommentDto: CreateCommentDto, userId: number): Promise<Comment> {
        const exhibit = await this.exhibitsRepository.findOne({where: {id: exhibitId}});

        if(!exhibit) {
            throw new NotFoundException(`Exhibit with Id = ${exhibitId} not found`);
        }

        const user = await this.usersRepository.findOne({ where: { id: userId } });

        if(!user) {
            throw new NotFoundException(`User with Id = ${userId} not found`);
        }

        const comment = this.commentsRepository.create(
            {
                text: createCommentDto.text,
                createdAt: new Date(),
                exhibit,
                user,
            }
        )

        await this.commentsRepository.save(comment);
        
        exhibit.commentCount += 1;
    
        await this.exhibitsRepository.save(exhibit);

        return comment;
    }

    async getAllComments(exhibitId: number) {
        const comment = await this.commentsRepository.find({
            where: {exhibit: {id: exhibitId}},
            order: { createdAt: 'DESC'},
        });

        if (comment.length === 0) {
            throw new NotFoundException(`Comments for Exhibit with Id = ${exhibitId} not found`);
        }
        
        return comment;
    }

    async deleteComment(commentId: number, userId: number) {
        const comment = await this.commentsRepository.findOne({where: {id: commentId}});

        if(!comment) {
            throw new NotFoundException(`Comment with ID ${commentId} not found`);
        }

        if (comment.user.id !== userId) {
            throw new NotFoundException(`Comment with Id ${commentId} not found`);
        }

        const exhibit = await this.exhibitsRepository.findOne({where: {id: comment.exhibit.id}});

        if(!exhibit) {
            throw new NotFoundException(`Exhibit with ID ${comment.exhibit.id} not found`);
        }

        exhibit.commentCount -= 1;
        await this.exhibitsRepository.save(exhibit);
        await this.commentsRepository.remove(comment);

        return comment;
    }

}

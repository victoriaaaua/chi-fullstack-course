import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exhibit } from '../exhibits/exhibit.entity';
import { Comment } from './comment.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exhibit, User, Comment])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}

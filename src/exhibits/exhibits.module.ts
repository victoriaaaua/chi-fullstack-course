import { Module } from '@nestjs/common';
import { ExhibitsController } from './exhibits.controller';
import { ExhibitsService } from './exhibits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exhibit } from './exhibit.entity';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Exhibit, User, Comment])],
  controllers: [ExhibitsController],
  providers: [ExhibitsService, NotificationsGateway],
})
export class ExhibitsModule {}

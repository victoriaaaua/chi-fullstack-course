import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { ExhibitsModule } from './exhibits/exhibits.module';
import { Exhibit } from './exhibits/exhibit.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comment.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: "postgres",
    password: "victoria2001v!)",
    database: "lesson13",
    entities: [User, Exhibit, Comment],
    synchronize: false
  }), 
  UsersModule, 
  AuthModule, 
  ExhibitsModule, 
  CommentsModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}

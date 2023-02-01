import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Post } from './posts.model';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([User, Post]),
    FilesModule
  ],
  controllers: [PostsController]
})
export class PostsModule {}

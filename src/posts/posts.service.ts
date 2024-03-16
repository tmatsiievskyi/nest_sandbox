import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Post from './post.entity';
import { Repository } from 'typeorm';
import PostNotFountException from './exceptions/postNotFount.exception';
import User from '../users/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepo: Repository<Post>,
  ) {}

  async getAllPosts() {
    return await this.postsRepo.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepo.find({
      where: { id: id },
      relations: ['author'],
    });
    if (post) {
      return post;
    }

    throw new PostNotFountException(id);
  }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.postsRepo.update(id, post);
    const updatedpost = await this.postsRepo.findOneBy({ id: id });
    if (updatedpost) {
      return updatedpost;
    }

    throw new PostNotFountException(id);
  }

  async createPost(post: CreatePostDto, user: User) {
    try {
      const newPost = await this.postsRepo.create({ ...post, author: user });
      await this.postsRepo.save(newPost);
      return newPost;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async deletePost(id: number) {
    const deleteResp = await this.postsRepo.delete(id);
    if (!deleteResp.affected) {
      throw new PostNotFountException(id);
    }
  }
}

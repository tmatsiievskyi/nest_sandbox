import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import JwtAuthenticationGuard from '../auth/jwt-auth.guard';
import FindOneParams from '../utils/findOneParama';
import RequestWithUser from '../auth/requestWithUser.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(Number(id));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postsService.createPost(post, req.user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(':id')
  updatePost(@Param('id') { id }: FindOneParams, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  deletePost(@Param() { id }: FindOneParams) {
    this.postsService.deletePost(Number(id));
  }
}

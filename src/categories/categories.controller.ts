import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from '../auth/jwt-auth.guard';
import FindOneParams from '../utils/findOneParama';
import { CategoriesService } from './categories.service';
import CreateCategoryDto from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  getCategoryById(@Param() { id }: FindOneParams) {
    return this.categoriesService.getCategoryById(Number(id));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  createCategory(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category);
  }
}

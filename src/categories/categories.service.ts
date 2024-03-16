import {
  HttpException,
  HttpStatus,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Category from './category.entity';
import CreateCategoryDto from './dto/create-category.dto';
import UpdateCategoryDto from './dto/update-category';
import CategoryNotFoundException from './exceptions/categoryNotFound.exception';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async getAllCategories() {
    return await this.categoryRepo.find({ relations: ['posts'] });
  }

  async getCategoryById(id: number) {
    try {
      const category = await this.categoryRepo.find({
        where: { id: id },
        relations: ['post'],
      });

      if (category) {
        return category;
      }

      throw new CategoryNotFoundException(id);
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createCategory(category: CreateCategoryDto) {
    try {
      const newCategory = await this.categoryRepo.create(category);
      await this.categoryRepo.save(newCategory);
      return newCategory;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    try {
      await this.categoryRepo.update(id, category);
      const updatedCategoty = await this.categoryRepo.findOneBy({ id: id });
      if (updatedCategoty) {
        return updatedCategoty;
      }
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}

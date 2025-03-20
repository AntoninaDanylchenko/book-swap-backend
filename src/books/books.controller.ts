import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BooksService } from './books.service';

@UseGuards(JwtGuard)
@Controller('books')
export class BooksController {
  constructor(
    private booksService: BooksService,
  ) {}
  @Get('getAll')
  async getBooks() {}

  @Get()
  async getBookById() {}

  @Post()
  async createBook() {}

  @Patch()
  async editBookById() {}

  @Delete()
  async deleteBookById() {}
}

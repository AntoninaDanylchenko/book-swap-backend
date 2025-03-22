import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BooksService } from './books.service';
import { GetUser } from 'src/auth/decorator';
import {
  CreateBookDto,
  EditBookDto,
} from './dto';

@UseGuards(JwtGuard)
@Controller('books')
export class BooksController {
  constructor(
    private booksService: BooksService,
  ) {}
  @Get('getAll')
  getBooks() {
    return this.booksService.getBooks();
  }

  @Get('getUserBooks')
  getUserBooks(@GetUser('id') userId: string) {
    return this.booksService.getUserBooks(userId);
  }

  @Get(':id')
  getBookById(
    @GetUser('id') userId: string,
    @Param('id') bookId: string,
  ) {
    return this.booksService.getBookById(
      userId,
      bookId,
    );
  }

  @Post()
  createBook(
    @GetUser('id') userId: string,
    @Body() dto: CreateBookDto,
  ) {
    return this.booksService.createBook(
      userId,
      dto,
    );
  }

  @Patch(':id')
  editBookById(
    @GetUser('id') userId: string,
    @Body() dto: EditBookDto,
    @Param('id') bookId: string,
  ) {
    return this.booksService.editBookById(
      userId,
      dto,
      bookId,
    );
  }

  @Delete(':id')
  deleteBookById(
    @GetUser('id') userId: string,
    @Param('id') bookId: string,
  ) {
    return this.booksService.deleteBookById(
      userId,
      bookId,
    );
  }
}

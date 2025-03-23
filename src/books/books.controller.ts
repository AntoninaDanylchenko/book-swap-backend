import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BooksService } from './books.service';
import { GetUser } from 'src/auth/decorator';
import {
  CreateBookDto,
  EditBookDto,
} from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('image')) // Додаємо інтерцептор для файлів
  createBook(
    @GetUser('id') userId: string,
    @Body() dto: CreateBookDto,
    @UploadedFile() file: Express.Multer.File, // Отримуємо файл
  ) {
    return this.booksService.createBook(
      userId,
      dto,
      file,
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

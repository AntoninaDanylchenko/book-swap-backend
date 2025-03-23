import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
  getBookById(@Param('id') bookId: string) {
    return this.booksService.getBookById(bookId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createBook(
    @GetUser('id') userId: string,
    @Body() dto: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.booksService.createBook(
      userId,
      dto,
      file,
    );
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  editBookById(
    @GetUser('id') userId: string,
    @Body() dto: EditBookDto,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') bookId: string,
  ) {
    return this.booksService.editBookById(
      userId,
      dto,
      file,
      bookId,
    );
  }

  @Delete(':id')
  @HttpCode(204)
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

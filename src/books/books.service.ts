import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateBookDto,
  EditBookDto,
} from './dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  getBooks() {
    return this.prisma.book.findMany();
  }

  getUserBooks(userId: string) {
    return this.prisma.book.findMany({
      where: {
        ownerId: userId,
      },
    });
  }

  async getBookById(
    userId: string,
    bookId: string,
  ) {}

  async createBook(
    userId: string,
    dto: CreateBookDto,
  ) {
    const newBook = await this.prisma.book.create(
      {
        data: {
          ownerId: userId,
          ...dto,
        },
      },
    );
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        books: {
          push: newBook.id,
        },
      },
    });

    return newBook;
  }

  async editBookById(
    userId: string,
    dto: EditBookDto,
    bookId: string,
  ) {}

  async deleteBookById(
    userId: string,
    bookId: string,
  ) {}
}

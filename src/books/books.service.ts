import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateBookDto,
  EditBookDto,
} from './dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BooksService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

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
    file: Express.Multer.File,
  ) {
    let imageUrl = null;

    if (file) {
      imageUrl =
        await this.cloudinaryService.uploadImage(
          file,
        ); // Використовуємо сервіс для завантаження
    }
    const newBook = await this.prisma.book.create(
      {
        data: {
          ownerId: userId,
          image: imageUrl,
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
